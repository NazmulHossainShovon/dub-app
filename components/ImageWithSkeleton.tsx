'use client';

import { Skeleton } from '@mui/material';
import { useState } from 'react';

type ImageWithSkeletonProps = {
  src: string;
  alt: string;
  className?: string;
};

export default function ImageWithSkeleton({
  src,
  alt,
  className,
}: ImageWithSkeletonProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ position: 'relative' }}>
      {loading && (
        <Skeleton
          variant="rectangular"
          width={64}
          height={64}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        onLoad={() => setLoading(false)}
        style={{ opacity: loading ? 0 : 1 }}
      />
    </div>
  );
}
