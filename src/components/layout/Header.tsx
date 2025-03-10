
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  User, 
  Search, 
  Menu, 
  X, 
  Heart,
  Store
} from "lucide-react";
import SearchBar from "@/components/search/SearchBar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="font-bold text-xl md:text-2xl">
            SHOPPYGAIN
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-900 hover:text-gray-700 font-medium">
              Home
            </Link>
            <Link to="/shop" className="text-gray-900 hover:text-gray-700 font-medium">
              Shop
            </Link>
            <Link to="/vendors" className="text-gray-900 hover:text-gray-700 font-medium">
              Vendors
            </Link>
            <Link to="/about" className="text-gray-900 hover:text-gray-700 font-medium">
              About
            </Link>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button onClick={toggleSearch} className="p-2 hover:bg-gray-100 rounded-full">
              <Search size={20} />
            </button>
            <Link to="/wishlist" className="p-2 hover:bg-gray-100 rounded-full">
              <Heart size={20} />
            </Link>
            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                0
              </span>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <User size={16} />
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                0
              </span>
            </Link>
            <button onClick={toggleMenu} className="p-2 hover:bg-gray-100 rounded-full">
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Bar (shown when search is toggled) */}
        <SearchBar isOpen={isSearchOpen} onClose={toggleSearch} />
      </div>

      {/* Mobile Menu (shown when menu is toggled) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-gray-900 hover:text-gray-700 py-2 border-b border-gray-100"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className="text-gray-900 hover:text-gray-700 py-2 border-b border-gray-100"
              onClick={toggleMenu}
            >
              Shop
            </Link>
            <Link 
              to="/vendors" 
              className="text-gray-900 hover:text-gray-700 py-2 border-b border-gray-100"
              onClick={toggleMenu}
            >
              Vendors
            </Link>
            <Link 
              to="/about" 
              className="text-gray-900 hover:text-gray-700 py-2 border-b border-gray-100"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link 
              to="/wishlist" 
              className="text-gray-900 hover:text-gray-700 py-2 border-b border-gray-100"
              onClick={toggleMenu}
            >
              Wishlist
            </Link>
            <Link 
              to="/login" 
              className="text-gray-900 hover:text-gray-700 py-2"
              onClick={toggleMenu}
            >
              Login / Register
            </Link>
          </nav>
          <div className="mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input 
                placeholder="Search for products..." 
                className="pl-10 w-full border border-gray-200 rounded-md py-2"
                onClick={() => {
                  toggleMenu();
                  toggleSearch();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
