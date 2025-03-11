
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShoppingBag, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const OrderConfirmation = () => {
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  const { t } = useLanguage();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle size={48} className="text-green-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-2">Your order has been placed successfully.</p>
          <p className="text-gray-600 mb-6">Order Number: <span className="font-semibold">{orderNumber}</span></p>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-left mb-8">
            <h2 className="font-semibold text-lg mb-4">Order Details</h2>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Shipping Method</p>
              <p className="font-medium">Standard Shipping (5-7 business days)</p>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Payment Method</p>
              <p className="font-medium">Credit Card (ending in ***1234)</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-1">Shipping Address</p>
              <p className="font-medium">
                John Doe<br />
                123 Main Street<br />
                Apartment 4B<br />
                Dhaka, 1207<br />
                Bangladesh
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-4 md:flex-row md:justify-center mb-8">
            <Button asChild>
              <Link to="/shop">
                <ShoppingBag size={16} className="mr-2" />
                {t('continueShopping')}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/account/orders">
                View Order Status
                <ChevronRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">What happens next?</h3>
            <p className="text-gray-600 mb-4">
              You will receive an order confirmation email with details of your order.<br />
              We'll notify you once your order has been shipped.
            </p>
            <p className="text-sm text-gray-500">
              If you have any questions, please contact our customer support at <a href="mailto:support@shoppygain.com" className="text-black hover:underline">support@shoppygain.com</a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
