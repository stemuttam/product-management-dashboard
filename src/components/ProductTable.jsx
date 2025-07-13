import React, { useState, useMemo } from "react";
import { useDebounce } from "../utils/useDebounce";
import { paginateData } from "../utils/paginate";

// 🧩 Reusable Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="text-red-500 text-xl font-bold">&times;</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

const ProductTable = ({ products, onAddToCart, onUpdateProducts }) => {
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [search, setSearch] = useState("");
  const [modalType, setModalType] = useState(null); // 'view' | 'edit'
  const [selectedProduct, setSelectedProduct] = useState(null);

  const debouncedSearch = useDebounce(search, 300);

  const filtered = useMemo(() => {
    return products.filter((p) =>
      `${p.name} ${p.category}`.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [products, debouncedSearch]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (typeof valA === "string") {
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortAsc ? valA - valB : valB - valA;
    });
  }, [filtered, sortKey, sortAsc]);

  const paginated = paginateData(sorted, page, 10);
  const totalPages = Math.ceil(sorted.length / 10);

  const handleSort = (key) => {
    setSortKey(key);
    setSortAsc(key === sortKey ? !sortAsc : true);
  };

  const handleDelete = (id) => {
    const updated = products.filter((p) => p.id !== id);
    onUpdateProducts(updated);
  };

  const handleEditSave = () => {
    const updated = products.map((p) =>
      p.id === selectedProduct.id ? selectedProduct : p
    );
    onUpdateProducts(updated);
    setModalType(null);
    setSelectedProduct(null);
  };

  return (
    <div className="mt-6">
      <input
        type="text"
        placeholder="Search products..."
        className="mb-4 px-3 py-2 border rounded w-full md:w-1/2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border rounded">
          <thead>
            <tr className="bg-gray-100">
              {["id", "image", "name", "category", "price", "stock", "status"].map((key) => (
                <th
                  key={key}
                  className="p-2 text-left cursor-pointer"
                  onClick={() => handleSort(key)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </th>
              ))}
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="p-2">{p.id}</td>
                <td className="p-2">
                  <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded" />
                </td>
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.category}</td>
                <td className="p-2">₹{p.price.toFixed(2)}</td>
                <td className="p-2">{p.stock}</td>
                <td className="p-2">{p.status}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => onAddToCart(p)}
                    className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                  >
                    Add to Cart
                  </button>
                  <button
                    className="text-xs text-green-600 hover:text-green-800 hover:underline"
                    onClick={() => {
                      setSelectedProduct(p);
                      setModalType("view");
                    }}
                  >
                    View
                  </button>
                  <button
                    className="text-xs text-yellow-600 hover:text-yellow-800 hover:underline"
                    onClick={() => {
                      setSelectedProduct({ ...p });
                      setModalType("edit");
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-xs text-red-500 hover:text-red-700 hover:underline"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-4 items-center">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <p className="text-sm">Page {page}</p>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* View Modal */}
      <Modal
        isOpen={modalType === "view"}
        title="Product Details"
        onClose={() => setModalType(null)}
      >
        {selectedProduct && (
          <div className="text-sm space-y-2">
            <img src={selectedProduct.image} alt="" className="w-full rounded mb-2" />
            <p><strong>Name:</strong> {selectedProduct.name}</p>
            <p><strong>Category:</strong> {selectedProduct.category}</p>
            <p><strong>Price:</strong> ₹{selectedProduct.price.toFixed(2)}</p>
            <p><strong>Stock:</strong> {selectedProduct.stock}</p>
            <p><strong>Status:</strong> {selectedProduct.status}</p>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={modalType === "edit"}
        title="Edit Product"
        onClose={() => setModalType(null)}
      >
        {selectedProduct && (
          <div className="space-y-3">
            <input
              className="border px-2 py-1 w-full"
              value={selectedProduct.name}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, name: e.target.value })
              }
            />
            <input
              className="border px-2 py-1 w-full"
              value={selectedProduct.category}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, category: e.target.value })
              }
            />
            <input
              className="border px-2 py-1 w-full"
              type="number"
              value={selectedProduct.price}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, price: +e.target.value })
              }
            />
            <input
              className="border px-2 py-1 w-full"
              type="number"
              value={selectedProduct.stock}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, stock: +e.target.value })
              }
            />
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={handleEditSave}
            >
              Save Changes
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProductTable;
