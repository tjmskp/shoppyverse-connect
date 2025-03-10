
import { Product, Vendor } from "@/types";

// Mock products data
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Classic Fitted Shirt",
    description: "A classic fitted shirt made from premium Bangladeshi cotton. Perfect for formal occasions.",
    price: 49.99,
    discount: 10,
    category: "men",
    sku: "MENS-SHIRT-001",
    stock: 25,
    vendor: "Dhaka Fabrics",
    vendorId: "1",
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80"
    ],
    variants: [
      { name: "Size", options: ["S", "M", "L", "XL"] },
      { name: "Color", options: ["White", "Blue", "Black"] }
    ],
    rating: 4.5,
    reviews: 12
  },
  {
    id: "2",
    name: "Embroidered Kurti",
    description: "Beautifully embroidered kurti made with traditional Bangladeshi designs.",
    price: 39.99,
    discount: 0,
    category: "women",
    sku: "WOMEN-KURTI-001",
    stock: 15,
    vendor: "Deshi Threads",
    vendorId: "2",
    images: [
      "https://images.unsplash.com/photo-1602810316693-3667c854239a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    ],
    variants: [
      { name: "Size", options: ["S", "M", "L", "XL"] },
      { name: "Color", options: ["Red", "Green", "Blue"] }
    ],
    rating: 4.8,
    reviews: 24
  },
  {
    id: "3",
    name: "Handcrafted Leather Belt",
    description: "Premium leather belt handcrafted by skilled artisans in Bangladesh.",
    price: 29.99,
    discount: 5,
    category: "accessories",
    sku: "ACC-BELT-001",
    stock: 30,
    vendor: "Dhaka Leathers",
    vendorId: "3",
    images: [
      "https://images.unsplash.com/photo-1623998021446-45cd9b467f8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1624222312639-a6d3c5f1f5a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    ],
    variants: [
      { name: "Size", options: ["S", "M", "L"] },
      { name: "Color", options: ["Brown", "Black"] }
    ],
    rating: 4.2,
    reviews: 9
  },
  {
    id: "4",
    name: "Traditional Panjabi",
    description: "Elegant traditional panjabi for men, perfect for festivals and special occasions.",
    price: 59.99,
    discount: 15,
    category: "men",
    sku: "MENS-PANJ-001",
    stock: 20,
    vendor: "Bengali Traditions",
    vendorId: "4",
    images: [
      "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1509&q=80",
      "https://images.unsplash.com/photo-1604695573706-53170668f6a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    ],
    variants: [
      { name: "Size", options: ["S", "M", "L", "XL"] },
      { name: "Color", options: ["White", "Blue", "Green", "Black"] }
    ],
    rating: 4.7,
    reviews: 31
  },
  {
    id: "5",
    name: "Designer Saree",
    description: "Beautiful designer saree with intricate embroidery and patterns.",
    price: 89.99,
    discount: 10,
    category: "women",
    sku: "WOMEN-SAREE-001",
    stock: 10,
    vendor: "Deshi Threads",
    vendorId: "2",
    images: [
      "https://images.unsplash.com/photo-1610189025558-a3b369b1622b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1583391733982-15776889d3fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    ],
    variants: [
      { name: "Color", options: ["Red", "Green", "Blue", "Pink", "Yellow"] }
    ],
    rating: 4.9,
    reviews: 42
  },
  {
    id: "6",
    name: "Handwoven Scarf",
    description: "Elegantly handwoven scarf made from the finest Bangladeshi fabrics.",
    price: 19.99,
    discount: 0,
    category: "accessories",
    sku: "ACC-SCARF-001",
    stock: 35,
    vendor: "Tangail Textiles",
    vendorId: "5",
    images: [
      "https://images.unsplash.com/photo-1615198436702-38c1e2011a2f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1601370552761-3c14bbc31336?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    ],
    variants: [
      { name: "Color", options: ["Red", "Blue", "Green", "Yellow", "Purple"] }
    ],
    rating: 4.3,
    reviews: 18
  },
  {
    id: "7",
    name: "Cotton Casual Shirt",
    description: "Comfortable cotton casual shirt for everyday wear.",
    price: 34.99,
    discount: 5,
    category: "men",
    sku: "MENS-SHIRT-002",
    stock: 28,
    vendor: "Dhaka Fabrics",
    vendorId: "1",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1602810319428-019690571b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    ],
    variants: [
      { name: "Size", options: ["S", "M", "L", "XL"] },
      { name: "Color", options: ["Blue", "Gray", "Green"] }
    ],
    rating: 4.4,
    reviews: 15
  },
  {
    id: "8",
    name: "Embroidered Salwar Kameez",
    description: "Traditional salwar kameez with delicate embroidery.",
    price: 69.99,
    discount: 12,
    category: "women",
    sku: "WOMEN-SALWAR-001",
    stock: 18,
    vendor: "Bengali Traditions",
    vendorId: "4",
    images: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    ],
    variants: [
      { name: "Size", options: ["S", "M", "L", "XL"] },
      { name: "Color", options: ["Turquoise", "Red", "Pink", "Purple"] }
    ],
    rating: 4.6,
    reviews: 28
  }
];

// Mock vendors data
export const mockVendors: Vendor[] = [
  {
    id: "1",
    name: "Dhaka Fabrics",
    description: "Specializing in high-quality fabrics and men's clothing. All products are made using traditional Bangladeshi techniques.",
    logo: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    coverImage: "https://images.unsplash.com/photo-1606743877196-1ce54fce37f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    products: 45,
    rating: 4.5,
    reviews: 120,
    joined: "2021-03-15"
  },
  {
    id: "2",
    name: "Deshi Threads",
    description: "Focused on modern women's fashion with a traditional Bangladeshi twist. Our designs combine contemporary styles with traditional elements.",
    logo: "https://images.unsplash.com/photo-1490129375591-2658b3e2ee5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    coverImage: "https://images.unsplash.com/photo-1612012460576-5d51b5b04b9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    products: 62,
    rating: 4.8,
    reviews: 185,
    joined: "2020-11-22"
  },
  {
    id: "3",
    name: "Dhaka Leathers",
    description: "Crafters of premium leather accessories. Each product is handmade by skilled artisans using ethically sourced materials.",
    logo: "https://images.unsplash.com/photo-1623998021446-45cd9b467f8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    coverImage: "https://images.unsplash.com/photo-1605518219067-909c789a33a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    products: 28,
    rating: 4.3,
    reviews: 92,
    joined: "2022-01-05"
  },
  {
    id: "4",
    name: "Bengali Traditions",
    description: "Preserving Bangladeshi cultural heritage through traditional clothing. Our collections emphasize authentic designs and patterns.",
    logo: "https://images.unsplash.com/photo-1603251578711-3290ca1a0187?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    coverImage: "https://images.unsplash.com/photo-1604669879964-0f85ccc0d360?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    products: 75,
    rating: 4.7,
    reviews: 210,
    joined: "2020-06-18"
  },
  {
    id: "5",
    name: "Tangail Textiles",
    description: "Specializing in traditional Bangladeshi textiles with a focus on Tangail sarees and handwoven fabrics.",
    logo: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1011&q=80",
    coverImage: "https://images.unsplash.com/photo-1615886753866-79ef2c109675?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    products: 53,
    rating: 4.6,
    reviews: 145,
    joined: "2021-08-30"
  }
];
