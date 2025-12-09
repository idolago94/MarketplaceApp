# Marketplace Mock API

This directory contains mock data and API functions for the Marketplace application.

## Overview

The mock API simulates a real backend with:
- **5,000 products** across 8 categories
- Realistic product data with images, ratings, pricing, and stock
- Asynchronous operations with realistic delays
- Error simulation for robust error handling
- Full cart management
- Order placement

## Files

### `types.ts`
TypeScript interfaces and types for all data models:
- `Product` - Product entity
- `Cart` - Shopping cart
- `Order` - Order entity
- `PaginatedResponse` - Paginated API response
- `ProductFilters` - Filtering options
- `SortOption` - Sorting options

### `products.ts`
Mock product data generation:
- Generates 5,000 realistic products
- 8 categories: electronics, clothing, home, sports, books, beauty, toys, food
- Each product has unique attributes, pricing, ratings, stock levels
- Helper functions for product lookup

### `api.ts`
Mock API functions that simulate backend operations:

#### Product Operations
- `fetchProducts(page, limit, filters, sort)` - Fetch paginated products with filtering and sorting
- `fetchProductById(id)` - Fetch single product details
- `searchProducts(query, page, limit)` - Search products by text query

#### Cart Operations
- `fetchCart()` - Get current cart
- `addToCart(productId, quantity)` - Add item to cart with stock validation
- `updateCartItem(productId, quantity)` - Update item quantity
- `removeFromCart(productId)` - Remove item from cart
- `clearCart()` - Clear entire cart

#### Order Operations
- `placeOrder()` - Place order from current cart
- `fetchOrderById(orderId)` - Get order details
- `fetchOrders()` - Get all orders

#### Helper Functions
- `getCartItemCount()` - Get total item count in cart
- `getCartTotal()` - Calculate cart total price

## Features

### Realistic Delays
All API calls include realistic network delays (200-1500ms) to simulate real-world conditions.

### Error Simulation
5% of requests will randomly fail to test error handling and retry logic.

### Stock Management
Cart operations validate stock availability and prevent overselling.

### Data Validation
All operations include input validation and meaningful error messages.

### Filtering & Sorting
Products support multiple filters:
- Search by name, description, brand, tags
- Filter by category, price range, rating, stock status
- Sort by price, rating, name, creation date

### Pagination
Efficient pagination with:
- Customizable page size (1-100 items)
- Total count and page calculations
- `hasMore` flag for infinite scroll

## Usage Examples

```typescript
import {
  fetchProducts,
  fetchProductById,
  addToCart,
  placeOrder,
  Product,
  PaginatedResponse,
} from './mocks';

// Fetch products with filters and pagination
const response: PaginatedResponse<Product> = await fetchProducts(
  1, // page
  20, // limit
  {
    category: 'electronics',
    minPrice: 50,
    maxPrice: 500,
    inStock: true,
  },
  'price-asc' // sort
);

// Fetch single product
const product: Product = await fetchProductById('product-00001');

// Add to cart with stock validation
try {
  const cart = await addToCart('product-00001', 2);
  console.log('Cart updated:', cart);
} catch (error) {
  console.error('Failed to add to cart:', error.message);
}

// Place order
try {
  const order = await placeOrder();
  console.log('Order placed:', order.id);
} catch (error) {
  console.error('Failed to place order:', error.message);
}
```

## Data Structure

### Product Example
```json
{
  "id": "product-00001",
  "name": "TechPro Premium Wireless Headphones",
  "description": "High-quality wireless headphones perfect for everyday use...",
  "price": 89.99,
  "originalPrice": 119.99,
  "category": "electronics",
  "image": "https://picsum.photos/seed/1-electronics/400/400",
  "images": ["..."],
  "rating": 4.5,
  "reviewCount": 234,
  "stock": 150,
  "brand": "TechPro",
  "tags": ["wireless", "bluetooth", "portable"],
  "createdAt": "2024-03-15T10:30:00.000Z",
  "updatedAt": "2024-11-20T14:45:00.000Z"
}
```

### Cart Example
```json
{
  "id": "cart-001",
  "items": [
    {
      "productId": "product-00001",
      "quantity": 2
    }
  ],
  "createdAt": "2024-12-09T10:00:00.000Z",
  "updatedAt": "2024-12-09T10:30:00.000Z"
}
```

### Order Example
```json
{
  "id": "order-000001",
  "items": [
    {
      "productId": "product-00001",
      "productName": "TechPro Premium Wireless Headphones",
      "quantity": 2,
      "price": 89.99
    }
  ],
  "total": 179.98,
  "status": "pending",
  "createdAt": "2024-12-09T10:45:00.000Z"
}
```

## Categories

1. **electronics** - Headphones, watches, speakers, accessories
2. **clothing** - Shirts, jeans, shoes, outerwear
3. **home** - Furniture, decor, kitchen items, appliances
4. **sports** - Fitness equipment, sports gear, outdoor items
5. **books** - Fiction, non-fiction, educational, reference
6. **beauty** - Skincare, makeup, haircare, fragrances
7. **toys** - Games, educational toys, outdoor play, crafts
8. **food** - Organic foods, snacks, beverages, pantry items

## Performance Considerations

The mock data includes 5,000 products to simulate a real marketplace. Filtering and pagination are optimized to handle this scale efficiently. The implementation demonstrates proper data handling for large datasets without performance issues.

## Testing

The mock API includes:
- Error simulation for testing error states
- Stock validation for testing edge cases
- Input validation for testing form handling
- Realistic delays for testing loading states

## Notes

- Product images use picsum.photos for consistent placeholder images
- All dates are in ISO 8601 format
- Prices are in USD (assume default currency)
- Stock levels are randomly generated between 0-200
- Ratings range from 3.0 to 5.0
- The cart and orders are stored in memory (reset on app restart)
