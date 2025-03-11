
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const CommissionsTab = () => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default CommissionsTab;
