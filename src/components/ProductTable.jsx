// src/components/ProductTable.jsx
import React, { useState, useMemo } from 'react';
import { paginateData } from '../utils/paginate';
import { useDebounce } from '../utils/useDebounce';

const ProductTable = ({ products, onAddToCart }) => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [columns, setColumns] = useState([
    { key: 'id', label: 'ID' },
    { key: 'image', label: 'Image' },
    { key: 'name', label: 'Name' },
    { key: 'category', label: 'Category' },
    { key: 'price', label: 'Price' },
    { key: 'stock', label: 'Stock' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' }
  ]);
  const [data, setData] = useState(products);

  const [modalData, setModalData] = useState(null);
  const [modalType, setModalType] = useState(null); // 'edit' or 'view'

  const debouncedSearch = useDebounce(search, 300);

  const filtered = useMemo(() => {
    return data.filter(
      (p) =>
        p.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.category.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch, data]);

  const sortedData = useMemo(() => {
    const sorted = [...filtered];
    sorted.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (typeof aVal === 'string') {
        return sortConfig.direction === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
    });
    return sorted;
  }, [filtered, sortConfig]);

  const pageData = paginateData(sortedData, currentPage, 10);

  const toggleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleDrop = (e, targetKey) => {
    const draggedKey = e.dataTransfer.getData('col');
    const from = columns.findIndex((col) => col.key === draggedKey);
    const to = columns.findIndex((col) => col.key === targetKey);
    const reordered = [...columns];
    const [moved] = reordered.splice(from, 1);
    reordered.splice(to, 0, moved);
    setColumns(reordered);
  };

  const handleDelete = (id) => {
    const updated = data.filter((item) => item.id !== id);
    setData(updated);
  };

  const renderCell = (key, product) => {
    switch (key) {
      case 'image':
        return <img src={product.image} alt="" className="w-10 h-10 rounded" />;
      case 'price':
        return `₹${product.price.toFixed(2)}`;
      case 'actions':
        return (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setModalData(product);
                setModalType('view');
              }}
              className="text-blue-600 hover:underline text-sm"
            >
              View
            </button>
            <button
              onClick={() => {
                setModalData(product);
                setModalType('edit');
              }}
              className="text-green-600 hover:underline text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(product.id)}
              className="text-red-600 hover:underline text-sm"
            >
              Delete
            </button>
            <button
              onClick={() => onAddToCart(product)}
              className="text-gray-700 border px-2 rounded hover:bg-gray-100 text-sm"
            >
              Add to Cart
            </button>
          </div>
        );
      default:
        return product[key];
    }
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-full max-w-sm"
        />
      </div>

      <div className="overflow-x-auto border rounded shadow-sm">
        <table className="min-w-full bg-white text-sm">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('col', col.key)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, col.key)}
                  onClick={() => toggleSort(col.key)}
                  className="cursor-move px-4 py-2 border-b font-semibold bg-gray-100 hover:bg-gray-200"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-2 border-t">
                    {renderCell(col.key, product)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-2">Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage((p) => (p * 10 < sortedData.length ? p + 1 : p))}
          disabled={currentPage * 10 >= sortedData.length}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {modalType === 'view' ? 'Product Details' : 'Edit Product'}
            </h2>
            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {modalData.name}</p>
              <p><strong>Category:</strong> {modalData.category}</p>
              <p><strong>Price:</strong> ₹{modalData.price}</p>
              <p><strong>Stock:</strong> {modalData.stock}</p>
              <p><strong>Status:</strong> {modalData.status}</p>
            </div>
            <div className="text-right mt-4">
              <button
                onClick={() => {
                  setModalData(null);
                  setModalType(null);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductTable;
