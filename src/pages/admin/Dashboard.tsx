
import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import OverviewTab from "@/components/admin/tabs/OverviewTab";
import VendorsTab from "@/components/admin/tabs/VendorsTab";
import CustomersTab from "@/components/admin/tabs/CustomersTab";
import OrdersTab from "@/components/admin/tabs/OrdersTab";
import CommissionsTab from "@/components/admin/tabs/CommissionsTab";
import SettingsTab from "@/components/admin/tabs/SettingsTab";

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
      <AdminHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          
          {/* Main Content Area */}
          <div className="lg:col-span-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              {/* Overview Tab */}
              <TabsContent value="overview">
                <OverviewTab stats={stats} />
              </TabsContent>
              
              {/* Vendors Tab */}
              <TabsContent value="vendors">
                <VendorsTab />
              </TabsContent>
              
              {/* Customers Tab */}
              <TabsContent value="customers">
                <CustomersTab />
              </TabsContent>
              
              {/* Orders Tab */}
              <TabsContent value="orders">
                <OrdersTab />
              </TabsContent>
              
              {/* Commissions Tab */}
              <TabsContent value="commissions">
                <CommissionsTab />
              </TabsContent>
              
              {/* Settings Tab */}
              <TabsContent value="settings">
                <SettingsTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
