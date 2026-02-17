import { Outlet } from 'react-router-dom';
import Header from '@ui/Header/Header.tsx';
import { Toaster } from '@ui/Sonner/Sonner';
import { ActionMenu } from '@features/actions/components/ActionMenu/ActionMenu';
import { Menu } from '@features/Menu/Menu';

const Layout = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <Header>MyInvestor Challenge</Header>
        <main className="flex items-start gap-8 w-full px-4 py-8 mb-20 md:max-w-6xl ">
          <Menu />
          <Outlet />
        </main>
      </div>
      <ActionMenu />
      <Toaster position="top-center" />
    </>
  );
};

export default Layout;
