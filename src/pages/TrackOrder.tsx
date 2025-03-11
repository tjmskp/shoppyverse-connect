
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Truck, Package, CheckCircle, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TrackOrder = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  
  // Mock order data
  const mockOrderData = {
    orderNumber: "SG100287465",
    orderDate: "June 15, 2024",
    status: "In Transit",
    estimatedDelivery: "June 20, 2024",
    items: [
      { id: 1, name: "Embroidered Cotton Kurti", quantity: 1, price: 3200 },
      { id: 2, name: "Silk Blend Scarf", quantity: 2, price: 1500 }
    ],
    shippingAddress: "42 Lake View Apartment, Gulshan, Dhaka, Bangladesh",
    trackingSteps: [
      { id: 1, name: "Order Confirmed", completed: true, date: "June 15, 2024, 10:30 AM" },
      { id: 2, name: "Processing", completed: true, date: "June 16, 2024, 2:15 PM" },
      { id: 3, name: "Shipped", completed: true, date: "June 17, 2024, 11:45 AM" },
      { id: 4, name: "In Transit", completed: true, date: "June 18, 2024, 9:20 AM" },
      { id: 5, name: "Out for Delivery", completed: false, date: null },
      { id: 6, name: "Delivered", completed: false, date: null }
    ]
  };
  
  const handleTrackOrder = (e) => {
    e.preventDefault();
    
    if (!orderNumber.trim() || !email.trim()) {
      toast({
        title: "Error",
        description: "Please enter both order number and email",
        variant: "destructive"
      });
      return;
    }
    
    setIsTracking(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // For demonstration, always show the mock order if valid inputs provided
      if (orderNumber.trim() && email.trim()) {
        setOrderDetails(mockOrderData);
      } else {
        toast({
          title: "Order Not Found",
          description: "We couldn't find an order with the provided details",
          variant: "destructive"
        });
        setOrderDetails(null);
      }
      
      setIsTracking(false);
    }, 1500);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{t('trackOrder')}</h1>
        <Separator className="mb-8" />
        
        <div className="max-w-4xl mx-auto">
          {!orderDetails ? (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">Track Your Order</h2>
                <p className="text-gray-600 mb-6">
                  Enter your order number and email address to track the status of your order.
                </p>
                
                <form onSubmit={handleTrackOrder} className="space-y-4">
                  <div>
                    <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Order Number
                    </label>
                    <Input
                      id="orderNumber"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      placeholder="e.g. SG100287465"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="The email you used when placing the order"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isTracking}>
                    {isTracking ? "Tracking..." : "Track Order"}
                  </Button>
                </form>
                
                <div className="mt-8 border-t pt-6">
                  <h3 className="font-medium mb-3">Don't have your order number?</h3>
                  <p className="text-gray-600 mb-4">
                    If you've lost your order number, you can find it in the order confirmation email or by logging into your account to view your order history.
                  </p>
                  <Button variant="outline">View Order History</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Order Status Overview */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                    <div>
                      <h2 className="text-xl font-semibold">Order #{orderDetails.orderNumber}</h2>
                      <p className="text-gray-600">Placed on {orderDetails.orderDate}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium text-sm">
                        {orderDetails.status}
                      </span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium mb-2">Estimated Delivery</h3>
                      <p className="text-gray-800">{orderDetails.estimatedDelivery}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Shipping Address</h3>
                      <p className="text-gray-800">{orderDetails.shippingAddress}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Order Tracking Steps */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-6">Tracking Information</h3>
                  
                  <div className="relative">
                    <div className="absolute left-8 top-0 h-full w-0.5 bg-gray-200"></div>
                    
                    <div className="space-y-8">
                      {orderDetails.trackingSteps.map((step) => (
                        <div key={step.id} className="relative flex items-start">
                          <div className="absolute left-0 mt-1">
                            {step.completed ? (
                              <CheckCircle className="w-6 h-6 text-green-500" />
                            ) : (
                              <div className="w-6 h-6 rounded-full border-2 border-gray-300 bg-white"></div>
                            )}
                          </div>
                          <div className="ml-12">
                            <h4 className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                              {step.name}
                            </h4>
                            {step.date && (
                              <p className="text-sm text-gray-500">
                                {step.date}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Order Items */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Order Items</h3>
                  
                  <div className="space-y-4">
                    {orderDetails.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Package className="w-8 h-8 text-gray-400 mr-3" />
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-medium">৳{item.price.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between">
                    <p className="font-medium">Total</p>
                    <p className="font-medium">
                      ৳{orderDetails.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Order Help */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <AlertCircle className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                      <p className="text-gray-600 mb-4">
                        If you have any questions or concerns about your order, our customer service team is here to help.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button variant="outline">Contact Support</Button>
                        <Button>Track Another Order</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TrackOrder;
