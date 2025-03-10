
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { mockVendors } from "@/data/mockData";

const FeaturedVendors = () => {
  // Take only the first 4 vendors for the featured section
  const featuredVendors = mockVendors.slice(0, 4);

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Vendors</h2>
          <Link 
            to="/vendors" 
            className="inline-flex items-center text-black hover:text-gray-700 font-medium"
          >
            View All Vendors
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredVendors.map((vendor) => (
            <Link to={`/vendor/${vendor.id}`} key={vendor.id}>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow group">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={vendor.coverImage} 
                    alt={vendor.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 text-center">
                  <div className="flex justify-center -mt-12 mb-4">
                    <div className="h-16 w-16 rounded-full border-4 border-white overflow-hidden bg-white shadow-md">
                      <img 
                        src={vendor.logo} 
                        alt={`${vendor.name} logo`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{vendor.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{vendor.products} Products</p>
                  <div className="flex items-center justify-center">
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
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedVendors;
