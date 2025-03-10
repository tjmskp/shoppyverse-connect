
import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockProducts } from "@/data/mockData";
import { Product } from "@/types";
import { Link } from "react-router-dom";

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchBar = ({ isOpen, onClose }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input when search is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Filter products based on search query
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = mockProducts.filter(
      (product) =>
        product.id.toLowerCase().includes(lowerQuery) ||
        product.sku.toLowerCase().includes(lowerQuery) ||
        product.name.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery) ||
        product.variants.some((variant) =>
          variant.options.some((option) => option.toLowerCase().includes(lowerQuery))
        )
    );

    setResults(filtered.slice(0, 6)); // Limit to first 6 results
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleResultClick = () => {
    setQuery("");
    setResults([]);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically redirect to search results page
    // For now, just close the search
    if (query.trim()) {
      onClose();
    }
  };

  return (
    <div className={`w-full ${isOpen ? 'block' : 'hidden'}`}>
      <div className="relative">
        <form onSubmit={handleSubmit}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            ref={inputRef}
            placeholder="Search for products, brands, or categories..."
            className="pl-10 pr-10 py-2 w-full"
            value={query}
            onChange={handleInputChange}
            autoFocus
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black"
          >
            <X size={18} />
          </button>
        </form>
      </div>

      {/* Search Results Dropdown */}
      {results.length > 0 && (
        <div className="absolute z-50 mt-1 w-full max-h-96 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Products</h3>
            <ul className="space-y-2">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    to={`/product/${product.id}`}
                    className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={handleResultClick}
                  >
                    <div className="h-12 w-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500">
                        {product.category} • ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to={`/shop?search=${encodeURIComponent(query)}`}
              className="block mt-4 text-center text-sm text-black hover:underline"
              onClick={handleResultClick}
            >
              View all results
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
