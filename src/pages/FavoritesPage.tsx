import React, { useContext, useState } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext';
import ProductCard from '../components/ProductCard';
import ProductDetail from '../components/ProductDetail';
import { Product } from '../types';
import Button from '../components/Button';

interface FavoritesPageProps {
  onNavigate: (page: string) => void;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ onNavigate }) => {
  const { favorites } = useContext(FavoritesContext);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleBackToFavorites = () => {
    setSelectedProduct(null);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {selectedProduct ? (
        <ProductDetail 
          product={selectedProduct} 
          onBack={handleBackToFavorites} 
        />
      ) : (
        <>
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Favorites</h1>
          
          {favorites.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg shadow-sm">
              <div className="mb-4">
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
              <p className="text-gray-600 mb-6">
                Start adding products to your favorites by clicking the heart icon.
              </p>
              <Button 
                variant="primary"
                onClick={() => onNavigate('products')}
              >
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FavoritesPage;