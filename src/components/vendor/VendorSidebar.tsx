
import { useState } from "react";
import { BarChart, Boxes, ShoppingCart, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface VendorSidebarProps {
  vendorName: string;
  vendorJoinDate: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const VendorSidebar = ({ 
  vendorName, 
  vendorJoinDate, 
  activeTab, 
  onTabChange 
}: VendorSidebarProps) => {
  return (
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
            onClick={() => onTabChange("overview")}
          >
            <BarChart className="h-4 w-4 mr-2" />
            Overview
          </Button>
          <Button 
            variant={activeTab === "products" ? "default" : "ghost"} 
            className="w-full justify-start"
            onClick={() => onTabChange("products")}
          >
            <Boxes className="h-4 w-4 mr-2" />
            Products
          </Button>
          <Button 
            variant={activeTab === "orders" ? "default" : "ghost"} 
            className="w-full justify-start"
            onClick={() => onTabChange("orders")}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Orders
          </Button>
          <Button 
            variant={activeTab === "settings" ? "default" : "ghost"} 
            className="w-full justify-start"
            onClick={() => onTabChange("settings")}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </nav>
      </CardContent>
    </Card>
  );
};

export default VendorSidebar;
