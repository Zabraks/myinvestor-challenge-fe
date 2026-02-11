import { Outlet } from 'react-router-dom';
import Header from '@components/Header/Header.tsx';
import { FundActionDialogProvider } from '@context/FundActionDialogContext';

const Layout = () => {
  return (
    <FundActionDialogProvider>
      <div className="flex flex-col items-center">
        <Header />
        <main className="w-full max-w-4xl px-4 py-8">
          <Outlet />
        </main>
      </div>
    </FundActionDialogProvider>
  );
};

export default Layout;
