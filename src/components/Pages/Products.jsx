import React, { useState, useEffect } from 'react';
import Layout from '../../Layout/Layout';
import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // For accessibility

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    itemName: "",
    modelNo: "",
    price: "",
    category: "",
    weight: "",
    image: "",
  });
  const [editProduct, setEditProduct] = useState({
    itemName: "",
    modelNo: "",
    price: "",
    category: "",
    weight: "",
    image: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://flex-o-pack-api.onrender.com/api/v1/product/get-products"
      );
      const data = await response.json();
      if (data.status === "success") {
        setProducts(data.data);
      } else {
        console.error("Failed to fetch products:", data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(
        "https://flex-o-pack-api.onrender.com/api/v1/product/create-product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(newProduct),
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        setProducts([...products, data.data]);
        setNewProduct({
          itemName: "",
          modelNo: "",
          price: "",
          category: "",
          weight: "",
          image: "",
        });
        setIsAddModalOpen(false);
      } else {
        console.error("Failed to add product:", data.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log('Editing product with ID:', editProductId); // Debugging line
    console.log('Edit Product Data:', editProduct); // Debugging line
    try {
      const response = await fetch(
        `https://flex-o-pack-api.onrender.com/api/v1/product/update-product/${editProductId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(editProduct),
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        setProducts(
          products.map((product) =>
            product._id === editProductId ? data.data : product
          )
        );
        setIsEditModalOpen(false);
      } else {
        console.error("Failed to edit product:", data.message);
      }
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  
  const handleDeleteProduct = async (productId) => {
    const token = localStorage.getItem('token');
    console.log('Attempting to delete product with ID:', productId);
    console.log('Retrieved token from localStorage:', token);
  
    if (!token) {
      console.error('No token found');
      return;
    }
  
    try {
      const url = `https://flex-o-pack-api.onrender.com/api/v1/product/delete-product/${productId}`;
      console.log('Making DELETE request to URL:', url);
  
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      console.log('Response status:', response.status);
      console.log('Response headers:', Array.from(response.headers.entries()));
  
      if (response.ok) {
        const data = await response.json();
        console.log('Received response data:', data);
  
        if (data.status === "success") {
          // Refresh product list
          await fetchProducts();
          console.log("Product deleted successfully");
        } else {
          console.error("Failed to delete product:", data.message);
        }
      } else {
        console.error("Failed to delete product:", response.status);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  

  const showEditFormWithProduct = (product) => {
    setEditProduct({
      itemName: product.itemName,
      modelNo: product.modelNo,
      price: product.price,
      category: product.category,
      weight: product.specifications.weight,
      image: product.image,
    });
    setEditProductId(product._id);
    setIsEditModalOpen(true);
  };

  return (
    <Layout>
      <div className="main-content-wrapper w-full m-auto">
        <div className="flex flex-col mb-8 px-6 py-8 gap-6 bg-[#fff] shadow-customShadow rounded-2xl">
          <div className="flex flex-col justify-center">
            <h5 className="text-2xl text-[#111] font-bold my-4">Products</h5>
            <div className="relative">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-[#0d6efd] text-white py-2 px-4 rounded-md hover:bg-[#0056b3]"
              >
                Add Product
              </button>

              {/* Add Product Modal */}
              <Modal
                isOpen={isAddModalOpen}
                onRequestClose={() => setIsAddModalOpen(false)}
                contentLabel="Add Product"
                className="modal"
                overlayClassName="overlay"
              >
                <h2 className="text-xl font-bold mb-4">Add Product</h2>
                <form onSubmit={handleAddProduct} className="space-y-4">
                  <input
                    type="text"
                    name="itemName"
                    value={newProduct.itemName || ""}
                    onChange={handleInputChange}
                    placeholder="Item Name"
                    className="p-2 border border-gray-300 rounded-md w-full"
                    required
                  />
                  <input
                    type="text"
                    name="modelNo"
                    value={newProduct.modelNo || ""}
                    onChange={handleInputChange}
                    placeholder="Model Number"
                    className="p-2 border border-gray-300 rounded-md w-full"
                    required
                  />
                  <input
                    type="number"
                    name="price"
                    value={newProduct.price || ""}
                    onChange={handleInputChange}
                    placeholder="Price"
                    className="p-2 border border-gray-300 rounded-md w-full"
                    required
                  />
                  <input
                    type="text"
                    name="category"
                    value={newProduct.category || ""}
                    onChange={handleInputChange}
                    placeholder="Category"
                    className="p-2 border border-gray-300 rounded-md w-full"
                    required
                  />
                  <input
                    type="text"
                    name="weight"
                    value={newProduct.weight || ""}
                    onChange={handleInputChange}
                    placeholder="Weight"
                    className="p-2 border border-gray-300 rounded-md w-full"
                    required
                  />
                  <input
                    type="text"
                    name="image"
                    value={newProduct.image || ""}
                    onChange={handleInputChange}
                    placeholder="Image URL"
                    className="p-2 border border-gray-300 rounded-md w-full"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-[#0d6efd] text-white py-2 px-4 rounded-md hover:bg-[#0056b3]"
                  >
                    Add Product
                  </button>
                  <button
                    onClick={() => setIsAddModalOpen(false)}
                    className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-600 ml-2"
                  >
                    Cancel
                  </button>
                </form>
              </Modal>

              {/* Products Table */}
              <div className="overflow-x-auto mt-8">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border-b p-4 text-left">Image</th>
                      <th className="border-b p-4 text-left">Item Name</th>
                      <th className="border-b p-4 text-left">Model Number</th>
                      <th className="border-b p-4 text-left">Price</th>
                      <th className="border-b p-4 text-left">Category</th>
                      <th className="border-b p-4 text-left">Weight</th>
                      <th className="border-b p-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td className="border-b p-4">
                          <img src={product.image} alt={product.itemName} className="w-16 h-16 object-cover" />
                        </td>
                        <td className="border-b p-4">{product.itemName}</td>
                        <td className="border-b p-4">{product.modelNo}</td>
                        <td className="border-b p-4">${product.price}</td>
                        <td className="border-b p-4">{product.category}</td>
                        <td className="border-b p-4">{product.specifications.weight}</td>
                        <td className="border-b p-4">
                          <button
                            onClick={() => showEditFormWithProduct(product)}
                            className="text-blue-500 hover:underline mr-4"
                          >
                            <MdOutlineEdit size={20} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="text-red-500 hover:underline"
                          >
                            <MdOutlineDelete size={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Product Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        contentLabel="Edit Product"
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        <form onSubmit={handleEditProduct} className="space-y-4">
          <input
            type="text"
            name="itemName"
            value={editProduct.itemName || ""}
            onChange={handleEditInputChange}
            placeholder="Item Name"
            className="p-2 border border-gray-300 rounded-md w-full"
            required
          />
          <input
            type="text"
            name="modelNo"
            value={editProduct.modelNo || ""}
            onChange={handleEditInputChange}
            placeholder="Model Number"
            className="p-2 border border-gray-300 rounded-md w-full"
            required
          />
          <input
            type="number"
            name="price"
            value={editProduct.price || ""}
            onChange={handleEditInputChange}
            placeholder="Price"
            className="p-2 border border-gray-300 rounded-md w-full"
            required
          />
          <input
            type="text"
            name="category"
            value={editProduct.category || ""}
            onChange={handleEditInputChange}
            placeholder="Category"
            className="p-2 border border-gray-300 rounded-md w-full"
            required
          />
          <input
            type="text"
            name="weight"
            value={editProduct.weight || ""}
            onChange={handleEditInputChange}
            placeholder="Weight"
            className="p-2 border border-gray-300 rounded-md w-full"
            required
          />
          <input
            type="text"
            name="image"
            value={editProduct.image || ""}
            onChange={handleEditInputChange}
            placeholder="Image URL"
            className="p-2 border border-gray-300 rounded-md w-full"
            required
          />
          <button
            type="submit"
            className="bg-[#0d6efd] text-white py-2 px-4 rounded-md hover:bg-[#0056b3]"
          >
            Save Changes
          </button>
          <button
            onClick={() => setIsEditModalOpen(false)}
            className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-600 ml-2"
          >
            Cancel
          </button>
        </form>
      </Modal>
    </Layout>
  );
};

export default Products;
