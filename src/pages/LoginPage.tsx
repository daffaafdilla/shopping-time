import React, { useState, useContext, useEffect } from 'react';
import { User, Key } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';
import Button from '../components/Button';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useContext(AuthContext);
  
  useEffect(() => {
    // Redirect to products if already logged in
    if (isAuthenticated) {
      onNavigate('products');
    }
  }, [isAuthenticated, onNavigate]);
  
  const handleLogin = () => {
    setError('');
    
    if (username.trim() === '' || password.trim() === '') {
      setError('Username and password are required');
      return;
    }
    
    if (username.length < 3) {
      setError('Username must be at least 3 characters long');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    const success = login(username, password);
    if (success) {
      // Redirect to products page
      onNavigate('products');
    } else {
      setError('Invalid login credentials');
    }
  };
  
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <button 
              className="font-medium text-[#4E6688] hover:text-[#3D5175]"
              onClick={() => onNavigate('home')}
            >
              continue as guest
            </button>
          </p>
        </div>
        
        <div className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md">
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div className="rounded-md -space-y-px">
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#4E6688] focus:border-[#4E6688] focus:z-10 sm:text-sm"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Must be at least 3 characters
              </p>
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#4E6688] focus:border-[#4E6688] focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Must be at least 6 characters
              </p>
            </div>
          </div>
          
          <div>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleLogin}
            >
              Sign in
            </Button>
          </div>
          
          <div className="text-center text-xs text-gray-500 mt-4">
            <p>For demo purposes, any username (min 3 chars) and password (min 6 chars) will work</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;