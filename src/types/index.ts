
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  category: string;
  sku: string;
  stock: number;
  vendor: string;
  vendorId: string;
  images: string[];
  variants: ProductVariant[];
  rating: number;
  reviews: number;
}

export interface ProductVariant {
  name: string;
  options: string[];
}

export interface Vendor {
  id: string;
  name: string;
  description: string;
  logo: string;
  coverImage: string;
  products: number;
  rating: number;
  reviews: number;
  joined: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'vendor' | 'admin';
  avatar?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  variant?: {
    [key: string]: string;
  };
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
}

export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

// Additional types for Supabase integration
export interface SupabaseProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  category: string;
  vendor: string;
  images: string[];
  stock: number;
  created_at: string;
  updated_at: string;
}

export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
  product?: SupabaseProduct;
}

export interface UserProfile {
  id: string;
  full_name: string;
  avatar_url: string;
  email: string;
  phone: string;
  default_shipping_address: ShippingAddress;
  created_at: string;
  updated_at: string;
}
