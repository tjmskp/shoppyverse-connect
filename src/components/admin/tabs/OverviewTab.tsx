
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface OverviewTabProps {
  stats: {
    totalVendors: number;
    totalCustomers: number;
    totalOrders: number;
    totalRevenue: number;
    pendingOrders: number;
  };
}

const OverviewTab = ({ stats }: OverviewTabProps) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default OverviewTab;
