type Friend = {
  _id: string;
  name: string;
  profileImage?: string;
};

type User = {
  _id: string;
  name: string;
  email: string;
  friends: string[];
  receivedFriendReqs: string[];
  sentFriendReqs: string[];
  token: string;
  profileImage?: string;
  googleId?: string;
  authProvider?: string;
  secondsLeft?: number;
  remainingChartsLimit?: number;
};

type People = {
  name: string;
  image: string;
};

type SignupData = {
  name: string;
  email: string;
  password: string;
  image: FileList;
};

type AppState = {
  userInfo: User;
  searchQuery: string;
};

type CommentType = {
  comment: string;
  userName: string;
  createdAt: string;
  _id: string;
};

type Post = {
  post: string;
  authorName: string;
  authorImage: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  likers: string[];
  images: string[];
  _id: string;
  comments: CommentType[];
  shareCount?: number;
  profileImage?: string;
};

type SharedPost = {
  _id: string;
  originalPostId: string;
  sharedByUserId: string;
  sharedByUserName: string;
  shareMessage?: string;
  createdAt: string;
  updatedAt: string;
  originalPost?: Post; // Populated original post data
};

type PageClickEvent = {
  selected: number;
};

export type {
  User,
  Friend,
  AppState,
  SignupData,
  Post,
  SharedPost,
  People,
  CommentType,
  PageClickEvent,
};
