
import Layout from "@/components/layout/Layout";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const Shipping = () => {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{t('shippingReturns')}</h1>
        <Separator className="mb-8" />
        
        {/* Shipping Information */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium text-lg mb-3">Standard Shipping</h3>
                <p className="text-gray-600 mb-2">Delivery within 2-5 business days (Dhaka)</p>
                <p className="text-gray-600 mb-2">Delivery within 5-10 business days (Outside Dhaka)</p>
                <p className="text-gray-700 font-medium">
                  Fee: ৳60 (Dhaka) / ৳120 (Outside Dhaka)
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium text-lg mb-3">Express Shipping</h3>
                <p className="text-gray-600 mb-2">Delivery within 24 hours (Dhaka only)</p>
                <p className="text-gray-600 mb-2">Available for orders placed before 12 PM</p>
                <p className="text-gray-700 font-medium">
                  Fee: ৳150
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium text-lg mb-3">Free Shipping</h3>
                <p className="text-gray-600 mb-2">Available on orders above ৳5,000</p>
                <p className="text-gray-600 mb-2">Standard delivery timeline applies</p>
                <p className="text-gray-700 font-medium">
                  Fee: Free
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Accordion type="single" collapsible className="mb-8">
            <AccordionItem value="shipping-policy-1">
              <AccordionTrigger>How do you calculate shipping costs?</AccordionTrigger>
              <AccordionContent>
                <p>Shipping costs are calculated based on your delivery location, the weight and dimensions of your package, and your chosen shipping method. You can see the exact shipping cost during checkout before finalizing your order.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="shipping-policy-2">
              <AccordionTrigger>Can I track my order?</AccordionTrigger>
              <AccordionContent>
                <p>Yes, once your order ships, you'll receive a confirmation email with a tracking number. You can use this number on our Track Order page to monitor your delivery status in real-time.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="shipping-policy-3">
              <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
              <AccordionContent>
                <p>Currently, we only ship within Bangladesh. We're working on expanding our shipping capabilities and hope to offer international shipping in the future.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="shipping-policy-4">
              <AccordionTrigger>What if my package is damaged during shipping?</AccordionTrigger>
              <AccordionContent>
                <p>If your package arrives damaged, please take photos of the damaged packaging and products, and contact our customer service within 24 hours of delivery. We'll arrange for a return and replacement at no additional cost to you.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        {/* Returns Information */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Returns & Refunds</h2>
          
          <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <h3 className="font-medium text-lg mb-3">Return Policy Overview</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• We accept returns within 14 days of delivery</li>
              <li>• Items must be unused, unworn, and in original packaging with all tags attached</li>
              <li>• Return shipping costs are borne by the customer, except in cases of damaged or defective items</li>
              <li>• Refunds are processed within 5-7 business days after we receive the returned items</li>
            </ul>
          </div>
          
          <Accordion type="single" collapsible className="mb-8">
            <AccordionItem value="return-policy-1">
              <AccordionTrigger>How do I initiate a return?</AccordionTrigger>
              <AccordionContent>
                <p>To initiate a return, follow these steps:</p>
                <ol className="list-decimal pl-5 mt-2 space-y-1">
                  <li>Log into your account and go to "My Orders"</li>
                  <li>Select the order containing the item(s) you wish to return</li>
                  <li>Click on "Return Items" and follow the prompts</li>
                  <li>Print the return label (if provided) or note the return address</li>
                  <li>Package the item(s) securely in their original packaging</li>
                  <li>Ship the package to the provided return address</li>
                </ol>
                <p className="mt-2">Alternatively, you can contact our customer support for assistance with your return.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="return-policy-2">
              <AccordionTrigger>What items cannot be returned?</AccordionTrigger>
              <AccordionContent>
                <p>The following items cannot be returned:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Intimate apparel and undergarments</li>
                  <li>Customized or personalized products</li>
                  <li>Items marked as "Final Sale" or purchased during clearance sales</li>
                  <li>Products with removed tags or without original packaging</li>
                  <li>Items showing signs of wear, damage, or alteration after delivery</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="return-policy-3">
              <AccordionTrigger>How will I receive my refund?</AccordionTrigger>
              <AccordionContent>
                <p>Refunds are processed to the original payment method used for the purchase. Processing time varies depending on your payment provider:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Credit/Debit cards: 5-10 business days</li>
                  <li>Mobile banking (bKash, Nagad): 2-4 business days</li>
                  <li>Cash on delivery payments: Refunded as store credit or through bank transfer</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="return-policy-4">
              <AccordionTrigger>Can I exchange an item instead of returning it?</AccordionTrigger>
              <AccordionContent>
                <p>Yes, you can exchange items for a different size or color, subject to availability. To request an exchange:</p>
                <ol className="list-decimal pl-5 mt-2 space-y-1">
                  <li>Initiate a return as normal</li>
                  <li>Select "Exchange" as your return reason</li>
                  <li>Specify the size/color you wish to receive instead</li>
                  <li>Once we receive your returned item, we'll ship the exchange if available</li>
                </ol>
                <p className="mt-2">If the requested exchange item is unavailable, we'll process a refund instead.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        {/* Contact Section */}
        <div className="bg-black text-white p-8 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Need More Help?</h2>
          <p className="max-w-2xl mx-auto mb-6">
            Our customer service team is here to assist you with any questions or concerns about shipping, returns, or refunds.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black" asChild>
              <Link to="/faq">View FAQs</Link>
            </Button>
            <Button className="bg-white text-black hover:bg-gray-200" asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shipping;
