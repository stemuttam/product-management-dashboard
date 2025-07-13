// src/utils/generateMockProducts.js

export const generateMockProducts = (count = 1000) => {
  const categories = ['Electronics', 'Clothing', 'Home', 'Books', 'Sports'];
  const statuses = ['Active', 'Out of Stock', 'Limited', 'Discontinued'];

  const products = [];

  for (let i = 1; i <= count; i++) {
    const category = categories[i % categories.length];
    const status = statuses[i % statuses.length];

    products.push({
      id: i,
      name: `Product ${i}`,
      category,
      price: parseFloat((Math.random() * 1000 + 50).toFixed(2)),
      stock: Math.floor(Math.random() * 100),
      status,
      image: `https://picsum.photos/seed/product${i}/80/80`,
    });
  }

  return products;
};
