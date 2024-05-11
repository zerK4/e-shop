interface Product {
  id: string;
  title: string;
  category: string;
  vendor: string;
  description: string;
  price: number;
  sale_price: null;
  currency: string;
  available: boolean;
  images: string[];
  sizes: string[];
  material: string;
  care: string;
  additional_info: Additional_info;
  rating: number;
  reviews: any[];
}
interface Additional_info {
  fit: string;
  features: any[];
}
