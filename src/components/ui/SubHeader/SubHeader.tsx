import type { PropsWithChildren } from 'react';

export const SubHeader = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex bg-secondary/10 p-3">
      <h3 className="font-bold text-sm">{children}</h3>
    </div>
  );
};
