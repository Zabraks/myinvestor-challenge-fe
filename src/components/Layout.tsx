import { Outlet } from 'react-router-dom';
import Header from '@components/Header/Header.tsx';
import { Toaster } from '@ui/Sonner/Sonner';
import { ActionMenu } from '@/features/actions/components/ActionMenu/ActionMenu';

const Layout = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <Header />
        <main className="w-full max-w-4xl px-4 py-8">
          <Outlet />
        </main>
      </div>
      <ActionMenu />
      <Toaster position="top-center" />
    </>
  );
};

export default Layout;
