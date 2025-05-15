// components/ProductModal.tsx
import React from "react";

type ProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  product: any;
};

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product }) => {
    console.log(product)
  if (!isOpen) return null;

  return (
    <div onClick={onClose} className="fixed inset-0  z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white shadow-amber-500 rounded-2xl shadow-lg w-full max-w-md mx-4 md:mx-0 p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          &times;
        </button>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-64 object-cover rounded-xl mb-4"
        />
        <h2 className="text-2xl font-semibold text-purple-700 mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-xl font-bold text-orange-600">₹ {product.price.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ProductModal;
