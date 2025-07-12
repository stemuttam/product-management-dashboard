import React, { useState, useEffect, useMemo, useRef } from 'react';
import useDebounce from '../hooks/useDebounce';
import { paginateData } from '../utils/paginate';

const DEFAULT_COLUMNS = ['ID', 'Image', 'Name', 'Category', 'Price', 'Stock', 'Status', 'Actions'];

const ProductTable = ({ products, onAddToCart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);

  const debouncedSearch = useDebounce(searchQuery, 300);
  const ITEMS_PER_PAGE = 10;

  // Filtered + Sorted Products
  const filtered = useMemo(() => {
    let result = products;

    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }

    if (sortKey) {
      result = [...result].sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [debouncedSearch, products, sortKey, sortOrder]);

  const paginated = useMemo(() => {
    return paginateData(filtered, currentPage, ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  // Column Drag & Drop
  const dragColIndex = useRef(null);

  const handleDragStart = (index) => {
    dragColIndex.current = index;
  };

  const handleDrop = (index) => {
    const newCols = [...columns];
    const dragged = newCols.splice(dragColIndex.current, 1)[0];
    newCols.splice(index, 0, dragged);
    setColumns(newCols);
  };

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
      <div className="mb-4 flex justify-between items-center flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by name or category"
          className="border px-3 py-2 rounded w-full sm:w-1/2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <p className="text-sm text-gray-500">Total: {filtered.length}</p>
      </div>

      <table className="w-full table-auto text-sm border">
        <thead>
          <tr className="bg-gray-100 text-left">
            {columns.map((col, index) => (
              <th
                key={col}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(index)}
                className="px-4 py-2 cursor-move"
                onClick={() => {
                  const sortMap = {
                    ID: 'id',
                    Name: 'name',
                    Category: 'category',
                    Price: 'price',
                    Stock: 'stock',
                    Status: 'status'
                  };
                  if (sortMap[col]) toggleSort(sortMap[col]);
                }}
              >
                {col}
                {sortKey === col.toLowerCase() && (
                  <span>{sortOrder === 'asc' ? ' 🔼' : ' 🔽'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginated.map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-50">
              {columns.map((col) => {
                switch (col) {
                  case 'ID':
                    return <td key={col} className="px-4 py-2">{product.id}</td>;
                  case 'Image':
                    return (
                      <td key={col} className="px-4 py-2">
                        <img src={product.image} alt={product.name} className="w-10 h-10 rounded" />
                      </td>
                    );
                  case 'Name':
                    return <td key={col} className="px-4 py-2">{product.name}</td>;
                  case 'Category':
                    return <td key={col} className="px-4 py-2">{product.category}</td>;
                  case 'Price':
                    return <td key={col} className="px-4 py-2">${product.price}</td>;
                  case 'Stock':
                    return <td key={col} className="px-4 py-2">{product.stock}</td>;
                  case 'Status':
                    return (
                      <td key={col} className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            product.stock === 0
                              ? 'bg-red-100 text-red-600'
                              : 'bg-green-100 text-green-600'
                          }`}
                        >
                          {product.status}
                        </span>
                      </td>
                    );
                  case 'Actions':
                    return (
                      <td key={col} className="px-4 py-2">
                        <button
                          className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                          onClick={() => onAddToCart(product)}
                        >
                          Add to Cart
                        </button>
                      </td>
                    );
                  default:
                    return null;
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center gap-2">
        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>Page {currentPage}</span>
        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => {
            const maxPage = Math.ceil(filtered.length / ITEMS_PER_PAGE);
            setCurrentPage((prev) => Math.min(prev + 1, maxPage));
          }}
          disabled={currentPage * ITEMS_PER_PAGE >= filtered.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductTable;
