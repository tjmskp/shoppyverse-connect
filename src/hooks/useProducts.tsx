
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { mockProducts } from '@/data/mockData';
import { SupabaseProduct, Product } from '@/types';

// Helper to convert from Supabase product to app Product interface
const mapSupabaseProduct = (product: SupabaseProduct): Product => {
  // Find a mock product to use as a base (for properties not in Supabase yet)
  const mockProduct = mockProducts.find(p => p.id === product.id) || mockProducts[0];
  
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    discount: product.discount,
    category: product.category,
    stock: product.stock,
    vendor: product.vendor,
    vendorId: mockProduct.vendorId, // Using mock data for now
    images: product.images,
    sku: mockProduct.sku, // Using mock data for now
    variants: mockProduct.variants, // Using mock data for now
    rating: mockProduct.rating, // Using mock data for now
    reviews: mockProduct.reviews, // Using mock data for now
  };
};

export const useProducts = (category?: string) => {
  return useQuery({
    queryKey: ['products', category],
    queryFn: async () => {
      try {
        // Query from Supabase
        let query = supabase.from('products').select('*');
        
        // Apply category filter if provided
        if (category && category !== 'All') {
          query = query.eq('category', category);
        }
        
        const { data, error } = await query;
        
        if (error) {
          console.error('Error fetching products:', error);
          return mockProducts; // Fallback to mock data
        }
        
        // If we have real data, map it to our interface
        if (data && data.length > 0) {
          return data.map(mapSupabaseProduct);
        }
        
        // Fallback to mock data if no real data exists yet
        return mockProducts;
      } catch (error) {
        console.error('Error in useProducts:', error);
        return mockProducts; // Fallback to mock data
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Hook to fetch a single product
export const useProduct = (id?: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      if (!id) {
        throw new Error('Product ID is required');
      }
      
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          console.error('Error fetching product:', error);
          // Fallback to mock data
          const mockProduct = mockProducts.find(p => p.id === id);
          if (mockProduct) return mockProduct;
          throw new Error('Product not found');
        }
        
        return mapSupabaseProduct(data as SupabaseProduct);
      } catch (error) {
        console.error('Error in useProduct:', error);
        // Fallback to mock data
        const mockProduct = mockProducts.find(p => p.id === id);
        if (mockProduct) return mockProduct;
        throw new Error('Product not found');
      }
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
