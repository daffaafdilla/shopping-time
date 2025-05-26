import React from 'react';
import { ShoppingBag } from 'lucide-react';
import Button from '../components/Button';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-[#4E6688] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Discover Our Premium Collection
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Explore our handpicked products designed for quality, style, and convenience.
              Shop the latest trends and timeless classics.
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => onNavigate('products')}
              className="animate-pulse"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Shop Now
            </Button>
          </div>
        </div>
        
        {/* Decorative corner shape */}
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-[#FF9B45] rounded-tl-full opacity-60"></div>
      </div>
      
      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Shop With Us</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 bg-[#4E6688]/20 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#4E6688]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Quality Products</h3>
            <p className="text-gray-600">
              We carefully select each product to ensure superior quality and durability.
            </p>
          </div>
          
          <div className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 bg-[#4E6688]/20 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#4E6688]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Fast Delivery</h3>
            <p className="text-gray-600">
              Enjoy quick and reliable shipping with our trusted delivery partners.
            </p>
          </div>
          
          <div className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 bg-[#4E6688]/20 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#4E6688]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Secure Payments</h3>
            <p className="text-gray-600">
              Shop with confidence using our secure and encrypted payment systems.
            </p>
          </div>
        </div>
      </div>
      
      {/* Featured Categories */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Popular Categories</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Accessories', 'Clothing', 'Footwear', 'Electronics'].map((category, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300"
                onClick={() => onNavigate('products')}
              >
                <div className="h-40 bg-gray-200 flex items-center justify-center">
                  {/* Placeholder for category image */}
                  <span className="text-4xl text-gray-400">
                    {index === 0 && '👜'}
                    {index === 1 && '👕'}
                    {index === 2 && '👟'}
                    {index === 3 && '📱'}
                  </span>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-medium text-gray-900">{category}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-[#FF9B45] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Shopping?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied customers and discover our wide range of products.
          </p>
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => onNavigate('products')}
          >
            Explore All Products
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;