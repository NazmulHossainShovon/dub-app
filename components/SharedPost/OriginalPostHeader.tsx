import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type OriginalPostHeaderProps = {
  authorName: string;
  authorImage: string;
  createdAt: string;
  formatDate: (dateString: string) => string;
};

function OriginalPostHeader({
  authorName,
  authorImage,
  createdAt,
  formatDate,
}: OriginalPostHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <Avatar className="w-8 h-8">
        <AvatarImage src={authorImage} className="object-cover" />
        <AvatarFallback>{authorName.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div>
        <Link
          href={`/${authorName}`}
          className="font-semibold text-sm hover:underline"
        >
          {authorName}
        </Link>
        <p className="text-xs text-gray-500">{formatDate(createdAt)}</p>
      </div>
    </div>
  );
}

export default OriginalPostHeader;
