import { ReactNode } from 'react';

type OriginalPostContainerProps = {
  children: ReactNode;
};

function OriginalPostContainer({ children }: OriginalPostContainerProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
      {children}
    </div>
  );
}

export default OriginalPostContainer;
