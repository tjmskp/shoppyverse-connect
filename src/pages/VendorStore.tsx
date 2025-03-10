
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, Calendar, Star, Filter } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { mockVendors, mockProducts } from "@/data/mockData";
import { Product } from "@/types";

const VendorStore = () => {
  const { id } = useParams<{ id: string }>();
  const vendor = mockVendors.find(v => v.id === id);
  
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!vendor) return;
    
    setLoading(true);
    // Get all products from this vendor
    let products = mockProducts.filter(p => p.vendorId === vendor.id);
    
    // Filter by search query if any
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      products = products.filter(
        p => p.name.toLowerCase().includes(query) || 
             p.description.toLowerCase().includes(query) ||
             p.category.toLowerCase().includes(query)
      );
    }
    
    // Filter by category if not "all"
    if (activeTab !== "all") {
      products = products.filter(p => p.category.toLowerCase() === activeTab.toLowerCase());
    }
    
    setFilteredProducts(products);
    setLoading(false);
  }, [vendor, searchQuery, activeTab]);
  
  // Get unique categories for this vendor
  const vendorCategories = [...new Set(
    mockProducts
      .filter(p => p.vendorId === id)
      .map(p => p.category.toLowerCase())
  )];
  
  // If vendor is not found, show a message
  if (!vendor) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Vendor Not Found</h1>
          <p className="text-gray-600 mb-8">The vendor you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <a href="/vendors">Browse All Vendors</a>
          </Button>
        </div>
      </Layout>
    );
  }
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled in the useEffect
  };
  
  return (
    <Layout>
      {/* Vendor Banner */}
      <div 
        className="h-64 bg-gray-200 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${vendor.coverImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="container mx-auto px-4 h-full flex items-end pb-20">
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{vendor.name}</h1>
            <div className="flex items-center text-white">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < vendor.rating ? "text-yellow-500 fill-current" : "text-gray-300"} 
                  />
                ))}
              </div>
              <span className="text-sm">({vendor.reviews} reviews)</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Vendor Info Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="h-20 w-20 rounded-full border-4 border-white overflow-hidden bg-white shadow-md mr-4">
              <img 
                src={vendor.logo} 
                alt={`${vendor.name} logo`} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center text-gray-600 text-sm mb-1">
                <MapPin size={14} className="mr-1" />
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <Calendar size={14} className="mr-1" />
                <span>Joined {vendor.joined}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline">
              Contact Seller
            </Button>
            <Button>
              Follow Store
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Store Description */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3">About the Store</h2>
          <p className="text-gray-700">{vendor.description}</p>
        </div>
        
        {/* Search and Filters */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search products in this store..."
                className="pl-10 pr-4 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
          
          {/* Category Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full md:w-auto overflow-auto scrollbar-none">
              <TabsTrigger value="all">All Products</TabsTrigger>
              {vendorCategories.map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="capitalize"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        {/* Products Grid */}
        <div>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
          ) : (
            <>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <h3 className="text-xl font-medium mb-2">No products found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your search or browse different categories</p>
                  <Button onClick={() => {
                    setSearchQuery("");
                    setActiveTab("all");
                  }}>
                    Reset Search
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
    </Layout>
  );
};

export default VendorStore;
