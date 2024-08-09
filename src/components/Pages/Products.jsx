import React, { useState, useEffect } from 'react';
import Layout from '../../Layout/Layout';
import Modal from './ProductModal';  // Import your modal component

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [form, setForm] = useState({
    itemName: '',
    subCategory: '',
    modelNo: '',
    coverImage: '',
    image: '',
    images: [],
    price: '',
    specifications: {
      products: [],
      noOfTracks: '',
      weighHeadNos: [],
      feedingStyle: '',
      fillingSystem: [],
      fillingAccuracy: '',
      sealType: [],
      fillingRange: '',
      packingMaterial: [],
      laminateSpecs: [],
      lengthOfPouch: '',
      pouchDimensions: [],
      powerConsumption: [],
      compressedAirRequired: '',
      touchScreen: '',
      productionOutput: '',
      weight: '',
      materialOfChasis: '',
      hopper: [],
      conveyor: '',
      thicknessOfBucket: '',
      machineSize: [],
      productId: ''
    },
  });

  // Fetch products data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_PRODUCTS_URL);
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

    fetchProducts();
  }, []);

  // Create Product
  const createProduct = async (newProduct) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await fetch(import.meta.env.VITE_API_CREATE_PRODUCT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });

      const data = await response.json();
      if (data.status === 'success') {
        setProducts((prevProducts) => [...prevProducts, data.data]);

        setIsModalOpen(false)

        setForm({
          itemName: '',
          subCategory: '',
          modelNo: '',
          coverImage: '',
          image: '',
          images: [],
          price: '',
          specifications: {
            products: [],
            noOfTracks: '',
            weighHeadNos: [],
            feedingStyle: '',
            fillingSystem: [],
            fillingAccuracy: '',
            sealType: [],
            fillingRange: '',
            packingMaterial: [],
            laminateSpecs: [],
            lengthOfPouch: '',
            pouchDimensions: [],
            powerConsumption: [],
            compressedAirRequired: '',
            touchScreen: '',
            productionOutput: '',
            weight: '',
            materialOfChasis: '',
            hopper: [],
            conveyor: '',
            thicknessOfBucket: '',
            machineSize: [],
            productId: '',
          },
        });

      } else {
        console.error("Failed to create product:", data.message);
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  // Update Product
  const updateProduct = async (updatedProduct) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    const productId = updatedProduct._id; // Use updatedProduct._id instead of currentProduct._id
    if (!productId) {
      console.error('Product ID is missing');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_UPDATE_PRODUCT_URL}/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProduct),
      });
      const data = await response.json();
      if (data.status === 'success') {
        setProducts((prevProducts) =>
          prevProducts.map((product) => (product._id === data.data._id ? data.data : product))
        );
        setIsEditing(false);
        setCurrentProduct(null);
        setIsModalOpen(false);
      } else {
        console.error("Failed to update product:", data.message);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Delete Product
  const deleteProduct = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_DELETE_PRODUCT_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.status === 'success') {
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
      } else {
        console.error("Failed to delete product:", data.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Handle specifications changes
  const handleSpecsChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      specifications: {
        ...prevForm.specifications,
        [name]: value,
      },
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateProduct({ ...form, _id: currentProduct._id });
    } else {
      createProduct(form);
    }
  };

  const ProductForm = () => (
    <form onSubmit={handleFormSubmit} className="bg-[#fff] p-6 shadow-customShadow rounded-2xl">
      <h3 className="text-xl font-bold mb-4">{isEditing ? "Edit Product" : "Create Product"}</h3>
      <input
        type="text"
        name="itemName"
        placeholder="Item Name"
        value={form.itemName}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-md w-full"
        required
      />
      <input
        type="text"
        name="subCategory"
        placeholder="Sub Category"
        value={form.subCategory}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-md w-full"
      />
      <input
        type="text"
        name="modelNo"
        placeholder="Model No"
        value={form.modelNo}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-md w-full"
        required
      />
      <input
        type="text"
        name="coverImage"
        placeholder="Cover Image URL"
        value={form.coverImage}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-md w-full"
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={form.image}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-md w-full"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-md w-full"
        required
      />
      <textarea
        name="specifications"
        placeholder="Specifications"
        value={JSON.stringify(form.specifications, null, 2)}
        onChange={handleSpecsChange}
        className="p-2 border border-gray-300 rounded-md w-full"
      />
      <button type="submit" className="bg-[#0d6efd] text-white py-2 px-4 rounded-md hover:bg-[#0056b3]">
        {isEditing ? "Update Product" : "Create Product"}
      </button>
      <button
        type="button"
        onClick={() => {
          setIsEditing(false);
          setIsModalOpen(false);
        }}
        className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-600 ml-2"
      >
        Cancel
      </button>
    </form>
  );

  return (
    <Layout>
      <div className="main-content-wrapper w-full m-auto">
        <div className="flex flex-col mb-8 px-6 py-8 gap-6 bg-[#fff] shadow-customShadow rounded-2xl">
          <div className="flex items-center justify-between">
            <h5 className="text-2xl text-[#111] font-bold">Products</h5>
            <button
              onClick={() => {
                setIsEditing(false);
                setIsModalOpen(true);
              }}
              type="button"
              className="bg-[#0d6efd] text-white py-2 px-4 rounded-md hover:bg-[#0056b3]"
            >
              Create Product
            </button>
          </div>

          {/* Product List */}
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-b p-4 text-left">Cover</th>
                  <th className="border-b p-4 text-left">Item Name</th>
                  <th className="border-b p-4 text-left">Model No</th>
                  <th className="border-b p-4 text-left">Price</th>
                  <th className="border-b p-4 text-left">Created At</th>
                  <th className="border-b p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="border-b p-4">
                      <img
                        src={product.coverImage}
                        alt={product.itemName}
                        className="h-16 w-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="border-b p-4">{product.itemName}</td>
                    <td className="border-b p-4">{product.modelNo}</td>
                    <td className="border-b p-4">{product.price}</td>
                    <td className="border-b p-4">{new Date(product.createdAt).toLocaleDateString()}</td>
                    <td className="border-b p-4 space-x-2 flex flex-col gap-2">
                      <button
                        onClick={() => {
                          setIsEditing(true);
                          setCurrentProduct(product);
                          setForm({ ...product });
                          setIsModalOpen(true);
                        }}
                        className="bg-blue-600 text-white py-1 px-2 rounded-md hover:bg-blue-800 md:h-8 md:w-20 mx-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="bg-red-600 text-white py-1 px-2 rounded-md hover:bg-red-800 md:h-8 md:w-20"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for Create/Edit Product */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ProductForm />
      </Modal>
    </Layout>
  );
};

export default Products;
