import { Product, Category } from '../types';

const categories: Category[] = [
  'electronics',
  'clothing',
  'home',
  'sports',
  'books',
  'beauty',
  'toys',
  'food',
];

const brands = {
  electronics: ['TechPro', 'SmartGear', 'DigitalWave', 'ElectroMax', 'InnoTech'],
  clothing: ['FashionHub', 'UrbanWear', 'StyleCo', 'TrendyFit', 'ClassicLine'],
  home: ['HomeComfort', 'CozyLiving', 'ModernSpace', 'ElegantHome', 'PracticalLife'],
  sports: ['ActiveGear', 'SportsPro', 'FitLife', 'AthleticEdge', 'PowerPlay'],
  books: ['BookWorld', 'ReadMore', 'LiteraryPress', 'KnowledgeHub', 'StoryTeller'],
  beauty: ['GlowBeauty', 'PureEssence', 'RadiantSkin', 'BeautyLux', 'NaturalGlow'],
  toys: ['PlayTime', 'FunKids', 'ToyMaster', 'HappyPlay', 'CreativeKids'],
  food: ['FreshChoice', 'TastyBites', 'GourmetDelights', 'HealthyEats', 'PureFoods'],
};

const productNames = {
  electronics: [
    'Wireless Headphones',
    'Smart Watch',
    'Bluetooth Speaker',
    'USB-C Cable',
    'Laptop Stand',
    'Wireless Mouse',
    'Keyboard',
    'Webcam',
    'Phone Case',
    'Screen Protector',
    'Power Bank',
    'Charging Dock',
    'HDMI Cable',
    'External SSD',
    'USB Hub',
    'Gaming Controller',
    'VR Headset',
    'Tablet',
    'E-Reader',
    'Smart Home Hub',
  ],
  clothing: [
    'Cotton T-Shirt',
    'Denim Jeans',
    'Hoodie',
    'Running Shoes',
    'Sneakers',
    'Jacket',
    'Sweater',
    'Dress',
    'Shorts',
    'Polo Shirt',
    'Sweatpants',
    'Blazer',
    'Skirt',
    'Leggings',
    'Tank Top',
    'Cardigan',
    'Coat',
    'Boots',
    'Sandals',
    'Hat',
  ],
  home: [
    'Throw Pillow',
    'Bedding Set',
    'Table Lamp',
    'Wall Clock',
    'Picture Frame',
    'Curtains',
    'Area Rug',
    'Storage Basket',
    'Coffee Mug Set',
    'Dinner Plates',
    'Kitchen Utensils',
    'Cookware Set',
    'Vacuum Cleaner',
    'Air Purifier',
    'Trash Can',
    'Laundry Hamper',
    'Desk Organizer',
    'Mirror',
    'Plant Pot',
    'Candle Set',
  ],
  sports: [
    'Yoga Mat',
    'Dumbbells',
    'Resistance Bands',
    'Jump Rope',
    'Water Bottle',
    'Gym Bag',
    'Tennis Racket',
    'Basketball',
    'Soccer Ball',
    'Running Belt',
    'Fitness Tracker',
    'Exercise Ball',
    'Foam Roller',
    'Weightlifting Gloves',
    'Yoga Blocks',
    'Sports Headband',
    'Compression Socks',
    'Bicycle',
    'Skateboard',
    'Swimming Goggles',
  ],
  books: [
    'Fiction Novel',
    'Self-Help Book',
    'Cookbook',
    'Biography',
    'Science Fiction',
    'Mystery Thriller',
    'Fantasy Series',
    'Business Book',
    'Travel Guide',
    'History Book',
    'Poetry Collection',
    'Art Book',
    'Philosophy Text',
    'Programming Guide',
    'Language Learning',
    'Children\'s Book',
    'Graphic Novel',
    'Dictionary',
    'Atlas',
    'Journal',
  ],
  beauty: [
    'Face Moisturizer',
    'Sunscreen',
    'Lip Balm',
    'Face Mask',
    'Serum',
    'Cleanser',
    'Toner',
    'Body Lotion',
    'Shampoo',
    'Conditioner',
    'Hair Mask',
    'Nail Polish',
    'Makeup Remover',
    'Foundation',
    'Mascara',
    'Lipstick',
    'Eye Shadow Palette',
    'Perfume',
    'Body Wash',
    'Hand Cream',
  ],
  toys: [
    'Building Blocks',
    'Puzzle Set',
    'Action Figure',
    'Doll',
    'Board Game',
    'Card Game',
    'Remote Control Car',
    'Stuffed Animal',
    'Art Set',
    'Science Kit',
    'Musical Instrument',
    'Play Kitchen',
    'Construction Set',
    'Educational Toy',
    'Ball Pit Balls',
    'Ride-On Toy',
    'Outdoor Play Set',
    'Coloring Books',
    'Model Kit',
    'Magic Set',
  ],
  food: [
    'Organic Pasta',
    'Extra Virgin Olive Oil',
    'Whole Bean Coffee',
    'Green Tea',
    'Honey',
    'Granola',
    'Protein Bar',
    'Dried Fruits',
    'Nuts Mix',
    'Dark Chocolate',
    'Organic Jam',
    'Peanut Butter',
    'Spice Set',
    'Seasoning Mix',
    'Rice',
    'Quinoa',
    'Canned Beans',
    'Pasta Sauce',
    'Breakfast Cereal',
    'Energy Drink',
  ],
};

const descriptors = [
  'Premium',
  'Professional',
  'Deluxe',
  'Ultra',
  'Advanced',
  'Classic',
  'Modern',
  'Eco-Friendly',
  'Compact',
  'Portable',
];

const tags = {
  electronics: ['wireless', 'bluetooth', 'USB-C', 'fast-charging', 'portable', 'smart'],
  clothing: ['cotton', 'comfortable', 'breathable', 'stretchy', 'washable', 'stylish'],
  home: ['durable', 'modern', 'eco-friendly', 'space-saving', 'easy-clean', 'decorative'],
  sports: ['lightweight', 'durable', 'adjustable', 'non-slip', 'water-resistant', 'ergonomic'],
  books: ['bestseller', 'award-winning', 'illustrated', 'hardcover', 'paperback', 'educational'],
  beauty: ['organic', 'hypoallergenic', 'fragrance-free', 'vegan', 'cruelty-free', 'natural'],
  toys: ['safe', 'educational', 'interactive', 'age-appropriate', 'creative', 'durable'],
  food: ['organic', 'gluten-free', 'non-GMO', 'vegan', 'sugar-free', 'all-natural'],
};

// Placeholder images from various sources
const getImageUrl = (seed: number, category: string): string => {
  const width = 400;
  const height = 400;
  // Using picsum for consistent placeholder images
  return `https://picsum.photos/seed/${seed}-${category}/${width}/${height}`;
};

const generateDescription = (name: string, category: Category): string => {
  const descriptions = [
    `High-quality ${name.toLowerCase()} perfect for everyday use.`,
    `Experience excellence with our ${name.toLowerCase()}.`,
    `Premium ${name.toLowerCase()} designed with care and attention to detail.`,
    `Discover the perfect ${name.toLowerCase()} for your needs.`,
    `Top-rated ${name.toLowerCase()} loved by customers worldwide.`,
  ];

  const features = {
    electronics: ['Fast performance', 'Long battery life', 'Easy to use', 'Wireless connectivity'],
    clothing: ['Comfortable fit', 'Breathable fabric', 'Machine washable', 'Versatile style'],
    home: ['Durable construction', 'Easy to clean', 'Space-efficient', 'Modern design'],
    sports: ['Lightweight', 'Non-slip grip', 'Adjustable fit', 'High performance'],
    books: ['Engaging content', 'Well-researched', 'Easy to read', 'Informative'],
    beauty: ['Natural ingredients', 'Dermatologist tested', 'Long-lasting', 'Pleasant scent'],
    toys: ['Safe materials', 'Age-appropriate', 'Educational value', 'Fun design'],
    food: ['Fresh ingredients', 'Rich flavor', 'Healthy choice', 'Easy to prepare'],
  };

  const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)];
  const categoryFeatures = features[category];
  const selectedFeatures = categoryFeatures
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .join(', ');

  return `${randomDesc} Features include: ${selectedFeatures}.`;
};

const generateProducts = (count: number): Product[] => {
  const products: Product[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const category = categories[i % categories.length];
    const categoryBrands = brands[category];
    const categoryNames = productNames[category];
    const categoryTags = tags[category];

    const brand = categoryBrands[Math.floor(Math.random() * categoryBrands.length)];
    const baseName = categoryNames[i % categoryNames.length];
    const descriptor = descriptors[Math.floor(Math.random() * descriptors.length)];
    const name = `${brand} ${descriptor} ${baseName}`;

    const basePrice = Math.floor(Math.random() * 500) + 10;
    const hasDiscount = Math.random() > 0.7;
    const price = hasDiscount ? Math.floor(basePrice * 0.8) : basePrice;
    const originalPrice = hasDiscount ? basePrice : undefined;

    const rating = parseFloat((Math.random() * 2 + 3).toFixed(1)); // 3.0 - 5.0
    const reviewCount = Math.floor(Math.random() * 1000) + 10;
    const stock = Math.floor(Math.random() * 200);

    const productTags = categoryTags
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 3) + 2);

    // Create dates spread over last 2 years
    const daysAgo = Math.floor(Math.random() * 730);
    const createdAt = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    const updatedAt = new Date(
      createdAt.getTime() + Math.random() * (now.getTime() - createdAt.getTime())
    );

    const product: Product = {
      id: `product-${String(i + 1).padStart(5, '0')}`,
      name,
      description: generateDescription(baseName, category),
      price,
      originalPrice,
      category,
      image: getImageUrl(i, category),
      images: [
        getImageUrl(i, category),
        getImageUrl(i + 10000, category),
        getImageUrl(i + 20000, category),
        getImageUrl(i + 30000, category),
      ],
      rating,
      reviewCount,
      stock,
      brand,
      tags: productTags,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    };

    products.push(product);
  }

  return products;
};

// Generate large dataset
export const MOCK_PRODUCTS = generateProducts(5000);

// Helper function to get a single product by ID
export const getProductById = (id: string): Product | undefined => {
  return MOCK_PRODUCTS.find((product) => product.id === id);
};

// Helper function to get products by category
export const getProductsByCategory = (category: Category): Product[] => {
  return MOCK_PRODUCTS.filter((product) => product.category === category);
};
