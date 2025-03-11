import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCSVImport from "@/components/products/ProductCSVImport";

const VendorBulkImport = () => {
  // This would normally be fetched from auth context
  const vendorId = "vendor-123"; // Placeholder vendor ID
  const vendorName = "Fashion Trends BD"; // Placeholder vendor name
  
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const handleImportSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Vendor Dashboard Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="font-bold text-xl">Shoppygain</Link>
            <span className="text-gray-400">|</span>
            <span className="font-medium">Vendor Dashboard</span>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button variant="outline" size="sm" asChild className="mr-4">
            <Link to="/vendor/dashboard">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Bulk Product Import</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Sidebar - Same as vendor dashboard */}
          <div className="lg:col-span-1">
            {/* Keep sidebar from dashboard */}
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-4">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">CSV Product Uploader</h2>
              <ProductCSVImport 
                vendorId={vendorId} 
                onSuccess={handleImportSuccess}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorBulkImport;
