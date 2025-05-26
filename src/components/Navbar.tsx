import React, { useState, useContext } from 'react';
import { Heart, ShoppingCart, User, Menu, X } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { getTotalItems } = useContext(CartContext);
  
  const cartItemCount = getTotalItems();
  
  const navItems = [
    { name: 'Home', key: 'home' },
    { name: 'Products', key: 'products' },
    { name: 'Favorites', key: 'favorites', icon: Heart, requiresAuth: true },
    { name: 'Cart', key: 'cart', icon: ShoppingCart, badge: cartItemCount },
  ];
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavigation = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center">
            <div 
              className="flex-shrink-0 flex items-center cursor-pointer"
              onClick={() => handleNavigation('home')}
            >
              <span className="text-2xl font-bold text-[#4E6688]">Shopping</span>
              <span className="text-2xl font-bold text-[#FF9B45]">Time</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navItems.map(item => {
                if (item.requiresAuth && !isAuthenticated) return null;
                
                return (
                  <div 
                    key={item.key}
                    className={`relative inline-flex items-center px-1 pt-1 cursor-pointer 
                      ${currentPage === item.key 
                        ? 'text-[#4E6688] border-b-2 border-[#4E6688] font-medium' 
                        : 'text-gray-500 hover:text-[#4E6688] hover:border-b-2 hover:border-[#4E6688]/50'
                      }`}
                    onClick={() => handleNavigation(item.key)}
                  >
                    {item.icon && <item.icon className="w-5 h-5 mr-1" />}
                    {item.name}
                    {item.badge && item.badge > 0 && (
                      <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-[#FF9B45] rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm font-medium text-gray-700">
                  <User className="inline w-5 h-5 mr-1" />
                  {user?.username}
                </div>
                <button 
                  className="text-sm font-medium text-[#4E6688] hover:text-[#3D5175]"
                  onClick={() => {
                    logout();
                    handleNavigation('login');
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                className="text-sm font-medium text-[#4E6688] hover:text-[#3D5175]"
                onClick={() => handleNavigation('login')}
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-[#4E6688] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#4E6688]"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map(item => {
              if (item.requiresAuth && !isAuthenticated) return null;
              
              return (
                <div
                  key={item.key}
                  className={`relative block pl-3 pr-4 py-2 font-medium cursor-pointer
                    ${currentPage === item.key
                      ? 'bg-[#4E6688]/10 text-[#4E6688] border-l-4 border-[#4E6688]'
                      : 'text-gray-500 hover:bg-gray-50 hover:border-l-4 hover:border-[#4E6688]/50 hover:text-[#4E6688]'
                    }`}
                  onClick={() => handleNavigation(item.key)}
                >
                  <div className="flex items-center">
                    {item.icon && <item.icon className="w-5 h-5 mr-1" />}
                    {item.name}
                    {item.badge && item.badge > 0 && (
                      <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-[#FF9B45] rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              {isAuthenticated ? (
                <div className="flex flex-col w-full">
                  <div className="text-base font-medium text-gray-800 mb-2">
                    <User className="inline w-5 h-5 mr-1" />
                    {user?.username}
                  </div>
                  <button 
                    className="text-sm font-medium text-[#4E6688] hover:text-[#3D5175] text-left"
                    onClick={() => {
                      logout();
                      handleNavigation('login');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  className="block text-base font-medium text-[#4E6688] hover:text-[#3D5175]"
                  onClick={() => {
                    handleNavigation('login');
                    setMobileMenuOpen(false);
                  }}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
