
import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import VendorDashboardHeader from "@/components/vendor/VendorDashboardHeader";
import VendorSidebar from "@/components/vendor/VendorSidebar";
import OverviewTab from "@/components/vendor/tabs/OverviewTab";
import ProductsTab from "@/components/vendor/tabs/ProductsTab";
import OrdersTab from "@/components/vendor/tabs/OrdersTab";
import SettingsTab from "@/components/vendor/tabs/SettingsTab";

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
      <VendorDashboardHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <VendorSidebar 
              vendorName={vendorName}
              vendorJoinDate={vendorJoinDate}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
          
          {/* Main Content Area */}
          <div className="lg:col-span-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsContent value="overview">
                <OverviewTab stats={stats} />
              </TabsContent>
              
              <TabsContent value="products">
                <ProductsTab />
              </TabsContent>
              
              <TabsContent value="orders">
                <OrdersTab />
              </TabsContent>
              
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

export default VendorDashboard;
