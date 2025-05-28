// components/ProductModal.tsx
import { Product } from "@/types/Products";
import React from "react";

type ProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
};

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product }) => {
    // console.log(product)
  if (!isOpen) return null;

  return (
    <div onClick={onClose} className="fixed inset-0  z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white shadow-amber-500 rounded-2xl shadow-lg w-full max-w-md mx-4 md:mx-0 p-2 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          &times;
        </button>
        <div className="h-[250px] max-h-[300px] w-full ">
          <img
            src={product.imageUrl}
            alt={product.name}
            className=" h-full w-full object-contain rounded-xl mb-2"
          />
        </div>
        <h2 className=" font-semibold text-purple-700 mb-2">{product.name}</h2>
        <div className="mb-4  max-h-40 overflow-auto">
        <p className="text-gray-600 overflow-y-auto overflow-scroll h-full text-sm">{product.description}</p>
        </div>
        <p className="text-xl font-bold text-orange-600">₹ {product.price.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ProductModal;
