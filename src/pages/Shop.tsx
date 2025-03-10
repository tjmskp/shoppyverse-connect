
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Filter,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { mockProducts } from "@/data/mockData";
import { Product } from "@/types";

// Filter categories
const categories = ["All", "Men", "Women", "Kids", "Traditional", "Accessories"];
const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 1000 });
  const [showFilter, setShowFilter] = useState(false);

  // Apply initial search query from URL
  useEffect(() => {
    const query = searchParams.get("search");
    if (query) {
      setSearchQuery(query);
      filterProducts(query, activeCategory, sortBy, priceRange);
    }
  }, [searchParams]);

  // Filter products based on search, category, sort, and price range
  const filterProducts = (
    query: string,
    category: string,
    sort: string,
    price: { min: number; max: number }
  ) => {
    setLoading(true);
    
    // Filter by search query and category
    let filtered = [...mockProducts];
    
    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.id.toLowerCase().includes(lowerQuery) ||
          product.sku.toLowerCase().includes(lowerQuery) ||
          product.name.toLowerCase().includes(lowerQuery) ||
          product.category.toLowerCase().includes(lowerQuery) ||
          product.variants.some((variant) =>
            variant.options.some((option) => option.toLowerCase().includes(lowerQuery))
          )
      );
    }
    
    // Filter by category
    if (category !== "All") {
      filtered = filtered.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(
      (product) => {
        const discountedPrice = product.price - (product.price * (product.discount / 100));
        return discountedPrice >= price.min && discountedPrice <= price.max;
      }
    );
    
    // Sort products
    switch (sort) {
      case "price-low":
        filtered = filtered.sort((a, b) => {
          const aPriceWithDiscount = a.price - (a.price * (a.discount / 100));
          const bPriceWithDiscount = b.price - (b.price * (b.discount / 100));
          return aPriceWithDiscount - bPriceWithDiscount;
        });
        break;
      case "price-high":
        filtered = filtered.sort((a, b) => {
          const aPriceWithDiscount = a.price - (a.price * (a.discount / 100));
          const bPriceWithDiscount = b.price - (b.price * (b.discount / 100));
          return bPriceWithDiscount - aPriceWithDiscount;
        });
        break;
      case "popular":
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
      default:
        // Assume product id contains date information for this mock
        filtered = filtered.sort((a, b) => b.id.localeCompare(a.id));
        break;
    }
    
    setFilteredProducts(filtered);
    setLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(searchQuery ? { search: searchQuery } : {});
    filterProducts(searchQuery, activeCategory, sortBy, priceRange);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    filterProducts(searchQuery, category, sortBy, priceRange);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    filterProducts(searchQuery, activeCategory, sort, priceRange);
  };

  const handlePriceChange = (min: number, max: number) => {
    const newRange = { min, max };
    setPriceRange(newRange);
    filterProducts(searchQuery, activeCategory, sortBy, newRange);
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <Layout>
      {/* Hero Banner */}
      <div className="bg-black text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Shop All Products</h1>
          <p className="max-w-2xl mx-auto text-gray-300">
            Discover unique designs from the best Bangladeshi clothing brands all in one place.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search by name, SKU, category..."
                  className="pl-10 pr-4 w-full md:w-80"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>

            {/* Sort Dropdown and Filter Toggle */}
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-auto">
                <select
                  className="appearance-none bg-white border border-gray-200 rounded-md py-2 px-4 pr-8 w-full"
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>

              {/* Filter Toggle Button (Mobile) */}
              <Button
                variant="outline"
                className="md:hidden flex items-center gap-2"
                onClick={toggleFilter}
              >
                <Filter size={16} />
                Filters
                {showFilter ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
            </div>
          </div>

          {/* Mobile Filters (Collapsible) */}
          <div className={`md:hidden mb-4 ${showFilter ? 'block' : 'hidden'}`}>
            <div className="bg-gray-50 p-4 rounded-md">
              {/* Categories */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`px-3 py-1 text-sm rounded-full ${
                        activeCategory === category
                          ? "bg-black text-white"
                          : "bg-white border border-gray-200 text-gray-800"
                      }`}
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    className="w-full"
                    value={priceRange.min}
                    onChange={(e) => handlePriceChange(Number(e.target.value), priceRange.max)}
                  />
                  <span>-</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    className="w-full"
                    value={priceRange.max}
                    onChange={(e) => handlePriceChange(priceRange.min, Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Category Filters */}
          <div className="hidden md:flex space-x-2 md:space-x-4 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 whitespace-nowrap rounded-full transition-colors ${
                  activeCategory === category
                    ? "bg-black text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters (Desktop) */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium mb-4">Filters</h3>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Price Range</h4>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      className="w-full"
                      value={priceRange.min}
                      onChange={(e) => handlePriceChange(Number(e.target.value), priceRange.max)}
                    />
                    <span>-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      className="w-full"
                      value={priceRange.max}
                      onChange={(e) => handlePriceChange(priceRange.min, Number(e.target.value))}
                    />
                  </div>
                </div>

                {/* Additional filters can be added here */}
                <Button 
                  className="w-full"
                  onClick={() => filterProducts(searchQuery, activeCategory, sortBy, priceRange)}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
              </div>
            ) : (
              <>
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-16">
                    <h3 className="text-xl font-medium mb-2">No products found</h3>
                    <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
                    <Button onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("All");
                      setSortBy("newest");
                      setPriceRange({ min: 0, max: 1000 });
                      filterProducts("", "All", "newest", { min: 0, max: 1000 });
                    }}>
                      Reset Filters
                    </Button>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-gray-500 mb-4">
                      Showing {filteredProducts.length} products
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
