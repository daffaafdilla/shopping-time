import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import FavoritesPage from './pages/FavoritesPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };
  
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'products':
        return <ProductsPage onNavigate={handleNavigate} />;
      case 'favorites':
        return <FavoritesPage onNavigate={handleNavigate} />;
      case 'cart':
        return <CartPage onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };
  
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
            <main>{renderPage()}</main>
            <footer className="bg-[#4E6688] text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="md:flex md:justify-between">
                  <div className="mb-8 md:mb-0">
                    <div className="flex items-center">
                      <span className="text-2xl font-bold">Shopping</span>
                      <span className="text-2xl font-bold text-[#FF9B45]">Time</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-300">
                      Premium products for your lifestyle.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider">Shop</h3>
                      <ul className="mt-4 space-y-2">
                        <li>
                          <button 
                            className="text-sm text-gray-300 hover:text-white"
                            onClick={() => handleNavigate('products')}
                          >
                            All Products
                          </button>
                        </li>
                        <li>
                          <button 
                            className="text-sm text-gray-300 hover:text-white"
                            onClick={() => handleNavigate('favorites')}
                          >
                            Favorites
                          </button>
                        </li>
                        <li>
                          <button 
                            className="text-sm text-gray-300 hover:text-white"
                            onClick={() => handleNavigate('cart')}
                          >
                            Cart
                          </button>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider">Account</h3>
                      <ul className="mt-4 space-y-2">
                        <li>
                          <button 
                            className="text-sm text-gray-300 hover:text-white"
                            onClick={() => handleNavigate('login')}
                          >
                            Login
                          </button>
                        </li>
                        <li>
                          <button className="text-sm text-gray-300 hover:text-white">
                            Orders
                          </button>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
                      <ul className="mt-4 space-y-2">
                        <li>
                          <button className="text-sm text-gray-300 hover:text-white">
                            About Us
                          </button>
                        </li>
                        <li>
                          <button className="text-sm text-gray-300 hover:text-white">
                            Contact
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 border-t border-gray-700 pt-8">
                  <p className="text-sm text-gray-300">
                    &copy; 2025 Daffa Afdilla. All rights reserved.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
