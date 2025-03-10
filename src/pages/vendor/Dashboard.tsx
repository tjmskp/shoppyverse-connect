
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Boxes, 
  Package, 
  ShoppingCart, 
  BarChart, 
  Settings, 
  LogOut,
  Plus,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock vendor details
  const vendorName = "Fashion Trends BD";
  const vendorJoinDate = "January 2023";
  
  // Mock statistics
  const stats = {
    products: 24,
    orders: 156,
    revenue: 245600,
    pendingOrders: 12
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
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/">View Store</Link>
            </Button>
            <Button variant="ghost" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>{vendorName}</CardTitle>
                <CardDescription>Joined {vendorJoinDate}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <nav className="space-y-1">
                  <Button 
                    variant={activeTab === "overview" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("overview")}
                  >
                    <BarChart className="h-4 w-4 mr-2" />
                    Overview
                  </Button>
                  <Button 
                    variant={activeTab === "products" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("products")}
                  >
                    <Boxes className="h-4 w-4 mr-2" />
                    Products
                  </Button>
                  <Button 
                    variant={activeTab === "orders" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("orders")}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Orders
                  </Button>
                  <Button 
                    variant={activeTab === "settings" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content Area */}
          <div className="lg:col-span-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Total Products</CardDescription>
                      <CardTitle className="text-2xl">{stats.products}</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Total Orders</CardDescription>
                      <CardTitle className="text-2xl">{stats.orders}</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Revenue (BDT)</CardDescription>
                      <CardTitle className="text-2xl">{stats.revenue.toLocaleString()}</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Pending Orders</CardDescription>
                      <CardTitle className="text-2xl">{stats.pendingOrders}</CardTitle>
                    </CardHeader>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Your latest 5 orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3">Order ID</th>
                            <th scope="col" className="px-6 py-3">Customer</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white border-b">
                            <td className="px-6 py-4">#1234</td>
                            <td className="px-6 py-4">John Doe</td>
                            <td className="px-6 py-4">June 1, 2023</td>
                            <td className="px-6 py-4">
                              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Pending</span>
                            </td>
                            <td className="px-6 py-4">2,500৳</td>
                          </tr>
                          <tr className="bg-gray-50 border-b">
                            <td className="px-6 py-4">#1235</td>
                            <td className="px-6 py-4">Jane Smith</td>
                            <td className="px-6 py-4">May 30, 2023</td>
                            <td className="px-6 py-4">
                              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Completed</span>
                            </td>
                            <td className="px-6 py-4">3,200৳</td>
                          </tr>
                          <tr className="bg-white border-b">
                            <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                              View more orders in the Orders tab
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Products Tab */}
              <TabsContent value="products" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Products</h2>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Product
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2 mb-4">
                  <Input 
                    placeholder="Search products..." 
                    className="max-w-sm"
                    startIcon={<Search className="h-4 w-4" />}
                  />
                  <Button variant="outline">Filter</Button>
                </div>
                
                <Card>
                  <CardContent className="p-0">
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3">Image</th>
                            <th scope="col" className="px-6 py-3">Product Name</th>
                            <th scope="col" className="px-6 py-3">SKU</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Stock</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white border-b">
                            <td className="px-6 py-4">
                              <div className="h-10 w-10 bg-gray-200 rounded"></div>
                            </td>
                            <td className="px-6 py-4">Traditional Embroidered Blouse</td>
                            <td className="px-6 py-4">TB-001</td>
                            <td className="px-6 py-4">1,800৳</td>
                            <td className="px-6 py-4">24</td>
                            <td className="px-6 py-4">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">Edit</Button>
                                <Button variant="outline" size="sm">View</Button>
                              </div>
                            </td>
                          </tr>
                          <tr className="bg-gray-50 border-b">
                            <td className="px-6 py-4">
                              <div className="h-10 w-10 bg-gray-200 rounded"></div>
                            </td>
                            <td className="px-6 py-4">Modern Saree - Blue</td>
                            <td className="px-6 py-4">MS-002</td>
                            <td className="px-6 py-4">3,500৳</td>
                            <td className="px-6 py-4">12</td>
                            <td className="px-6 py-4">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">Edit</Button>
                                <Button variant="outline" size="sm">View</Button>
                              </div>
                            </td>
                          </tr>
                          <tr className="bg-white border-b">
                            <td className="px-6 py-4">
                              <div className="h-10 w-10 bg-gray-200 rounded"></div>
                            </td>
                            <td className="px-6 py-4">Cotton Kurta - White</td>
                            <td className="px-6 py-4">CK-003</td>
                            <td className="px-6 py-4">1,200৳</td>
                            <td className="px-6 py-4">36</td>
                            <td className="px-6 py-4">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">Edit</Button>
                                <Button variant="outline" size="sm">View</Button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Orders Tab */}
              <TabsContent value="orders" className="space-y-4">
                <h2 className="text-2xl font-bold">Orders</h2>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-center text-gray-500 my-8">Orders functionality will be implemented in the next phase.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-4">
                <h2 className="text-2xl font-bold">Settings</h2>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-center text-gray-500 my-8">Settings functionality will be implemented in the next phase.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
