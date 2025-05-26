import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Product, FavoritesContextType } from '../types';

const defaultFavoritesContext: FavoritesContextType = {
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  isFavorite: () => false
};

export const FavoritesContext = createContext<FavoritesContextType>(defaultFavoritesContext);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    // Load favorites from localStorage on initial render
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    // Save favorites to localStorage whenever it changes
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (product: Product): void => {
    setFavorites(prevFavorites => {
      // Check if product is already in favorites
      const isAlreadyFavorite = prevFavorites.some(item => item.id === product.id);
      
      if (isAlreadyFavorite) {
        return prevFavorites;
      } else {
        return [...prevFavorites, product];
      }
    });
  };

  const removeFromFavorites = (productId: number): void => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(item => item.id !== productId)
    );
  };

  const isFavorite = (productId: number): boolean => {
    return favorites.some(item => item.id === productId);
  };

  return (
    <FavoritesContext.Provider 
      value={{ 
        favorites, 
        addToFavorites, 
        removeFromFavorites, 
        isFavorite 
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};