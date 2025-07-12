# Product Management Dashboard

A responsive, high-performance Product Dashboard built with **React (Hooks)**, **Tailwind CSS**, and **Vanilla JavaScript** — with **zero external libraries**.

---

## Features Overview

### Cart Functionality
- Add to Cart button per product
- Slide-out Cart Sidebar
- Quantity controls, auto total price
- Remove/update items
- In-memory cart (no localStorage), persists during session

### Product Table
- 1000+ mock products
- Columns: ID, Image, Name, Category, Price, Stock, Status, Actions
- Features:
  - **Pagination** (10 items per page)
  - **Lazy Loading**
  - **Debounced Search** + Category Filter
  - **Sortable Columns**
  - **Row Actions** (Edit/Delete/View)
  - **Drag & Drop** column headers (vanilla JS)

### Admin Dashboard
- Header: Logo, Search, Cart Badge
- Dashboard Stats:
  - Total Products
  - Total Revenue (from cart)
  - Low Stock Items
  - Categories Count
- Mobile-first responsive layout

---

## Setup Instructions

```bash
# Clone the project
git clone https://github.com/your-username/product-management-dashboard.git
cd product-management-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev

Project Structure
src/
├── assets/             # Static assets (optional)
├── components/         # All reusable components
│   ├── Header.jsx
│   ├── CartSidebar.jsx
│   ├── StatsCards.jsx
│   └── ProductTable.jsx
├── hooks/
│   └── useDebounce.js
├── utils/
│   ├── mockData.js
│   └── paginate.js
├── App.jsx
├── index.jsx
└── index.css

