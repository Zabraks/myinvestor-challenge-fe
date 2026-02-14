import { Outlet } from 'react-router-dom';
import Header from '@components/Header/Header.tsx';
import { FundActionDialogProvider } from '@context/FundActionDialogContext';
import { Toaster } from '@ui/Sonner/Sonner';
import { Menu } from '@features/Menu/Menu';

const Layout = () => {
  return (
    <FundActionDialogProvider>
      <div className="flex flex-col items-center">
        <Header />
        <main className="flex items-start gap-8 w-full max-w-4xl px-4 py-8 mb-20">
          <Menu />
          <Outlet />
        </main>
      </div>
      <Toaster />
    </FundActionDialogProvider>
  );
};

export default Layout;
