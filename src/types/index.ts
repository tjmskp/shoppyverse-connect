
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
