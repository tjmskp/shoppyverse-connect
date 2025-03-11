
import { 
  Users, 
  Store, 
  ShoppingCart, 
  BarChart, 
  Settings, 
  Percent
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminSidebar = ({ activeTab, setActiveTab }: AdminSidebarProps) => {
  return (
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
  );
};

export default AdminSidebar;
