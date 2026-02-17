import type { PropsWithChildren } from 'react';

const Header = ({ children }: PropsWithChildren) => {
  return (
    <header className="flex items-center justify-center h-16 py-4 shadow w-full">
      <h1 className="text-2xl font-bold">{children}</h1>
    </header>
  );
};

export default Header;
