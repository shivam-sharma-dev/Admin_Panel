import React, { useState, useEffect } from "react";
import {
  MdOutlineArticle,
  MdOutlineDashboard,
  MdOutlineLogin,
  MdOutlineLogout,
  MdOutlinePerson,
  MdOutlineSearch,
  MdOutlineStore,
  MdOutlineEdit,
  MdOutlineDelete,
  MdMenu,
  MdClose
} from "react-icons/md";

function Products() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  // Fetch products data
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

  // Function to handle input changes for adding a new product
  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Function to handle input changes for editing a product
  const handleEditInputChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  // Function to update the active menu item
  const handleMenuItemClick = (item) => {
    setActiveItem(item);
    setSidebarOpen(false); // Close the sidebar on menu item click
  };

  const menuItems = [
    { name: "Dashboard", icon: <MdOutlineDashboard />, href: "/" },
    { name: "Products", icon: <MdOutlineStore />, href: "/products" },
    { name: "Blogs", icon: <MdOutlineArticle />, href: "/blogs" },
  ];

  const headerIcons = [
    { icon: <MdOutlineLogin />, ariaLabel: "Login" },
    { icon: <MdOutlineLogout />, ariaLabel: "Logout" },
    { icon: <MdOutlinePerson />, ariaLabel: "Profile" },
  ];

  // Function to handle adding a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://flex-o-pack-api.onrender.com/api/v1/product/create-product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
        setShowAddForm(false);
      } else {
        console.error("Failed to add product:", data.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Function to handle editing a product
  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://flex-o-pack-api.onrender.com/api/v1/product/update-product/${editProductId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
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
        setShowEditForm(false);
      } else {
        console.error("Failed to edit product:", data.message);
      }
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  // Function to handle deleting a product
  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `https://flex-o-pack-api.onrender.com/api/v1/product/delete-product/${productId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        setProducts(products.filter((product) => product._id !== productId));
      } else {
        console.error("Failed to delete product:", data.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Function to show the edit form with pre-filled data
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
    setShowEditForm(true);
  };

  return (
    <div className="transition-all duration-300 ease-linear flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-[280px] min-w-[280px] h-full z-20 shadow-custom pt-[81px] flex items-center justify-start flex-col bg-[#fff] transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out  lg:flex lg:static lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="fixed top-0 left-0 pt-[14px] pb-[13px] w-[280px] border-b border-[#f2f7fb] flex items-center justify-center z-[5]">
          <a href="/" className="relative no-underline">
            <img
              className="h-auto max-h-full align-middle border-0"
              height={"55px"}
              width={"220px"}
              src="https://flexopack.netlify.app/Navlogo.jpg"
              alt="Logo"
            />
          </a>
        </div>

        {/* Navigation */}
        <nav className="w-full overflow-y-auto relative z-[5]">
          <div className="p-5 w-full">
            {/* Main Home Section */}
            <div className="mb-5">
              <div className="text-lg font-bold leading-4 mb-[10px] pl-[14px] text-[#bdc7d3]">
                Main Home
              </div>
              <ul className="flex flex-col justify-center">
                <li className="relative list-none p-0">
                  <a
                    href={menuItems[0].href}
                    onClick={() => handleMenuItemClick(menuItems[0].name)}
                    className={`p-[14px] relative flex items-center justify-start gap-[10px] no-underline ${
                      activeItem === menuItems[0].name
                        ? "text-[#0d6efd]"
                        : "text-[#111111]"
                    }`}
                  >
                    <div className="w-5 h-5">{menuItems[0].icon}</div>
                    <div
                      className={`text-[18px] font-semibold leading-[17px] hover:text-[#0d6efd]`}
                    >
                      {menuItems[0].name}
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            {/* All Pages Section */}
            <div className="mb-5">
              <div className="text-lg font-bold leading-4 mb-[10px] pl-[14px] text-[#bdc7d3]">
                All Pages
              </div>
              <ul className="flex flex-col">
                {menuItems.slice(1).map((item) => (
                  <li key={item.name} className="relative list-none p-0">
                    <a
                      href={item.href}
                      onClick={() => handleMenuItemClick(item.name)}
                      className={`p-[14px] relative flex items-center justify-start gap-[10px] no-underline ${
                        activeItem === item.name
                          ? "text-[#0d6efd]"
                          : "text-[#111111]"
                      }`}
                    >
                      <div className="w-5 h-5">{item.icon}</div>
                      <div
                        className={`text-[18px] font-semibold leading-[17px] hover:text-[#0d6efd]`}
                      >
                        {item.name}
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-grow transition-all duration-300 ease-linear">
        {/* Header */}
        <header className="h-[81px] shadow-custom w-full bg-[#fff] z-10 relative flex items-center justify-between px-4 md:px-8 lg:px-12">
          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-[#111] lg:hidden focus:outline-none"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? (
              <MdClose size={24} />
            ) : (
              <MdMenu size={24} />
            )}
          </button>

          {/* Search Bar */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="p-2 pl-10 border border-gray-300 rounded-md w-[200px] lg:w-[300px]"
              />
              <MdOutlineSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Header Icons */}
          <div className="flex items-center gap-6">
            {headerIcons.map((item, index) => (
              <button
                key={index}
                className="text-[#111] focus:outline-none"
                aria-label={item.ariaLabel}
              >
                {item.icon}
              </button>
            ))}
          </div>
        </header>

        {/* Product Content */}
        <main className="flex-grow p-4 md:p-8 lg:p-12">
          {/* Add Product Button */}
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-[#0d6efd] text-white py-2 px-4 rounded-md hover:bg-[#0056b3]"
          >
            {showAddForm ? "Cancel" : "Add Product"}
          </button>

          {/* Add Product Form */}
          {showAddForm && (
            <div className="mt-4">
              <form onSubmit={handleAddProduct} className="space-y-4">
                <input
                  type="text"
                  name="itemName"
                  value={newProduct.itemName}
                  onChange={handleInputChange}
                  placeholder="Item Name"
                  className="p-2 border border-gray-300 rounded-md w-full"
                  required
                />
                <input
                  type="text"
                  name="modelNo"
                  value={newProduct.modelNo}
                  onChange={handleInputChange}
                  placeholder="Model Number"
                  className="p-2 border border-gray-300 rounded-md w-full"
                  required
                />
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  placeholder="Price"
                  className="p-2 border border-gray-300 rounded-md w-full"
                  required
                />
                <input
                  type="text"
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  placeholder="Category"
                  className="p-2 border border-gray-300 rounded-md w-full"
                  required
                />
                <input
                  type="text"
                  name="weight"
                  value={newProduct.weight}
                  onChange={handleInputChange}
                  placeholder="Weight"
                  className="p-2 border border-gray-300 rounded-md w-full"
                  required
                />
                <input
                  type="text"
                  name="image"
                  value={newProduct.image}
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
              </form>
            </div>
          )}

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
                      <img
                        src={product.image}
                        alt={product.itemName}
                        className="h-16 w-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="border-b p-4">{product.itemName}</td>
                    <td className="border-b p-4">{product.modelNo}</td>
                    <td className="border-b p-4">${product.price}</td>
                    <td className="border-b p-4">{product.category}</td>
                    <td className="border-b p-4">
                      {product.specifications.weight}
                    </td>
                    <td className="border-b p-4 space-x-2">
                      <button
                        onClick={() => showEditFormWithProduct(product)}
                        className="text-[#0d6efd] hover:text-[#0056b3]"
                      >
                        <MdOutlineEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <MdOutlineDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Edit Product Form */}
          {showEditForm && (
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-2">Edit Product</h3>
              <form onSubmit={handleEditProduct} className="space-y-4">
                <input
                  type="text"
                  name="itemName"
                  value={editProduct.itemName}
                  onChange={handleEditInputChange}
                  placeholder="Item Name"
                  className="p-2 border border-gray-300 rounded-md w-full"
                  required
                />
                <input
                  type="text"
                  name="modelNo"
                  value={editProduct.modelNo}
                  onChange={handleEditInputChange}
                  placeholder="Model Number"
                  className="p-2 border border-gray-300 rounded-md w-full"
                  required
                />
                <input
                  type="number"
                  name="price"
                  value={editProduct.price}
                  onChange={handleEditInputChange}
                  placeholder="Price"
                  className="p-2 border border-gray-300 rounded-md w-full"
                  required
                />
                <input
                  type="text"
                  name="category"
                  value={editProduct.category}
                  onChange={handleEditInputChange}
                  placeholder="Category"
                  className="p-2 border border-gray-300 rounded-md w-full"
                  required
                />
                <input
                  type="text"
                  name="weight"
                  value={editProduct.weight}
                  onChange={handleEditInputChange}
                  placeholder="Weight"
                  className="p-2 border border-gray-300 rounded-md w-full"
                  required
                />
                <input
                  type="text"
                  name="image"
                  value={editProduct.image}
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
                  onClick={() => setShowEditForm(false)}
                  className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-600 ml-2"
                >
                  Cancel
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Products;
