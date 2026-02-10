import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Layout Component</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
