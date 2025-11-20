'use client';

import { useContext, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCreatePost, useGetPosts } from '@/hooks/post-hooks';
import PostCard from 'components/PostCard';
import SharedPostCard from 'components/SharedPostCard';
import {
  useAcceptFriendRequest,
  useCancelFriendRequest,
  useGetUserInfo,
  useSendFriendRequest,
} from '@/hooks/user-hooks';
import { Store } from '@/lib/store';
import FriendOptionsMenu from 'components/FriendOptionsMenu';
import {
  PageClickEvent,
  Post,
  SharedPost as SharedPostType,
} from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar';
import { Button } from 'components/ui/button';
import CreatePostDialog from 'components/CreatePostDialog';
import Pagination from 'components/Pagination';
import PostCardSkeleton from 'components/PostCardSkeleton';
import ProtectedRoute from 'components/ProtectedRoute';
import { CircularProgress } from '@mui/material';

// Combined post type that matches the backend response
type PostWithSharedFlag = Post & { isShared: false };
type SharedPostWithFlag = SharedPostType & { isShared: true };
type CombinedPost = PostWithSharedFlag | SharedPostWithFlag;

function UserProfilePage() {
  const router = useRouter();
  const params = useParams();
  const userName = decodeURIComponent(params.userName as string);
  const [post, setPost] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const {
    state: { userInfo },
    dispatch,
  } = useContext(Store);
  const { mutateAsync: createPost } = useCreatePost();
  const [isPosting, setIsPosting] = useState(false);
  const { data: userData, refetch: refetchUser } = useGetUserInfo(userName);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, refetch } = useGetPosts({ userName, currentPage });
  const { mutateAsync: sendRequest, isPending: isSendingRequest } =
    useSendFriendRequest();
  const { mutateAsync: cancelRequest } = useCancelFriendRequest();
  const { mutateAsync: acceptRequest } = useAcceptFriendRequest();
  const [allPosts, setAllPosts] = useState<CombinedPost[]>([]);
  const [totalPages, setTotalPages] = useState<number>(2);

  const isLoggedInUser = userInfo.name === userName;

  // Consolidate friend request functions
  const handleFriendRequest = async (
    action: 'send' | 'cancel' | 'accept' | 'reject'
  ) => {
    try {
      switch (action) {
        case 'send':
          const updatedUser = await sendRequest({
            sender: userInfo.name,
            receiver: userName,
          });
          dispatch({ type: 'sign-in', payload: updatedUser });
          break;
        case 'cancel':
          await cancelRequest({
            sender: userInfo.name,
            receiver: userName,
          });
          // After canceling, we need to refetch the user info to get updated state
          await refetchUser();
          break;
        case 'reject':
          await cancelRequest({
            sender: userName,
            receiver: userInfo.name,
          });
          // After rejecting, we need to refetch the user info to get updated state
          await refetchUser();
          break;
        case 'accept':
          const acceptedUser = await acceptRequest({
            sender: userName,
            receiver: userInfo.name,
          });
          dispatch({ type: 'sign-in', payload: acceptedUser });
          break;
      }
      await refetchUser();
    } catch (error) {
      console.error('Friend request action failed:', error);
    }
  };

  const getSirvToken = async () => {
    const response = await fetch('https://api.sirv.com/v2/token', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        clientId: process.env.NEXT_PUBLIC_SIRV_ID,
        clientSecret: process.env.NEXT_PUBLIC_SIRV_SECRET,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to authenticate with Sirv');
    }

    const { token } = await response.json();
    return token;
  };

  const uploadImagesToSirv = async (token: string) => {
    const uploadPromises = images.map(image => {
      return fetch(
        `https://api.sirv.com/v2/files/upload?filename=/post-images/${image.name}`,
        {
          method: 'POST',
          headers: {
            authorization: `Bearer ${token}`,
            'content-type': image.type,
          },
          body: image,
        }
      );
    });

    const responses = await Promise.all(uploadPromises);
    const failedUploads = responses.filter(res => !res.ok);

    if (failedUploads.length > 0) {
      throw new Error(`${failedUploads.length} images failed to upload.`);
    }
    const imageUrls = images.map(
      image => `https://nazmul.sirv.com/post-images/${image.name}`
    );
    return imageUrls;
  };

  const handlePost = async () => {
    try {
      setIsPosting(true);
      let imagesUrls: string[] = [];
      if (images.length > 0) {
        const token = await getSirvToken();
        imagesUrls = await uploadImagesToSirv(token);
      }

      await createPost({ post, images: imagesUrls });
      await refetch();
      setPost('');
      setImages([]);
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      setIsPosting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(prevImages => [
        ...prevImages,
        ...Array.from(e.target.files || []),
      ]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handlePostUpdate = (updatedPost: Post) => {
    setAllPosts(prevPosts =>
      prevPosts.map(post =>
        post._id === updatedPost._id && !post.isShared
          ? { ...updatedPost, isShared: false as const }
          : post
      )
    );
  };

  const handlePageClick = (event: PageClickEvent): void => {
    setCurrentPage(event.selected + 1);
  };

  useEffect(() => {
    const userJson = localStorage.getItem('user-info');
    if (!userJson) {
      router.push('/signup');
    }
  }, [router]);

  useEffect(() => {
    if (data) {
      setAllPosts(data.posts);
      setTotalPages(data.totalPages);
    }
  }, [data]);

  return (
    <div className=" pt-[60px] h-full flex grow flex-col gap-3 items-center align-middle bg-[#F0F2F5]">
      <div className="flex flex-col gap-3 bg-white rounded-lg w-[90%] md:w-[30%] p-3 border border-gray-200 shadow">
        <Avatar className=" w-20 h-20 ">
          <AvatarImage src={userData?.profileImage} className=" object-cover" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <h2>{userData?.name}</h2>
        {!isLoggedInUser && (
          <>
            {userData?.receivedFriendReqs.includes(userInfo.name) ? (
              <Button onClick={() => handleFriendRequest('cancel')}>
                Cancel Request
              </Button>
            ) : userData?.sentFriendReqs.includes(userInfo.name) ? (
              <div className="flex flex-row gap-3">
                <Button onClick={() => handleFriendRequest('accept')}>
                  Accept Request
                </Button>
                <Button onClick={() => handleFriendRequest('reject')}>
                  Reject
                </Button>
              </div>
            ) : userData?.friends.includes(userInfo.name) ? (
              <FriendOptionsMenu tempUser={userName} refetch={refetchUser} />
            ) : (
              <Button
                onClick={() => handleFriendRequest('send')}
                disabled={isSendingRequest}
              >
                {isSendingRequest ? (
                  <>
                    <CircularProgress
                      size={16}
                      color="inherit"
                      className="mr-2"
                    />
                    Sending Request...
                  </>
                ) : (
                  'Send Request'
                )}
              </Button>
            )}
          </>
        )}
      </div>

      {isLoggedInUser && (
        <CreatePostDialog
          post={post}
          setPost={setPost}
          images={images}
          setImages={setImages}
          handlePost={handlePost}
          handleImageChange={handleImageChange}
          handleRemoveImage={handleRemoveImage}
        />
      )}

      {isPosting ? (
        <PostCardSkeleton />
      ) : (
        allPosts.map((post, index) =>
          post.isShared ? (
            <SharedPostCard
              key={index}
              sharedPost={post as SharedPostType}
              refetch={refetch}
              isLoggedInUser={isLoggedInUser}
              profileImage={userData?.profileImage}
            />
          ) : (
            <PostCard
              key={index}
              text={post.post}
              authorName={post.authorName}
              createdAt={post.createdAt}
              id={post._id}
              refetch={refetch}
              likers={post.likers}
              isLoggedInUser={isLoggedInUser}
              onPostUpdate={handlePostUpdate}
              comments={post.comments}
              images={post.images}
              profileImage={userData?.profileImage}
            />
          )
        )
      )}
      <Pagination handlePageClick={handlePageClick} totalPages={totalPages} />
    </div>
  );
}

export default function UserProfile() {
  return (
    <ProtectedRoute>
      <UserProfilePage />
    </ProtectedRoute>
  );
}
