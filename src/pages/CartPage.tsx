import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import CartItem from '../components/CartItem';
import Button from '../components/Button';

interface CartPageProps {
  onNavigate: (page: string) => void;
}

const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const { cart, clearCart, getTotalPrice } = useContext(CartContext);
  
  const handleCheckout = () => {
    alert('Checkout functionality would process payment here.');
    clearCart();
    onNavigate('products');
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg shadow-sm">
          <div className="mb-4">
            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button 
            variant="primary"
            onClick={() => onNavigate('products')}
          >
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Cart Items ({cart.reduce((total, item) => total + item.quantity, 0)})
            </h2>
            
            <div className="divide-y divide-gray-200">
              {cart.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>
          
          <div className="p-6 bg-gray-50">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-800 font-medium">${getTotalPrice().toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-800 font-medium">$0.00</span>
            </div>
            
            <div className="flex justify-between mb-4 pt-2 border-t border-gray-200">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-lg font-bold text-[#4E6688]">${getTotalPrice().toFixed(2)}</span>
            </div>
            
            <div className="flex space-x-4">
              <Button 
                variant="outline"
                onClick={() => onNavigate('products')}
                className="flex-1"
              >
                Continue Shopping
              </Button>
              
              <Button 
                variant="secondary"
                onClick={handleCheckout}
                className="flex-1"
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;