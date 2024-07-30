import React, { useState, useEffect } from "react";
import {
  MdOutlineArticle,
  MdOutlineDashboard,
  MdOutlineLogin,
  MdOutlineLogout,
  MdOutlinePerson,
  MdOutlineSearch,
  MdOutlineStore,
  MdOutlineAddCircleOutline,
  MdOutlineEdit,
  MdOutlineDelete
} from "react-icons/md";

function Products() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
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
      <aside className="fixed w-[280px] min-w-[280px] h-full left-0 z-20 shadow-custom pt-[81px] flex items-center justify-start flex-col bg-[#fff]">
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
                    className={`p-[14px] relative flex items-center justify-start gap-[10px] no-underline ${activeItem === menuItems[0].name
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
                      className={`p-[14px] relative flex items-center justify-start gap-[10px] no-underline ${activeItem === item.name
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
      <div className="flex-grow pl-[280px] bg-[#F2F7FB] transition-all duration-300 ease-linear">
        {/* Header */}
        <header className="header-dashboard fixed top-0 right-0 w-customWidth h-20 py-[15px] pr-[40px] pl-[30px] bg-[#fff] shadow-customShadow z-[19] transition-all duration-300 ease-linear">
          <div className="wrap flex items-center justify-between gap-[15px] h-full">
            {/* Search Bar */}
            <div className="header-left w-full max-w-[780px] relative flex items-center gap-[15px]">
              <form className="flex-grow w-full relative">
                <fieldset className="name mb-0 ">
                  <input
                    type="text"
                    placeholder="Search here..."
                    className="show-search outline-0 shadow-none w-full py-[14px] px-[22px] text-lg font-normal leading-5 bg-transparent border-b border-[#ECF0F4] rounded-xl text-[#111] mb-0"
                    name="name"
                    tabIndex="2"
                    aria-required="true"
                    required
                  />
                </fieldset>
                <div className="button-submit absolute top-[15px] right-[22px] ">
                  <button
                    type="submit"
                    className="p-0 border-0 text-2xl text-[#111] font-normal leading-[20px] bg-transparent inline-block relative "
                    aria-label="Search"
                  >
                    <MdOutlineSearch className="hover:text-[#0d6efd]" />
                  </button>
                </div>
              </form>
            </div>

            {/* Header Icons */}
            <div className="header-grid flex gap-5">
              {headerIcons.map((icon, index) => (
                <button
                  key={index}
                  type="button"
                  className="login-icon flex items-center justify-center w-9 h-9 rounded-full bg-[#cbd5e14d] text-2xl hover:text-[#0d6efd]"
                  aria-label={icon.ariaLabel}
                >
                  {icon.icon}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="main-content flex flex-col pt-20 bg-[#F2F7FB] transition-all duration-300 ease-linear">
          <div className="main-content-inner p-[30px] flex-grow">
            <div className="main-content-wrapper w-full m-auto">
              {/* Products Section */}
              <div className="flex flex-col mb-8 px-6 py-8 gap-6 bg-[#fff] shadow-customShadow rounded-2xl">
                <div className="flex items-center justify-between">
                  <h5 className="text-2xl text-[#111] font-bold">Products</h5>
                  <div className="relative">
                    <button
                      type="button"
                      className="flex items-center text-[#95989D] text-[15px] font-normal"
                      aria-label="Add Product"
                      onClick={() => setShowAddForm(!showAddForm)}
                    >
                      Add Product
                      <MdOutlineAddCircleOutline />
                    </button>
                  </div>
                </div>

                {/* Add Product Form */}
                {showAddForm && (
                  <form
                    onSubmit={handleAddProduct}
                    className="flex flex-col gap-4 bg-[#F9F9F9] p-4 rounded-lg"
                  >
                    <input
                      type="text"
                      name="itemName"
                      value={newProduct.itemName}
                      onChange={handleInputChange}
                      placeholder="Item Name"
                      className="p-2 border border-[#E5E8EC] rounded-lg"
                      required
                    />
                    <input
                      type="text"
                      name="modelNo"
                      value={newProduct.modelNo}
                      onChange={handleInputChange}
                      placeholder="Model No."
                      className="p-2 border border-[#E5E8EC] rounded-lg"
                      required
                    />
                    <input
                      type="text"
                      name="price"
                      value={newProduct.price}
                      onChange={handleInputChange}
                      placeholder="Price"
                      className="p-2 border border-[#E5E8EC] rounded-lg"
                      required
                    />
                    <input
                      type="text"
                      name="category"
                      value={newProduct.category}
                      onChange={handleInputChange}
                      placeholder="Category"
                      className="p-2 border border-[#E5E8EC] rounded-lg"
                      required
                    />
                    <input
                      type="text"
                      name="weight"
                      value={newProduct.weight}
                      onChange={handleInputChange}
                      placeholder="Weight"
                      className="p-2 border border-[#E5E8EC] rounded-lg"
                      required
                    />
                    <input
                      type="text"
                      name="image"
                      value={newProduct.image}
                      onChange={handleInputChange}
                      placeholder="Image URL"
                      className="p-2 border border-[#E5E8EC] rounded-lg"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-[#0d6efd] text-white p-2 rounded-lg"
                    >
                      Add Product
                    </button>
                  </form>
                )}

                <div className="overflow-x-auto">
                  <div className="flex flex-col">
                    <ul className="flex border-b border-[#E5E8EC] mb-5 justify-between">
                      <li className="p-0 list-none">
                        <div className="text-[#111] text-lg font-bold w-[300px]">
                          Name
                        </div>
                      </li>

                      <li className="p-0 list-none">
                        <div className="text-[#111] text-lg font-bold w-[120px]">
                          Model No.
                        </div>
                      </li>

                      <li className="p-0 list-none">
                        <div className="text-[#111] text-lg font-bold w-[120px]">
                          Price
                        </div>
                      </li>

                      <li className="p-0 list-none">
                        <div className="text-[#111] text-lg font-bold w-[200px]">
                          Weight
                        </div>
                      </li>

                      <li className="p-2 list-none">
                        <div className="text-[#111] text-lg font-bold w-[300px]">
                          Category
                        </div>
                      </li>

                      <li className="p-2 list-none">
                        <div className="text-[#111] text-lg font-bold w-[150px]">
                          Actions
                        </div>
                      </li>
                    </ul>

                    <div>
                      <ul className="flex flex-col gap-[20px]">
                        {products.map((product) => (
                          <li
                            key={product._id}
                            className="flex border-b border-[#E5E8EC] justify-between p-2"
                          >
                            <div className="flex items-center gap-1 w-[300px]">
                              <img
                                className="h-16 w-16 object-cover rounded-lg"
                                src={product.image}
                                alt={product.name}
                              />
                              <div className="text-[#111] text-lg font-bold w-[300px]">
                                {product.itemName}
                              </div>
                            </div>
                            <div className="text-[#111] text-lg w-[120px]">
                              {product.modelNo}
                            </div>
                            <div className="text-[#111] text-lg w-[120px]">
                              {product.price}
                            </div>
                            <div className="text-[#111] text-lg w-[200px]">
                              {product.specifications.weight}
                            </div>
                            <div className="text-[#111] text-lg w-[300px]">
                              {product.specifications.products}
                            </div>
                            <div className="flex gap-2 w-[150px]">
                              <button
                                onClick={() => showEditFormWithProduct(product)}
                                className="flex items-center justify-center w-8 h-8 rounded-full bg-[#cbd5e14d] text-xl hover:text-[#0d6efd]"
                                aria-label="Edit"
                              >
                                <MdOutlineEdit />
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteProduct(product._id)
                                }
                                className="flex items-center justify-center w-8 h-8 rounded-full bg-[#cbd5e14d] text-xl hover:text-[#0d6efd]"
                                aria-label="Delete"
                              >
                                <MdOutlineDelete />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Edit Product Form */}
                {showEditForm && (
                  <form
                    onSubmit={handleEditProduct}
                    className="flex flex-col gap-4 bg-[#F9F9F9] p-4 rounded-lg"
                  >
                    <input
                      type="text"
                      name="itemName"
                      value={editProduct.itemName}
                      onChange={handleEditInputChange}
                      placeholder="Item Name"
                      className="p-2 border border-[#E5E8EC] rounded-lg"
                      required
                    />
                    <input
                      type="text"
                      name="modelNo"
                      value={editProduct.modelNo}
                      onChange={handleEditInputChange}
                      placeholder="Model No."
                      className="p-2 border border-[#E5E8EC] rounded-lg"
                      required
                    />
                    <input
                      type="text"
                      name="price"
                      value={editProduct.price}
                      onChange={handleEditInputChange}
                      placeholder="Price"
                      className="p-2 border border-[#E5E8EC] rounded-lg"
                      required
                    />
                    <input
                      type="text"
                      name="category"
                      value={editProduct.category}
                      onChange={handleEditInputChange}
                      placeholder="Category"
                      className="p-2 border border-[#E5E8EC] rounded-lg"
                      required
                    />
                    <input
                      type="text"
                      name="weight"
                      value={editProduct.weight}
                      onChange={handleEditInputChange}
                      placeholder="Weight"
                      className="p-2 border border-[#E5E8EC] rounded-lg"
                      required
                    />
                    <input
                      type="text"
                      name="image"
                      value={editProduct.image}
                      onChange={handleEditInputChange}
                      placeholder="Image URL"
                      className="p-2 border border-[#E5E8EC] rounded-lg"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-[#0d6efd] text-white p-2 rounded-lg"
                    >
                      Update Product
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Products;
