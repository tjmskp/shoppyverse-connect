
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Product } from '@/types';
import { mockProducts } from '@/data/mockData';

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Load wishlist items when user changes
  useEffect(() => {
    if (user) {
      fetchWishlistItems();
    } else {
      setWishlistItems([]);
      setLoading(false);
    }
  }, [user]);

  const fetchWishlistItems = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('wishlist_items')
        .select(`
          id,
          user_id,
          product_id,
          created_at,
          products:product_id (*)
        `)
        .eq('user_id', user.id);
      
      if (error) {
        throw error;
      }
      
      // Transform the data to match our Product interface
      const formattedProducts = data.map((item: any) => {
        // For now, we'll use the mock data as a fallback
        const mockProduct = mockProducts.find(p => p.id === item.product_id) || mockProducts[0];
        
        if (item.products) {
          return {
            ...mockProduct,
            id: item.product_id,
            name: item.products.name,
            description: item.products.description,
            price: item.products.price,
            discount: item.products.discount,
            category: item.products.category,
            stock: item.products.stock,
            vendor: item.products.vendor,
            images: item.products.images,
          };
        }
        
        return mockProduct;
      });
      
      setWishlistItems(formattedProducts);
    } catch (error: any) {
      console.error("Error fetching wishlist:", error.message);
      toast({
        title: "Failed to load wishlist",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (product: Product) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add items to your wishlist",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('wishlist_items')
        .insert({
          user_id: user.id,
          product_id: product.id,
        })
        .select();
      
      if (error) {
        if (error.code === '23505') { // Unique violation error code
          toast({
            title: "Already in wishlist",
            description: "This item is already in your wishlist"
          });
          return;
        }
        throw error;
      }
      
      // Add the item to the state
      setWishlistItems(prev => [...prev, product]);
      
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist`,
      });
    } catch (error: any) {
      console.error("Error adding to wishlist:", error.message);
      toast({
        title: "Failed to add to wishlist",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('wishlist_items')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);
      
      if (error) throw error;
      
      // Remove the item from the state
      setWishlistItems(prev => prev.filter(item => item.id !== productId));
      
      toast({
        title: "Removed from wishlist",
        description: "The item has been removed from your wishlist",
      });
    } catch (error: any) {
      console.error("Error removing from wishlist:", error.message);
      toast({
        title: "Failed to remove item",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const clearWishlist = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('wishlist_items')
        .delete()
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      setWishlistItems([]);
      
      toast({
        title: "Wishlist cleared",
        description: "All items have been removed from your wishlist",
      });
    } catch (error: any) {
      console.error("Error clearing wishlist:", error.message);
      toast({
        title: "Failed to clear wishlist",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.id === productId);
  };

  return {
    wishlistItems,
    loading,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    refreshWishlist: fetchWishlistItems
  };
};
