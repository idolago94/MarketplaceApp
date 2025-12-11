export type QueryArgs = {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  params?: { [key: string]: unknown };
};

export type ApiError = {
  status: number;
  message: string;
};

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: Category;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  brand: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export type Category =
  | 'electronics'
  | 'clothing'
  | 'home'
  | 'sports'
  | 'books'
  | 'beauty'
  | 'toys'
  | 'food';

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface PaginatedQuery {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

export interface ProductFilters {
  search?: string;
  category?: Category;
}

export type SortOption =
  | 'price-asc'
  | 'price-desc'
  | 'rating-asc'
  | 'rating-desc'
  | 'name-asc'
  | 'name-desc'
  | 'newest';
