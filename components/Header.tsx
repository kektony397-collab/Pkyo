
import { NavLink } from 'react-router-dom';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive
      ? 'bg-brand-primary text-brand-dark'
      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
  }`;

function Header() {
  return (
    <header className="bg-black/30 shadow-lg backdrop-blur-sm">
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <NavLink to="/" className="text-2xl font-bold text-brand-primary">
              BikeDash
            </NavLink>
          </div>
          <div className="flex items-center space-x-4">
            <NavLink to="/" className={navLinkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/history" className={navLinkClass}>
              History
            </NavLink>
            <NavLink to="/settings" className={navLinkClass}>
              Settings
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
