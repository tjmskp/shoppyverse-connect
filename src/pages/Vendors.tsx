
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronRight } from "lucide-react";
import { mockVendors } from "@/data/mockData";
import { Vendor } from "@/types";

const Vendors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>(mockVendors);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setFilteredVendors(mockVendors);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = mockVendors.filter(
      (vendor) =>
        vendor.name.toLowerCase().includes(query) ||
        vendor.description.toLowerCase().includes(query)
    );
    setFilteredVendors(filtered);
  };

  return (
    <Layout>
      {/* Hero Banner */}
      <div className="bg-black text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Bangladeshi Clothing Brands</h1>
          <p className="max-w-2xl mx-auto text-gray-300">
            Discover unique designs from the best local brands, all in one place.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search for brands..."
                className="pl-10 pr-4 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>

        {/* Vendor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVendors.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <h3 className="text-xl font-medium mb-2">No vendors found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search criteria</p>
              <Button onClick={() => {
                setSearchQuery("");
                setFilteredVendors(mockVendors);
              }}>
                Reset Search
              </Button>
            </div>
          ) : (
            filteredVendors.map((vendor) => (
              <Link to={`/vendor/${vendor.id}`} key={vendor.id}>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow group">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={vendor.coverImage} 
                      alt={vendor.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <div className="flex justify-center -mt-12 mb-4">
                      <div className="h-20 w-20 rounded-full border-4 border-white overflow-hidden bg-white shadow-md">
                        <img 
                          src={vendor.logo} 
                          alt={`${vendor.name} logo`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <h3 className="font-bold text-xl mb-2">{vendor.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{vendor.description}</p>
                    <div className="flex items-center justify-center mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < vendor.rating 
                                ? "text-yellow-500 fill-current" 
                                : "text-gray-300 fill-current"
                            }`} 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-1">({vendor.reviews})</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">{vendor.products} Products</span>
                      <span className="text-gray-600">Since {vendor.joined}</span>
                    </div>
                  </div>
                  <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-center text-black font-medium">
                      Visit Store
                      <ChevronRight size={16} className="ml-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Vendors;
