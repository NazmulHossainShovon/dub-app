import { Skeleton } from '@mui/material';

export default function PostCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 bg-white rounded-lg w-[90%] md:w-[30%] p-3 border border-gray-200 shadow">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-3">
          <Skeleton variant="circular" width={40} height={40} />
          <div className="flex flex-col gap-1">
            <Skeleton variant="text" width={120} />
            <Skeleton variant="text" width={80} />
          </div>
        </div>
        <Skeleton variant="rectangular" width={24} height={24} />
      </div>
      <Skeleton variant="text" width={"90%"} />
      <div className="flex flex-row gap-2">
        <Skeleton variant="rectangular" width={64} height={64} />
        <Skeleton variant="rectangular" width={64} height={64} />
      </div>
      <div className="flex flex-row justify-center items-center gap-3 w-full">
        <Skeleton variant="rectangular" width={80} height={36} />
        <Skeleton variant="rectangular" width={80} height={36} />
        <Skeleton variant="rectangular" width={24} height={24} />
      </div>
    </div>
  );
}
