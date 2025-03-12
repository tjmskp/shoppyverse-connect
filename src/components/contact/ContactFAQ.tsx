
import { Card, CardContent } from "@/components/ui/card";

const ContactFAQ = () => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-5">
            <h3 className="font-medium mb-2">What are your shipping times?</h3>
            <p className="text-gray-600">Standard shipping takes 2-5 business days within Dhaka and 5-10 business days for the rest of Bangladesh.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <h3 className="font-medium mb-2">How can I track my order?</h3>
            <p className="text-gray-600">Visit our "Track Order" page and enter your order number to get real-time updates on your purchase.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <h3 className="font-medium mb-2">What is your return policy?</h3>
            <p className="text-gray-600">We offer a 14-day return policy for most items. Please visit our "Shipping & Returns" page for full details.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <h3 className="font-medium mb-2">How can vendors join Shoppygain?</h3>
            <p className="text-gray-600">Vendors can apply through our "Become a Vendor" page. We review all applications within 7 business days.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactFAQ;
