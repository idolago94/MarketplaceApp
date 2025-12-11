import {
  Product,
  PaginatedResponse,
  ProductFilters,
  SortOption,
  Cart,
  Order,
  OrderItem,
  Category,
} from '../types';
import { MOCK_PRODUCTS, getProductById } from './products';

// Simulate network delay
const delay = (ms: number = 500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Simulate random errors for robustness testing (5% chance)
const shouldSimulateError = (): boolean => {
  return false; // Math.random() < 0.05;
};

// Mock cart storage (in real app, this would be backend/database)
let mockCart: Cart = {
  id: 'cart-001',
  items: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Mock orders storage
const mockOrders: Order[] = [];

// Filter and search logic
const filterProducts = (
  products: Product[],
  filters: ProductFilters,
): Product[] => {
  let filtered = [...products];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchLower)),
    );
  }

  if (filters.category) {
    filtered = filtered.filter(
      product => product.category === filters.category,
    );
  }

  return filtered;
};

// Sort logic
const sortProducts = (
  products: Product[],
  sortOption: SortOption,
): Product[] => {
  const sorted = [...products];

  switch (sortOption) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating-asc':
      return sorted.sort((a, b) => a.rating - b.rating);
    case 'rating-desc':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'newest':
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    default:
      return sorted;
  }
};

// API Mock Functions

export const fetchCategories = async (): Promise<Category[]> => {
  await delay(300 + Math.random() * 400);

  return [
    'beauty',
    'books',
    'clothing',
    'electronics',
    'food',
    'home',
    'sports',
    'toys'
  ]
}

/**
 * Fetch products with pagination, filtering, and sorting
 */
export const fetchProducts = async (
  page: number = 1,
  limit: number = 20,
  filters: ProductFilters = {},
  sort: SortOption = 'newest',
): Promise<PaginatedResponse<Product>> => {
  await delay(300 + Math.random() * 400); // 300-700ms delay

  if (shouldSimulateError()) {
    throw new Error('Failed to fetch products. Please try again.');
  }

  // Validate inputs
  if (page < 1) {
    throw new Error('Page number must be at least 1');
  }

  if (limit < 1 || limit > 100) {
    throw new Error('Limit must be between 1 and 100');
  }

  // Apply filters and sorting
  let filteredProducts = filterProducts(MOCK_PRODUCTS, filters);
  filteredProducts = sortProducts(filteredProducts, sort);

  // Calculate pagination
  const total = filteredProducts.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return {
    data: paginatedProducts,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasMore: page < totalPages,
    },
  };
};

/**
 * Fetch a single product by ID
 */
export const fetchProductById = async (id: string): Promise<Product> => {
  await delay(200 + Math.random() * 300); // 200-500ms delay

  if (shouldSimulateError()) {
    throw new Error('Failed to fetch product details. Please try again.');
  }

  const product = getProductById(id);

  if (!product) {
    throw new Error(`Product with ID ${id} not found`);
  }

  return product;
};

/**
 * Search products by query
 */
export const searchProducts = async (
  query: string,
  page: number = 1,
  limit: number = 20,
): Promise<PaginatedResponse<Product>> => {
  return fetchProducts(page, limit, { search: query });
};

/**
 * Fetch cart
 */
export const fetchCart = async (): Promise<Cart> => {
  await delay(200 + Math.random() * 200); // 200-400ms delay

  if (shouldSimulateError()) {
    throw new Error('Failed to fetch cart. Please try again.');
  }

  return { ...mockCart };
};

/**
 * Add item to cart
 */
export const addToCart = async (
  productId: string,
  quantity: number,
): Promise<Cart> => {
  await delay(300 + Math.random() * 300); // 300-600ms delay

  if (shouldSimulateError()) {
    throw new Error('Failed to add item to cart. Please try again.');
  }

  // Validate product exists
  const product = getProductById(productId);
  if (!product) {
    throw new Error(`Product with ID ${productId} not found`);
  }

  // Validate quantity
  if (quantity < 1) {
    throw new Error('Quantity must be at least 1');
  }

  // Check stock
  const existingItem = mockCart.items.find(
    item => item.productId === productId,
  );
  const currentQuantity = existingItem ? existingItem.quantity : 0;
  const newQuantity = currentQuantity + quantity;

  if (newQuantity > product.stock) {
    throw new Error(
      `Cannot add ${quantity} items. Only ${
        product.stock - currentQuantity
      } available.`,
    );
  }

  // Add or update item
  if (existingItem) {
    existingItem.quantity = newQuantity;
  } else {
    mockCart.items.push({ productId, quantity });
  }

  mockCart.updatedAt = new Date().toISOString();

  return { ...mockCart };
};

/**
 * Update cart item quantity
 */
export const updateCartItem = async (
  productId: string,
  quantity: number,
): Promise<Cart> => {
  await delay(300 + Math.random() * 300); // 300-600ms delay

  if (shouldSimulateError()) {
    throw new Error('Failed to update cart item. Please try again.');
  }

  // Validate product exists
  const product = getProductById(productId);
  if (!product) {
    throw new Error(`Product with ID ${productId} not found`);
  }

  // Validate quantity
  if (quantity < 0) {
    throw new Error('Quantity cannot be negative');
  }

  // If quantity is 0, remove item
  if (quantity === 0) {
    return removeFromCart(productId);
  }

  // Check stock
  if (quantity > product.stock) {
    throw new Error(
      `Cannot set quantity to ${quantity}. Only ${product.stock} available.`,
    );
  }

  // Find and update item
  const existingItem = mockCart.items.find(
    item => item.productId === productId,
  );

  if (!existingItem) {
    throw new Error(`Product ${productId} not in cart`);
  }

  existingItem.quantity = quantity;
  mockCart.updatedAt = new Date().toISOString();

  return { ...mockCart };
};

/**
 * Remove item from cart
 */
export const removeFromCart = async (productId: string): Promise<Cart> => {
  await delay(300 + Math.random() * 300); // 300-600ms delay

  if (shouldSimulateError()) {
    throw new Error('Failed to remove item from cart. Please try again.');
  }

  mockCart.items = mockCart.items.filter(item => item.productId !== productId);
  mockCart.updatedAt = new Date().toISOString();

  return { ...mockCart };
};

/**
 * Clear entire cart
 */
export const clearCart = async (): Promise<Cart> => {
  await delay(200 + Math.random() * 200); // 200-400ms delay

  if (shouldSimulateError()) {
    throw new Error('Failed to clear cart. Please try again.');
  }

  mockCart.items = [];
  mockCart.updatedAt = new Date().toISOString();

  return { ...mockCart };
};

/**
 * Place an order
 */
export const placeOrder = async (): Promise<Order> => {
  await delay(800 + Math.random() * 700); // 800-1500ms delay (longer for order processing)

  if (shouldSimulateError()) {
    throw new Error('Failed to place order. Please try again.');
  }

  if (mockCart.items.length === 0) {
    throw new Error('Cannot place order with empty cart');
  }

  // Validate all items and calculate total
  const orderItems: OrderItem[] = [];
  let total = 0;

  for (const cartItem of mockCart.items) {
    const product = getProductById(cartItem.productId);

    if (!product) {
      throw new Error(`Product ${cartItem.productId} not found`);
    }

    if (cartItem.quantity > product.stock) {
      throw new Error(
        `${product.name} is out of stock. Only ${product.stock} available.`,
      );
    }

    orderItems.push({
      productId: product.id,
      productName: product.name,
      quantity: cartItem.quantity,
      price: product.price,
    });

    total += product.price * cartItem.quantity;
  }

  // Create order
  const order: Order = {
    id: `order-${String(mockOrders.length + 1).padStart(6, '0')}`,
    items: orderItems,
    total,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  mockOrders.push(order);

  // Clear cart after successful order
  mockCart.items = [];
  mockCart.updatedAt = new Date().toISOString();

  return order;
};

/**
 * Fetch order by ID
 */
export const fetchOrderById = async (orderId: string): Promise<Order> => {
  await delay(300 + Math.random() * 300); // 300-600ms delay

  if (shouldSimulateError()) {
    throw new Error('Failed to fetch order. Please try again.');
  }

  const order = mockOrders.find(o => o.id === orderId);

  if (!order) {
    throw new Error(`Order with ID ${orderId} not found`);
  }

  return { ...order };
};

/**
 * Fetch all orders
 */
export const fetchOrders = async (): Promise<Order[]> => {
  await delay(300 + Math.random() * 300); // 300-600ms delay

  if (shouldSimulateError()) {
    throw new Error('Failed to fetch orders. Please try again.');
  }

  return [...mockOrders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
};

/**
 * Get cart item count
 */
export const getCartItemCount = (): number => {
  return mockCart.items.reduce((total, item) => total + item.quantity, 0);
};

/**
 * Get cart total price
 */
export const getCartTotal = (): number => {
  return mockCart.items.reduce((total, item) => {
    const product = getProductById(item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
};
