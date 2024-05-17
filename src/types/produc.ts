interface Product {
  id: string;
  title: string;
  slug: string;
  category: string;
  vendor: string;
  current_stock: number;
  description: string;
  price: number;
  sale_price: null;
  currency: string;
  available: boolean;
  images: string[];
  attributes: AttributesItem[];
  material: string;
  care: string;
  additional_info: Additional_info;
  rating: number;
  reviews: ReviewsItem[];
}
interface AttributesItem {
  name: string;
  options: string[];
}
interface Additional_info {
  fit: string;
  features: string[];
}
interface ReviewsItem {
  id: string;
  user_name: string;
  rating: number;
  review: string;
  date: string;
}
