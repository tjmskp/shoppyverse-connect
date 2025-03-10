
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Product } from "@/types";
import { toast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [favorited, setFavorited] = useState(false);
  
  const discountedPrice = product.price - (product.price * (product.discount / 100));
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    // Add to cart logic will be implemented with context
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };
  
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setFavorited(!favorited);
    
    toast({
      title: favorited ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${favorited ? "removed from" : "added to"} your wishlist`,
    });
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img 
            src={isHovered && product.images.length > 1 ? product.images[1] : product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Discount Badge */}
          {product.discount > 0 && (
            <div className="absolute top-2 left-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded">
              {product.discount}% OFF
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
            <div className="flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <button 
                onClick={handleAddToCart}
                className="bg-white text-black p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Add to cart"
              >
                <ShoppingCart size={18} />
              </button>
              <button 
                onClick={handleToggleFavorite}
                className={`p-2 rounded-full transition-colors ${
                  favorited 
                    ? "bg-red-500 text-white hover:bg-red-600" 
                    : "bg-white text-black hover:bg-gray-100"
                }`}
                aria-label={favorited ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart size={18} className={favorited ? "fill-current" : ""} />
              </button>
              <Link 
                to={`/product/${product.id}`}
                className="bg-white text-black p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Quick view"
              >
                <Eye size={18} />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          {/* Vendor Name */}
          <p className="text-gray-500 text-sm mb-1">{product.vendor}</p>
          
          {/* Product Name */}
          <h3 className="font-medium text-base mb-1 group-hover:text-black transition-colors">
            {product.name}
          </h3>
          
          {/* Price */}
          <div className="flex items-center">
            <span className="font-semibold text-black">
              ${discountedPrice.toFixed(2)}
            </span>
            
            {product.discount > 0 && (
              <span className="text-gray-400 text-sm line-through ml-2">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
