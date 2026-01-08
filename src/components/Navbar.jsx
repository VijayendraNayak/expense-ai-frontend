import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  BarChart3, 
  User, 
  Wallet 
} from 'lucide-react';

const Navbar = () => {
  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/add', label: 'Add Expense', icon: PlusCircle },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 }
  ];

  return (
    <nav className="bg-linear-to-r from-purple-600 via-purple-700 to-indigo-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/"
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-all duration-300">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <span className="text-white font-bold text-xl hidden sm:block">
              Expense Tracker
            </span>
          </Link>

          {/* Navigation Items */}
          <div className="flex space-x-1 sm:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) => `
                    flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg
                    font-medium transition-all duration-300 transform
                    ${isActive 
                      ? 'bg-white/25 text-white shadow-lg scale-105' 
                      : 'text-white/80 hover:bg-white/15 hover:text-white hover:scale-105'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden md:inline text-sm lg:text-base">
                    {item.label}
                  </span>
                </NavLink>
              );
            })}
          </div>

          {/* User Profile */}
          <div className="flex items-center">
            <button className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all duration-300 transform hover:scale-110">
              <User className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
