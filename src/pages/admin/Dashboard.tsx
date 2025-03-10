
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Users, 
  Store, 
  ShoppingCart, 
  BarChart, 
  Settings, 
  LogOut,
  DollarSign,
  Percent,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock admin statistics
  const stats = {
    totalVendors: 42,
    totalCustomers: 876,
    totalOrders: 1245,
    totalRevenue: 1568000,
    pendingOrders: 38
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
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/">View Site</Link>
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
                <CardTitle>Admin Panel</CardTitle>
                <CardDescription>Manage your platform</CardDescription>
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
                    variant={activeTab === "vendors" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("vendors")}
                  >
                    <Store className="h-4 w-4 mr-2" />
                    Vendors
                  </Button>
                  <Button 
                    variant={activeTab === "customers" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("customers")}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Customers
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
                    variant={activeTab === "commissions" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("commissions")}
                  >
                    <Percent className="h-4 w-4 mr-2" />
                    Commissions
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Total Vendors</CardDescription>
                      <CardTitle className="text-2xl">{stats.totalVendors}</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Total Customers</CardDescription>
                      <CardTitle className="text-2xl">{stats.totalCustomers}</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Total Orders</CardDescription>
                      <CardTitle className="text-2xl">{stats.totalOrders}</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Revenue (BDT)</CardDescription>
                      <CardTitle className="text-2xl">{stats.totalRevenue.toLocaleString()}</CardTitle>
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
                    <CardDescription>Overall platform orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3">Order ID</th>
                            <th scope="col" className="px-6 py-3">Customer</th>
                            <th scope="col" className="px-6 py-3">Vendor</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white border-b">
                            <td className="px-6 py-4">#1234</td>
                            <td className="px-6 py-4">John Doe</td>
                            <td className="px-6 py-4">Fashion Trends BD</td>
                            <td className="px-6 py-4">June 1, 2023</td>
                            <td className="px-6 py-4">
                              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Pending</span>
                            </td>
                            <td className="px-6 py-4">2,500৳</td>
                          </tr>
                          <tr className="bg-gray-50 border-b">
                            <td className="px-6 py-4">#1235</td>
                            <td className="px-6 py-4">Jane Smith</td>
                            <td className="px-6 py-4">Traditional Styles</td>
                            <td className="px-6 py-4">May 30, 2023</td>
                            <td className="px-6 py-4">
                              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Completed</span>
                            </td>
                            <td className="px-6 py-4">3,200৳</td>
                          </tr>
                          <tr className="bg-white border-b">
                            <td className="px-6 py-4">#1236</td>
                            <td className="px-6 py-4">Sam Khan</td>
                            <td className="px-6 py-4">Modern Bangladesh</td>
                            <td className="px-6 py-4">May 29, 2023</td>
                            <td className="px-6 py-4">
                              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Completed</span>
                            </td>
                            <td className="px-6 py-4">1,800৳</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Top Vendors</CardTitle>
                    <CardDescription>Best performing vendors on your platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3">Vendor</th>
                            <th scope="col" className="px-6 py-3">Products</th>
                            <th scope="col" className="px-6 py-3">Orders</th>
                            <th scope="col" className="px-6 py-3">Revenue</th>
                            <th scope="col" className="px-6 py-3">Commission Rate</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white border-b">
                            <td className="px-6 py-4">Fashion Trends BD</td>
                            <td className="px-6 py-4">24</td>
                            <td className="px-6 py-4">156</td>
                            <td className="px-6 py-4">245,600৳</td>
                            <td className="px-6 py-4">12%</td>
                          </tr>
                          <tr className="bg-gray-50 border-b">
                            <td className="px-6 py-4">Traditional Styles</td>
                            <td className="px-6 py-4">18</td>
                            <td className="px-6 py-4">124</td>
                            <td className="px-6 py-4">198,400৳</td>
                            <td className="px-6 py-4">10%</td>
                          </tr>
                          <tr className="bg-white border-b">
                            <td className="px-6 py-4">Modern Bangladesh</td>
                            <td className="px-6 py-4">32</td>
                            <td className="px-6 py-4">112</td>
                            <td className="px-6 py-4">178,500৳</td>
                            <td className="px-6 py-4">15%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Vendors Tab */}
              <TabsContent value="vendors" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Vendors</h2>
                  <div className="flex items-center space-x-2">
                    <Input 
                      placeholder="Search vendors..." 
                      className="max-w-sm"
                    />
                    <Button variant="outline">Filter</Button>
                  </div>
                </div>
                
                <Card>
                  <CardContent className="p-0">
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3">Vendor Name</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Products</th>
                            <th scope="col" className="px-6 py-3">Revenue</th>
                            <th scope="col" className="px-6 py-3">Commission</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white border-b">
                            <td className="px-6 py-4">Fashion Trends BD</td>
                            <td className="px-6 py-4">info@fashiontrends.bd</td>
                            <td className="px-6 py-4">24</td>
                            <td className="px-6 py-4">245,600৳</td>
                            <td className="px-6 py-4">12%</td>
                            <td className="px-6 py-4">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">View</Button>
                                <Button variant="outline" size="sm">Edit</Button>
                              </div>
                            </td>
                          </tr>
                          <tr className="bg-gray-50 border-b">
                            <td className="px-6 py-4">Traditional Styles</td>
                            <td className="px-6 py-4">contact@traditionalstyles.com</td>
                            <td className="px-6 py-4">18</td>
                            <td className="px-6 py-4">198,400৳</td>
                            <td className="px-6 py-4">10%</td>
                            <td className="px-6 py-4">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">View</Button>
                                <Button variant="outline" size="sm">Edit</Button>
                              </div>
                            </td>
                          </tr>
                          <tr className="bg-white border-b">
                            <td className="px-6 py-4">Modern Bangladesh</td>
                            <td className="px-6 py-4">hello@modernbd.com</td>
                            <td className="px-6 py-4">32</td>
                            <td className="px-6 py-4">178,500৳</td>
                            <td className="px-6 py-4">15%</td>
                            <td className="px-6 py-4">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">View</Button>
                                <Button variant="outline" size="sm">Edit</Button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Customers Tab */}
              <TabsContent value="customers" className="space-y-4">
                <h2 className="text-2xl font-bold">Customers</h2>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-center text-gray-500 my-8">Customer management functionality will be implemented in the next phase.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Orders Tab */}
              <TabsContent value="orders" className="space-y-4">
                <h2 className="text-2xl font-bold">Orders</h2>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-center text-gray-500 my-8">Order management functionality will be implemented in the next phase.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Commissions Tab */}
              <TabsContent value="commissions" className="space-y-4">
                <h2 className="text-2xl font-bold">Commission Management</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Vendor Commission Rates</CardTitle>
                    <CardDescription>Adjust commission percentages for each vendor</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3">Vendor Name</th>
                            <th scope="col" className="px-6 py-3">Current Commission</th>
                            <th scope="col" className="px-6 py-3">New Commission</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white border-b">
                            <td className="px-6 py-4">Fashion Trends BD</td>
                            <td className="px-6 py-4">12%</td>
                            <td className="px-6 py-4">
                              <Input type="number" min="5" max="30" defaultValue="12" className="w-20" />
                            </td>
                            <td className="px-6 py-4">
                              <Button size="sm">Update</Button>
                            </td>
                          </tr>
                          <tr className="bg-gray-50 border-b">
                            <td className="px-6 py-4">Traditional Styles</td>
                            <td className="px-6 py-4">10%</td>
                            <td className="px-6 py-4">
                              <Input type="number" min="5" max="30" defaultValue="10" className="w-20" />
                            </td>
                            <td className="px-6 py-4">
                              <Button size="sm">Update</Button>
                            </td>
                          </tr>
                          <tr className="bg-white border-b">
                            <td className="px-6 py-4">Modern Bangladesh</td>
                            <td className="px-6 py-4">15%</td>
                            <td className="px-6 py-4">
                              <Input type="number" min="5" max="30" defaultValue="15" className="w-20" />
                            </td>
                            <td className="px-6 py-4">
                              <Button size="sm">Update</Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
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

export default AdminDashboard;
