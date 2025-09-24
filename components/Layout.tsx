
import { Outlet } from 'react-router-dom';
import Header from './Header';

function Layout() {
  return (
    <div className="flex h-screen flex-col bg-brand-dark">
      <Header />
      <main className="flex-grow overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
