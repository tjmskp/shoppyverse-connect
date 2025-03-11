import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCSVImport from "@/components/products/ProductCSVImport";

const AdminBulkImport = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const handleImportSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Dashboard Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="font-bold text-xl">Shoppygain</Link>
            <span className="text-gray-400">|</span>
            <span className="font-medium">Admin Dashboard</span>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button variant="outline" size="sm" asChild className="mr-4">
            <Link to="/admin/dashboard">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Bulk Product Import</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Sidebar - Same as admin dashboard */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Admin Panel</CardTitle>
                <CardDescription>Manage your platform</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <nav className="space-y-1">
                  <Button 
                    variant={"ghost"} 
                    className="w-full justify-start"
                    onClick={() => {}}
                  >
                    <Link className="flex items-center w-full" to="/admin/dashboard">
                      <BarChart className="h-4 w-4 mr-2" />
                      Overview
                    </Link>
                  </Button>
                  <Button 
                    variant={"ghost"} 
                    className="w-full justify-start"
                    onClick={() => {}}
                  >
                    <Link className="flex items-center w-full" to="/admin/dashboard">
                      <Store className="h-4 w-4 mr-2" />
                      Vendors
                    </Link>
                  </Button>
                  <Button 
                    variant={"ghost"} 
                    className="w-full justify-start"
                    onClick={() => {}}
                  >
                    <Link className="flex items-center w-full" to="/admin/dashboard">
                      <Users className="h-4 w-4 mr-2" />
                      Customers
                    </Link>
                  </Button>
                  <Button 
                    variant={"ghost"} 
                    className="w-full justify-start"
                    onClick={() => {}}
                  >
                    <Link className="flex items-center w-full" to="/admin/dashboard">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Orders
                    </Link>
                  </Button>
                  <Button 
                    variant={"ghost"} 
                    className="w-full justify-start"
                    onClick={() => {}}
                  >
                    <Link className="flex items-center w-full" to="/admin/dashboard">
                      <Percent className="h-4 w-4 mr-2" />
                      Commissions
                    </Link>
                  </Button>
                  <Button 
                    variant={"ghost"} 
                    className="w-full justify-start"
                    onClick={() => {}}
                  >
                    <Link className="flex items-center w-full" to="/admin/dashboard">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-4">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">CSV Product Uploader</h2>
              <p className="text-gray-600 mb-4">
                As an admin, you can upload products for any vendor. Make sure to include the vendor name in your CSV file.
              </p>
              <ProductCSVImport onSuccess={handleImportSuccess} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBulkImport;
