
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Heart, 
  Share2, 
  Star, 
  Truck, 
  RefreshCw,
  Shield, 
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Store
} from "lucide-react";
import { mockProducts } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";
import { Product, ProductVariant } from "@/types";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = mockProducts.find(p => p.id === id);
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  
  // If product is not found, show a message
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  // Calculate discounted price
  const discountedPrice = product.price - (product.price * product.discount / 100);
  
  // Find related products (products from the same category)
  const relatedProducts = mockProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  // Handle variant selection
  const handleVariantChange = (variantName: string, option: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantName]: option
    }));
  };
  
  // Handle quantity change
  const handleQuantityChange = (value: number) => {
    if (value < 1) return;
    if (value > product.stock) return;
    setQuantity(value);
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    // Check if all variants are selected
    if (product.variants.length > 0) {
      const allVariantsSelected = product.variants.every(
        variant => selectedVariants[variant.name]
      );
      
      if (!allVariantsSelected) {
        toast({
          title: "Please select all options",
          description: "You need to select all product options before adding to cart",
          variant: "destructive",
        });
        return;
      }
    }
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };
  
  // Handle wishlist
  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist`,
    });
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-black">Home</Link>
          <ChevronRight size={16} className="mx-2" />
          <Link to="/shop" className="hover:text-black">Shop</Link>
          <ChevronRight size={16} className="mx-2" />
          <Link to={`/category/${product.category.toLowerCase()}`} className="hover:text-black capitalize">
            {product.category}
          </Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-800 truncate">{product.name}</span>
        </nav>
        
        {/* Product Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Product Images */}
          <div>
            <div className="bg-gray-100 aspect-square rounded-lg overflow-hidden mb-4">
              <img 
                src={product.images[activeImageIndex]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((image, index) => (
                <button 
                  key={index}
                  className={`aspect-square border-2 rounded-md overflow-hidden ${
                    index === activeImageIndex ? 'border-black' : 'border-transparent'
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - view ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div>
            {/* Vendor */}
            <Link to={`/vendor/${product.vendorId}`} className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Store size={16} />
              {product.vendor}
            </Link>
            
            {/* Product Name */}
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
            
            {/* Ratings */}
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < product.rating ? "text-yellow-500 fill-current" : "text-gray-300"} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-2">({product.reviews} reviews)</span>
            </div>
            
            {/* Price */}
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold">${discountedPrice.toFixed(2)}</span>
              {product.discount > 0 && (
                <>
                  <span className="text-gray-500 text-lg line-through ml-2">${product.price.toFixed(2)}</span>
                  <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>
            
            {/* Short Description */}
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            {/* Product Variants */}
            {product.variants.length > 0 && (
              <div className="mb-6 space-y-4">
                {product.variants.map((variant: ProductVariant) => (
                  <div key={variant.name}>
                    <h3 className="font-medium mb-2">{variant.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {variant.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleVariantChange(variant.name, option)}
                          className={`px-3 py-1 border rounded-md text-sm ${
                            selectedVariants[variant.name] === option
                              ? "border-black bg-black text-white"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center">
                <button 
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="p-2 border border-gray-300 rounded-l-md hover:bg-gray-100"
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                  className="w-16 text-center border-y border-gray-300 py-2"
                  min="1"
                  max={product.stock}
                />
                <button 
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="p-2 border border-gray-300 rounded-r-md hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
                <span className="text-sm text-gray-500 ml-4">{product.stock} available</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button 
                size="lg" 
                className="flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={18} />
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleAddToWishlist}
              >
                <Heart size={18} />
                Add to Wishlist
              </Button>
            </div>
            
            {/* Product Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start">
                <Truck size={18} className="text-gray-700 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium">Free Shipping</h4>
                  <p className="text-sm text-gray-600">Free shipping on orders over $50</p>
                </div>
              </div>
              <div className="flex items-start">
                <RefreshCw size={18} className="text-gray-700 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium">Easy Returns</h4>
                  <p className="text-sm text-gray-600">30-day money back guarantee</p>
                </div>
              </div>
              <div className="flex items-start">
                <Shield size={18} className="text-gray-700 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium">Secure Checkout</h4>
                  <p className="text-sm text-gray-600">Encrypted payment processing</p>
                </div>
              </div>
            </div>
            
            {/* Share Buttons */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Share:</span>
              <button className="text-gray-600 hover:text-black">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Product Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="description">
            <TabsList className="w-full grid grid-cols-3 max-w-2xl mx-auto">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Additional Info</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="py-6">
              <div className="max-w-3xl mx-auto">
                <p className="text-gray-700">
                  {product.description}
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="py-6">
              <div className="max-w-3xl mx-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 text-sm font-medium text-gray-500 w-1/3">SKU</td>
                      <td className="py-3 text-sm text-gray-900">{product.sku}</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-sm font-medium text-gray-500">Category</td>
                      <td className="py-3 text-sm text-gray-900 capitalize">{product.category}</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-sm font-medium text-gray-500">Vendor</td>
                      <td className="py-3 text-sm text-gray-900">{product.vendor}</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-sm font-medium text-gray-500">Stock</td>
                      <td className="py-3 text-sm text-gray-900">{product.stock} Items</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="py-6">
              <div className="max-w-3xl mx-auto">
                <div className="text-center py-8">
                  <h3 className="text-xl font-medium mb-2">Customer Reviews</h3>
                  <div className="flex justify-center items-center mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={20} 
                          className={i < product.rating ? "text-yellow-500 fill-current" : "text-gray-300"} 
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 ml-2">Based on {product.reviews} reviews</span>
                  </div>
                  <Button>Write a Review</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
