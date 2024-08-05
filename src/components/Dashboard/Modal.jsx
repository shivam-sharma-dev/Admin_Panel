import React from "react";

const Modal = ({ isOpen, onClose, item, type }) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
          aria-label="Close"
        >
          &times;
        </button>
        {type === "product" ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">{item.itemName}</h2>
            <img className="w-full h-auto mb-4" src={item.image} alt={item.itemName} />
            <p><strong>Model No:</strong> {item.modelNo}</p>
            <p><strong>Price:</strong> {item.price}</p>
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Specification:</strong> {item.specifications.fillingSystem}</p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
            <img className="w-full h-auto mb-4" src={item.cover} alt={item.title} />
            <p><strong>Author:</strong> {item.author.firstName} {item.author.lastName}</p>
            <p><strong>Created At:</strong> {new Date(item.createdAt).toLocaleDateString()}</p>
            <p><strong>Tags:</strong> {item.tags.join(', ')}</p>
            <p><strong>Content:</strong> {item.content}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
