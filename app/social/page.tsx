'use client';

import React, { useEffect, useState } from 'react';
import { useGetFriendPosts } from '@/hooks/post-hooks';
import PostCard from 'components/PostCard';
import SharedPostCard from 'components/SharedPostCard';
import Pagination from 'components/Pagination';
import { PageClickEvent } from '@/lib/types';
import ProtectedRoute from 'components/ProtectedRoute';
import PostCardSkeleton from 'components/PostCardSkeleton';
import ChatIntegration from 'components/chat/ChatIntegration';
import CheckoutButton from 'components/CheckoutButton';

function HomePage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, refetch, isLoading } = useGetFriendPosts({ currentPage });
  const [totalPages, setTotalPages] = useState<number>(2);

  const handlePageClick = (event: PageClickEvent): void => {
    setCurrentPage(event.selected + 1);
  };

  useEffect(() => {
    if (data) {
      setTotalPages(data.totalPages);
    }
  }, [data]);

  return (
    <div className="flex flex-col gap-4 pt-8 items-center">
      <h2>Home Page</h2>

      {isLoading
        ? // Show 3 skeleton loaders while loading
          Array.from({ length: 3 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))
        : data?.posts?.map((post, index) =>
            post.isShared ? (
              <SharedPostCard
                key={index}
                sharedPost={post}
                refetch={refetch}
                isLoggedInUser={false}
              />
            ) : (
              <PostCard
                key={index}
                text={post.post}
                authorName={post.authorName}
                createdAt={post.createdAt}
                id={post._id}
                likers={post.likers}
                isLoggedInUser={false}
                comments={post.comments}
                refetch={refetch}
                onPostUpdate={() => {
                  return null;
                }}
                profileImage={post.profileImage}
              />
            )
          )}
      <Pagination handlePageClick={handlePageClick} totalPages={totalPages} />
    </div>
  );
}

export default function Home() {
  return (
    <ProtectedRoute>
      <HomePage />
      <ChatIntegration />
    </ProtectedRoute>
  );
}
