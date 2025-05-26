import React, { useContext, useState } from 'react';
import { Heart, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Product } from '../types';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { CartContext } from '../contexts/CartContext';
import Button from './Button';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const [quantity, setQuantity] = useState(1);
  const { isFavorite, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
  const { addToCart } = useContext(CartContext);
  
  const isProductFavorite = isFavorite(product.id);
  
  const handleFavoriteToggle = () => {
    if (isProductFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };
  
  const handleAddToCart = () => {
    // Add product to cart multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-6xl mx-auto">
      <button 
        className="flex items-center p-4 text-[#4E6688] hover:text-[#3D5175] transition-colors"
        onClick={onBack}
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to products
      </button>
      
      <div className="md:flex">
        <div className="md:w-1/2">
          <div className="h-96 md:h-full overflow-hidden">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
        
        <div className="p-6 md:w-1/2">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h1>
            <button 
              className={`p-2 rounded-full ${
                isProductFavorite ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-400 hover:text-red-500'
              } transition-colors duration-200`}
              onClick={handleFavoriteToggle}
            >
              <Heart className={`w-6 h-6 ${isProductFavorite ? 'fill-red-500' : ''}`} />
            </button>
          </div>
          
          <div className="flex items-center mb-4">
            {/* Rating stars */}
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg 
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating.rate) 
                      ? 'text-yellow-400' 
                      : 'text-gray-300'
                  }`}
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-sm text-gray-500 ml-2">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>
          </div>
          
          <div className="mb-4">
            <span className="text-3xl font-bold text-[#4E6688]">${product.price.toFixed(2)}</span>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Category</h3>
            <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              {product.category}
            </span>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Quantity</h3>
            <div className="flex items-center">
              <button 
                className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-3 py-1 rounded-l-md"
                onClick={decreaseQuantity}
              >
                -
              </button>
              <span className="bg-gray-100 text-gray-800 px-4 py-1">
                {quantity}
              </span>
              <button 
                className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-3 py-1 rounded-r-md"
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>
          </div>
          
          <Button 
            variant="secondary" 
            size="lg"
            fullWidth
            className="flex items-center justify-center"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;