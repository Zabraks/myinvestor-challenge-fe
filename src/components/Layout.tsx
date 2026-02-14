import { Outlet } from 'react-router-dom';
import Header from '@components/Header/Header.tsx';
import { Toaster } from '@ui/Sonner/Sonner';
import { ActionMenu } from '@/features/actions/components/ActionMenu/ActionMenu';
import { Menu } from '@features/Menu/Menu';

const Layout = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <Header />
        <main className="flex items-start gap-8 w-full max-w-4xl px-4 py-8 mb-20">
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
