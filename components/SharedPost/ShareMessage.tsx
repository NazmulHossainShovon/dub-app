type ShareMessageProps = {
  shareMessage?: string;
};

function ShareMessage({ shareMessage }: ShareMessageProps) {
  if (!shareMessage) return null;

  return (
    <div className="mb-3">
      <p className="text-sm">{shareMessage}</p>
    </div>
  );
}

export default ShareMessage;
