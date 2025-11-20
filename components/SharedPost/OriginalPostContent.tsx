import ImageWithSkeleton from '../ImageWithSkeleton';

type OriginalPostContentProps = {
  postText: string;
  images?: string[];
};

function OriginalPostContent({ postText, images }: OriginalPostContentProps) {
  return (
    <>
      {/* Post Text */}
      <div className="mb-3">
        <p className="text-sm whitespace-pre-wrap">{postText}</p>
      </div>

      {/* Post Images */}
      {images && images.length > 0 && (
        <div className="mb-3">
          <div className="grid grid-cols-2 gap-2">
            {images.map((image, index) => (
              <ImageWithSkeleton
                key={index}
                src={image}
                alt={`Post image ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default OriginalPostContent;
