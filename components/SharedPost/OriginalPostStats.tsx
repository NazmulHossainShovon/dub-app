type OriginalPostStatsProps = {
  likersCount: number;
  commentsCount: number;
  shareCount?: number;
};

function OriginalPostStats({
  likersCount,
  commentsCount,
  shareCount,
}: OriginalPostStatsProps) {
  return (
    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
      <span>{likersCount} likes</span>
      <span>{commentsCount} comments</span>
      {shareCount && shareCount > 0 && <span>{shareCount} shares</span>}
    </div>
  );
}

export default OriginalPostStats;
