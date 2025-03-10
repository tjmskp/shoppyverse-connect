
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { mockProducts } from "@/data/mockData";
import { Product } from "@/types";

const categories = ["All", "Men", "Women", "Accessories"];

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredProducts = activeCategory === "All" 
    ? mockProducts.slice(0, 8) 
    : mockProducts
        .filter(product => 
          product.category === activeCategory.toLowerCase()
        )
        .slice(0, 8);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-bold mb-4 md:mb-0">Featured Products</h2>
          
          {/* Category Tabs */}
          <div className="flex space-x-2 md:space-x-4 overflow-x-auto pb-2 w-full md:w-auto scrollbar-none">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 whitespace-nowrap rounded-full transition-colors ${
                  activeCategory === category
                    ? "bg-black text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link 
            to="/shop" 
            className="inline-flex items-center text-black hover:text-gray-700 font-medium"
          >
            View All Products
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
