
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { ShippingAddress } from "@/types";
import { mockProducts } from "@/data/mockData";

// Mocked cart items (in real app, would come from context or state management)
const cartItems = [
  { product: mockProducts[0], quantity: 1 },
  { product: mockProducts[2], quantity: 2 },
];

const Checkout = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [saveInfo, setSaveInfo] = useState(false);
  
  // Shipping address state
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Bangladesh",
    phone: "",
  });
  
  // Billing address state
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [billingAddress, setBillingAddress] = useState<ShippingAddress>({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Bangladesh",
    phone: "",
  });
  
  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => {
      const discountedPrice = 
        item.product.price - (item.product.price * (item.product.discount / 100));
      return sum + discountedPrice * item.quantity;
    },
    0
  );
  
  const shippingCost = 5.99;
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + shippingCost + tax;
  
  const handleShippingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Update billing too if same as shipping
    if (sameAsShipping) {
      setBillingAddress(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleBillingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCountryChange = (value: string, type: 'shipping' | 'billing') => {
    if (type === 'shipping') {
      setShippingAddress(prev => ({
        ...prev,
        country: value
      }));
      if (sameAsShipping) {
        setBillingAddress(prev => ({
          ...prev,
          country: value
        }));
      }
    } else {
      setBillingAddress(prev => ({
        ...prev,
        country: value
      }));
    }
  };
  
  const handleToggleSameAsShipping = (checked: boolean) => {
    setSameAsShipping(checked);
    if (checked) {
      setBillingAddress(shippingAddress);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate shipping address
    if (!shippingAddress.fullName || !shippingAddress.addressLine1 || !shippingAddress.city || 
        !shippingAddress.state || !shippingAddress.postalCode || !shippingAddress.phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required shipping information",
        variant: "destructive",
      });
      return;
    }
    
    // Validate billing address if not same as shipping
    if (!sameAsShipping && (!billingAddress.fullName || !billingAddress.addressLine1 || 
        !billingAddress.city || !billingAddress.state || !billingAddress.postalCode)) {
      toast({
        title: "Missing information",
        description: "Please fill in all required billing information",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      toast({
        title: "Order placed successfully",
        description: "Thank you for your purchase. Your order has been received.",
      });
      
      // Redirect to confirmation page
      navigate("/order-confirmation");
    }, 2000);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit}>
              {/* Shipping Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={shippingAddress.fullName}
                      onChange={handleShippingInputChange}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 1 *
                    </label>
                    <Input
                      id="addressLine1"
                      name="addressLine1"
                      type="text"
                      required
                      value={shippingAddress.addressLine1}
                      onChange={handleShippingInputChange}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 2
                    </label>
                    <Input
                      id="addressLine2"
                      name="addressLine2"
                      type="text"
                      value={shippingAddress.addressLine2 || ""}
                      onChange={handleShippingInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <Input
                      id="city"
                      name="city"
                      type="text"
                      required
                      value={shippingAddress.city}
                      onChange={handleShippingInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State/Province *
                    </label>
                    <Input
                      id="state"
                      name="state"
                      type="text"
                      required
                      value={shippingAddress.state}
                      onChange={handleShippingInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code *
                    </label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      required
                      value={shippingAddress.postalCode}
                      onChange={handleShippingInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Country *
                    </label>
                    <Select 
                      value={shippingAddress.country} 
                      onValueChange={(value) => handleCountryChange(value, 'shipping')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                        <SelectItem value="India">India</SelectItem>
                        <SelectItem value="Pakistan">Pakistan</SelectItem>
                        <SelectItem value="Sri Lanka">Sri Lanka</SelectItem>
                        <SelectItem value="Nepal">Nepal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={shippingAddress.phone}
                      onChange={handleShippingInputChange}
                    />
                  </div>
                  
                  <div className="md:col-span-2 flex items-center">
                    <Checkbox 
                      id="saveInfo" 
                      checked={saveInfo}
                      onCheckedChange={(checked) => setSaveInfo(checked === true)}
                      className="mr-2"
                    />
                    <label htmlFor="saveInfo" className="text-sm text-gray-700">
                      Save this information for next time
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Billing Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Billing Information</h2>
                  <div className="flex items-center">
                    <Checkbox 
                      id="sameAsShipping" 
                      checked={sameAsShipping}
                      onCheckedChange={(checked) => handleToggleSameAsShipping(checked === true)}
                      className="mr-2"
                    />
                    <label htmlFor="sameAsShipping" className="text-sm text-gray-700">
                      Same as shipping
                    </label>
                  </div>
                </div>
                
                {!sameAsShipping && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label htmlFor="billing-fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <Input
                        id="billing-fullName"
                        name="fullName"
                        type="text"
                        required
                        value={billingAddress.fullName}
                        onChange={handleBillingInputChange}
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="billing-addressLine1" className="block text-sm font-medium text-gray-700 mb-1">
                        Address Line 1 *
                      </label>
                      <Input
                        id="billing-addressLine1"
                        name="addressLine1"
                        type="text"
                        required
                        value={billingAddress.addressLine1}
                        onChange={handleBillingInputChange}
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="billing-addressLine2" className="block text-sm font-medium text-gray-700 mb-1">
                        Address Line 2
                      </label>
                      <Input
                        id="billing-addressLine2"
                        name="addressLine2"
                        type="text"
                        value={billingAddress.addressLine2 || ""}
                        onChange={handleBillingInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="billing-city" className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <Input
                        id="billing-city"
                        name="city"
                        type="text"
                        required
                        value={billingAddress.city}
                        onChange={handleBillingInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="billing-state" className="block text-sm font-medium text-gray-700 mb-1">
                        State/Province *
                      </label>
                      <Input
                        id="billing-state"
                        name="state"
                        type="text"
                        required
                        value={billingAddress.state}
                        onChange={handleBillingInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="billing-postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code *
                      </label>
                      <Input
                        id="billing-postalCode"
                        name="postalCode"
                        type="text"
                        required
                        value={billingAddress.postalCode}
                        onChange={handleBillingInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="billing-country" className="block text-sm font-medium text-gray-700 mb-1">
                        Country *
                      </label>
                      <Select 
                        value={billingAddress.country} 
                        onValueChange={(value) => handleCountryChange(value, 'billing')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                          <SelectItem value="India">India</SelectItem>
                          <SelectItem value="Pakistan">Pakistan</SelectItem>
                          <SelectItem value="Sri Lanka">Sri Lanka</SelectItem>
                          <SelectItem value="Nepal">Nepal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="billing-phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <Input
                        id="billing-phone"
                        name="phone"
                        type="tel"
                        required
                        value={billingAddress.phone}
                        onChange={handleBillingInputChange}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Payment Method */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="credit-card"
                      name="paymentMethod"
                      type="radio"
                      className="h-4 w-4 text-black border-gray-300 focus:ring-black"
                      checked={paymentMethod === "credit-card"}
                      onChange={() => setPaymentMethod("credit-card")}
                    />
                    <label htmlFor="credit-card" className="ml-3 block text-sm font-medium text-gray-700">
                      Credit / Debit Card
                    </label>
                  </div>
                  
                  {paymentMethod === "credit-card" && (
                    <div className="ml-7 mt-3 border-t border-gray-200 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                            Cardholder Name
                          </label>
                          <Input
                            id="cardName"
                            name="cardName"
                            type="text"
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number
                          </label>
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            type="text"
                            placeholder="**** **** **** ****"
                          />
                        </div>
                        <div>
                          <label htmlFor="expDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiration Date
                          </label>
                          <Input
                            id="expDate"
                            name="expDate"
                            type="text"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <Input
                            id="cvv"
                            name="cvv"
                            type="text"
                            placeholder="***"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <input
                      id="cash-on-delivery"
                      name="paymentMethod"
                      type="radio"
                      className="h-4 w-4 text-black border-gray-300 focus:ring-black"
                      checked={paymentMethod === "cash-on-delivery"}
                      onChange={() => setPaymentMethod("cash-on-delivery")}
                    />
                    <label htmlFor="cash-on-delivery" className="ml-3 block text-sm font-medium text-gray-700">
                      Cash on Delivery
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="mobile-banking"
                      name="paymentMethod"
                      type="radio"
                      className="h-4 w-4 text-black border-gray-300 focus:ring-black"
                      checked={paymentMethod === "mobile-banking"}
                      onChange={() => setPaymentMethod("mobile-banking")}
                    />
                    <label htmlFor="mobile-banking" className="ml-3 block text-sm font-medium text-gray-700">
                      bKash / Nagad / Rocket
                    </label>
                  </div>
                  
                  {paymentMethod === "mobile-banking" && (
                    <div className="ml-7 mt-3 border-t border-gray-200 pt-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Mobile Banking Number
                          </label>
                          <Input
                            id="mobileNumber"
                            name="mobileNumber"
                            type="text"
                            placeholder="01XXXXXXXXX"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-6">
                <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                  {isProcessing ? "Processing..." : `Place Order - $${total.toFixed(2)}`}
                </Button>
              </div>
            </form>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden sticky top-24">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-bold">Order Summary</h2>
              </div>
              
              <div className="p-4">
                {/* Order Items */}
                <div className="mb-4">
                  {cartItems.map((item) => {
                    const { product, quantity } = item;
                    const discountedPrice = 
                      product.price - (product.price * (product.discount / 100));
                    
                    return (
                      <div key={product.id} className="flex py-3 border-b border-gray-100">
                        <div className="h-16 w-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 mr-3">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">{product.name}</h4>
                          <p className="text-xs text-gray-500">Qty: {quantity}</p>
                          <div className="text-sm mt-1">
                            <span className="font-medium">${discountedPrice.toFixed(2)}</span>
                            {product.discount > 0 && (
                              <span className="text-gray-400 text-xs line-through ml-1">
                                ${product.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (5%)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="font-bold">Total</span>
                      <span className="font-bold">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <Link to="/cart" className="text-sm text-black hover:underline">
                    Edit Cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
