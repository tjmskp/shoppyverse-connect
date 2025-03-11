
import { Link } from "react-router-dom";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const VendorsTab = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Vendors</h2>
        <Button asChild>
          <Link to="/admin/bulk-import">
            <Upload className="h-4 w-4 mr-2" />
            Bulk Product Import
          </Link>
        </Button>
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
    </div>
  );
};

export default VendorsTab;
