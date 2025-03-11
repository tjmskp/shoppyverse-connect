
import { Link } from "react-router-dom";
import { Upload, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const ProductsTab = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products</h2>
        <div className="flex space-x-2">
          <Button asChild>
            <Link to="/vendor/bulk-import">
              <Upload className="h-4 w-4 mr-2" />
              Bulk Import
            </Link>
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Product
          </Button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 mb-4">
        <Input 
          placeholder="Search products..." 
          className="max-w-sm"
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
    </div>
  );
};

export default ProductsTab;
