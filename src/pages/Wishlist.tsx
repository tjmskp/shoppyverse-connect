
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { X, ShoppingCart, Heart } from "lucide-react";
import { mockProducts } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";
import { Product, WishlistItem } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      // If not logged in, redirect to login
      navigate('/login');
      return;
    }
    
    fetchWishlistItems();
  }, [user]);
  
  const fetchWishlistItems = async () => {
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
        .eq('user_id', user?.id);
      
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
  
  const removeFromWishlist = async (productId: string) => {
    try {
      if (!user) return;
      
      const { error } = await supabase
        .from('wishlist_items')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);
      
      if (error) throw error;
      
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
  
  const addToCart = (product: Product) => {
    // Implement real cart logic with Supabase in the future
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };
  
  const clearWishlist = async () => {
    try {
      if (!user) return;
      
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
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex justify-center items-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <Heart size={36} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-medium mb-4">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added anything to your wishlist yet.</p>
            <Button asChild size="lg">
              <Link to="/shop">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200">
              <div className="col-span-6 font-medium">Product</div>
              <div className="col-span-2 font-medium text-center">Price</div>
              <div className="col-span-2 font-medium text-center">Stock Status</div>
              <div className="col-span-2 font-medium text-right">Actions</div>
            </div>
            
            {wishlistItems.map((product) => {
              const discountedPrice = 
                product.price - (product.price * (product.discount / 100));
              
              return (
                <div 
                  key={product.id} 
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-gray-200 items-center"
                >
                  {/* Product Info */}
                  <div className="col-span-1 md:col-span-6">
                    <div className="flex gap-4">
                      <div className="h-24 w-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          <Link to={`/product/${product.id}`} className="hover:underline">
                            {product.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-500">{product.vendor}</p>
                        <button 
                          onClick={() => removeFromWishlist(product.id)}
                          className="text-sm text-red-600 hover:text-red-800 mt-2 flex items-center md:hidden"
                        >
                          <X size={14} className="mr-1" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="md:col-span-2 text-left md:text-center">
                    <div className="md:hidden text-sm font-medium text-gray-500">Price:</div>
                    <div className="flex items-center md:justify-center">
                      <span className="font-medium">${discountedPrice.toFixed(2)}</span>
                      {product.discount > 0 && (
                        <span className="text-gray-400 text-sm line-through ml-2">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Stock Status */}
                  <div className="md:col-span-2 text-left md:text-center">
                    <div className="md:hidden text-sm font-medium text-gray-500">Stock Status:</div>
                    <span className={`text-sm font-medium ${
                      product.stock > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  
                  {/* Actions */}
                  <div className="md:col-span-2 flex gap-2 justify-start md:justify-end">
                    <Button 
                      size="sm" 
                      disabled={product.stock === 0}
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart size={14} />
                      <span className="md:hidden ml-1">Add to Cart</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => removeFromWishlist(product.id)}
                      className="hidden md:flex"
                    >
                      <X size={14} />
                    </Button>
                  </div>
                </div>
              );
            })}
            
            <div className="p-4 flex justify-between">
              <Link to="/shop" className="flex items-center text-black hover:underline text-sm">
                Continue Shopping
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={clearWishlist}
              >
                Clear Wishlist
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Wishlist;
