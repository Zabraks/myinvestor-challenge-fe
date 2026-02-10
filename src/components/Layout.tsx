import { Outlet } from 'react-router-dom';
import Header from '@components/Header/Header.tsx';

const Layout = () => {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <main className="w-full max-w-4xl">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
