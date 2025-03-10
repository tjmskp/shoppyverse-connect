
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Minus, Plus, ArrowRight, ShoppingBag } from "lucide-react";
import { mockProducts } from "@/data/mockData";
import { CartItem } from "@/types";
import { toast } from "@/hooks/use-toast";

const Cart = () => {
  // For now, use a mock cart with a few items
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: mockProducts[0], quantity: 1 },
    { product: mockProducts[2], quantity: 2 },
  ]);
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(
      cartItems.map((item) =>
        item.product.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.product.id !== id));
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
    });
  };
  
  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setIsApplyingCoupon(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsApplyingCoupon(false);
      toast({
        title: "Invalid coupon",
        description: "The coupon code you entered is invalid or expired",
      });
    }, 1000);
  };
  
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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex justify-center items-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <ShoppingBag size={36} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild size="lg">
              <Link to="/shop">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200">
                  <div className="col-span-6 font-medium">Product</div>
                  <div className="col-span-2 font-medium text-center">Price</div>
                  <div className="col-span-2 font-medium text-center">Quantity</div>
                  <div className="col-span-2 font-medium text-right">Total</div>
                </div>
                
                {cartItems.map((item) => {
                  const { product, quantity } = item;
                  const discountedPrice = 
                    product.price - (product.price * (product.discount / 100));
                  
                  return (
                    <div 
                      key={product.id} 
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-gray-200 items-center"
                    >
                      {/* Product Info */}
                      <div className="col-span-1 md:col-span-6">
                        <div className="flex gap-4">
                          <div className="h-24 w-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{product.name}</h3>
                            <p className="text-sm text-gray-500">{product.vendor}</p>
                            {product.variants.length > 0 && (
                              <p className="text-sm text-gray-500 mt-1">
                                {product.variants[0].name}: {product.variants[0].options[0]}
                              </p>
                            )}
                            <button 
                              onClick={() => removeItem(product.id)}
                              className="text-sm text-red-600 hover:text-red-800 mt-2 flex items-center"
                            >
                              <X size={14} className="mr-1" /> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="md:col-span-2 text-center md:text-center">
                        <div className="md:hidden text-sm font-medium text-gray-500">Price:</div>
                        <div className="flex items-center md:justify-center">
                          <span className="font-medium">${discountedPrice.toFixed(2)}</span>
                          {product.discount > 0 && (
                            <span className="text-gray-400 text-sm line-through ml-2">
                              ${product.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Quantity */}
                      <div className="md:col-span-2 text-center">
                        <div className="md:hidden text-sm font-medium text-gray-500">Quantity:</div>
                        <div className="flex items-center justify-center">
                          <button 
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="p-1 border border-gray-300 rounded-l-md hover:bg-gray-100"
                          >
                            <Minus size={14} />
                          </button>
                          <input
                            type="number"
                            value={quantity}
                            onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))}
                            className="w-12 text-center border-y border-gray-300 py-1"
                            min="1"
                          />
                          <button 
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="p-1 border border-gray-300 rounded-r-md hover:bg-gray-100"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="md:col-span-2 text-right">
                        <div className="md:hidden text-sm font-medium text-gray-500">Total:</div>
                        <span className="font-medium">
                          ${(discountedPrice * quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  );
                })}
                
                <div className="p-4 flex justify-between">
                  <Link to="/shop" className="flex items-center text-black hover:underline">
                    <ArrowRight size={16} className="mr-1 rotate-180" /> Continue Shopping
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => setCartItems([])}
                    className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-800"
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h2 className="text-lg font-bold">Order Summary</h2>
                </div>
                
                <div className="p-4">
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
                  
                  {/* Coupon Code */}
                  <div className="mt-6">
                    <form onSubmit={applyCoupon}>
                      <p className="text-sm mb-2">Have a coupon code?</p>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="flex-1"
                        />
                        <Button 
                          type="submit" 
                          variant="outline"
                          disabled={!couponCode || isApplyingCoupon}
                        >
                          {isApplyingCoupon ? "Applying..." : "Apply"}
                        </Button>
                      </div>
                    </form>
                  </div>
                  
                  {/* Checkout Button */}
                  <div className="mt-6">
                    <Button asChild className="w-full" size="lg">
                      <Link to="/checkout">Proceed to Checkout</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
