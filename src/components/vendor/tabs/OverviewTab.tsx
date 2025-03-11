
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card";

interface OverviewTabProps {
  stats: {
    products: number;
    orders: number;
    revenue: number;
    pendingOrders: number;
  };
}

const OverviewTab = ({ stats }: OverviewTabProps) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default OverviewTab;
