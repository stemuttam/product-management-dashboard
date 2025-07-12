export const generateMockProducts = (count = 1000) => {
  const categories = ['Clothing', 'Books', 'Accessories', 'Home', 'Electronics', 'Toys'];
  const products = [];

  for (let i = 1; i <= count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const stock = Math.floor(Math.random() * 100);
    const price = (Math.random() * 500 + 5).toFixed(2);
    
    products.push({
      id: i,
      name: `Product ${i}`,
      category,
      stock,
      price,
      status: stock > 0 ? 'Active' : 'Out of Stock',
      image: `https://picsum.photos/seed/${i}/80/80`, // ✅ realistic placeholder
    });
  }

  return products;
};
