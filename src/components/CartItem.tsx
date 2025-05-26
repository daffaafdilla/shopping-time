import React, { useContext } from 'react';
import { X } from 'lucide-react';
import { CartItem as CartItemType } from '../types';
import { CartContext } from '../contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useContext(CartContext);
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity);
    }
  };
  
  const totalPrice = (item.price * item.quantity).toFixed(2);
  
  return (
    <div className="flex items-center py-4 border-b border-gray-200 last:border-b-0">
      <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-md">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      <div className="ml-4 flex-1">
        <h3 className="text-base font-medium text-gray-900 line-clamp-1">{item.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-1">{item.category}</p>
        <span className="text-sm font-medium text-[#4E6688]">${item.price.toFixed(2)} each</span>
      </div>
      
      <div className="flex items-center ml-4">
        <button 
          className="p-1 text-gray-400 hover:text-gray-500"
          onClick={() => handleQuantityChange(item.quantity - 1)}
        >
          <span className="sr-only">Decrease quantity</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        
        <span className="mx-2 text-gray-700 w-6 text-center">{item.quantity}</span>
        
        <button 
          className="p-1 text-gray-400 hover:text-gray-500"
          onClick={() => handleQuantityChange(item.quantity + 1)}
        >
          <span className="sr-only">Increase quantity</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      
      <div className="ml-4 text-right">
        <p className="text-base font-medium text-[#4E6688]">${totalPrice}</p>
        <button 
          className="mt-1 text-gray-400 hover:text-red-500"
          onClick={() => removeFromCart(item.id)}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;