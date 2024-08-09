// Dashboard.js
import React, { useState, useEffect } from 'react';
import Layout from '../../Layout/Layout';
import Modal from '../Dashboard/Modal'; // Ensure this import is correct
import {
  MdOutlineArrowUpward,
  MdOutlineArrowDownward
} from "react-icons/md";
import Charts from '../Charts/Charts';

const Dashboard = () => {

  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [isBlogsViewAllOpen, setIsBlogsViewAllOpen] = useState(false);
  const [isProductsViewAllOpen, setIsProductsViewAllOpen] = useState(false);


  const initialProductCount = 5;
  const initialBlogCount = 5;

  // Fetch products data
  useEffect(() => {
    const fetchProducts = async () => {
      const startTime = new Date();

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

      const endTime = new Date();
      console.log(`Products API fetch time: ${endTime - startTime}ms`)
    };

    fetchProducts();
  }, []);

  // Fetch blogs data
  useEffect(() => {
    const fetchBlogs = async () => {
      const startTime = new Date();
      try {
        const response = await fetch(import.meta.env.VITE_API_BLOGS_URL);;
        const data = await response.json();
        if (data.status === "success") {
          setBlogs(data.data.blogs);
        } else {
          console.error("Failed to fetch blogs:", data.message);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
      
      const endTime = new Date();
      console.log(`Blogs API fetch time: ${endTime - startTime}ms`)
    };

    fetchBlogs();
  }, []);


  // Open modal
  const openModal = (item, type) => {
    setSelectedItem(item);
    setModalType(type);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };


  const displayedBlogs = isBlogsViewAllOpen ? blogs : blogs.slice(0, initialBlogCount);
  const displayedProducts = isProductsViewAllOpen ? products : products.slice(0, initialProductCount);

  const handleBlogsViewAll = () => {
    setIsBlogsViewAllOpen(!isBlogsViewAllOpen);
  };

  const handleProductsViewAll = () => {
    setIsProductsViewAllOpen(!isProductsViewAllOpen);
  };  

  return (
    <Layout>

      <div className="main-content-wrapper w-full m-auto">

        {/* Charts Section */}
        <div className="flex flex-col mb-8 px-6 py-8 gap-6 bg-[#fff] shadow-customShadow rounded-2xl">
          <div className="flex items-center justify-between">
            <h5 className="text-2xl text-[#111] font-bold">Charts</h5>
          </div>
          <div className="overflow-x-auto mt-8">
                <Charts/>
          </div>
        </div>


        {/* Products Section */}
        <div className="flex flex-col mb-8 px-6 py-8 gap-6 bg-[#fff] shadow-customShadow rounded-2xl">
          <div className="flex items-center justify-between">
            <h5 className="text-2xl text-[#111] font-bold">Products</h5>
            <div className="relative">

              <button
                type="button"
                className="flex items-center text-[#95989D] text-[15px] font-normal"
                aria-label={isProductsViewAllOpen ? 'View Less' : 'View All'}
                onClick={handleProductsViewAll}
              >
                {isProductsViewAllOpen ? 'View Less' : 'View All'}
                {isProductsViewAllOpen ? <MdOutlineArrowUpward /> : <MdOutlineArrowDownward />}
              </button>

            </div>
          </div>

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
                </tr>
              </thead>
              <tbody>

                {displayedProducts.map((product) => (
                  <tr key={product._id}
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => openModal(product, "product")}>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Blogs Section */}
        <div className="flex flex-col mb-8 px-6 py-8 gap-6 bg-[#fff] shadow-customShadow rounded-2xl">
          <div className="flex items-center justify-between">
            <h5 className="text-2xl text-[#111] font-bold">Blogs</h5>
            <div className="relative">
              '

              <button
                type="button"
                className="flex items-center text-[#95989D] text-[15px] font-normal"
                aria-label={isBlogsViewAllOpen ? 'View Less' : 'View All'}
                onClick={handleBlogsViewAll}
              >
                {isBlogsViewAllOpen ? 'View Less' : 'View All'}
                {isBlogsViewAllOpen ? <MdOutlineArrowUpward /> : <MdOutlineArrowDownward />}
              </button>


            </div>
          </div>


          <div className="overflow-x-auto mt-8">
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-b p-4 text-left">Image</th>
                  <th className="border-b p-4 text-left">Title</th>
                  <th className="border-b p-4 text-left">Author</th>
                  <th className="border-b p-4 text-left">Created At</th>
                  <th className="border-b p-4 text-left">Tags</th>
                </tr>
              </thead>
              <tbody>

                {displayedBlogs.map((blog) => (
                  <tr
                    key={blog._id}
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => openModal(blog, "blog")}
                  >
                    <td className="border-b p-4">
                      <img
                        src={blog.cover}
                        alt={blog.itemName}
                        className="h-16 w-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="border-b p-4">{blog.title}</td>
                    <td className="border-b p-4">{blog.author.firstName + " " + blog.author.lastName}</td>
                    <td className="border-b p-4">{new Date(blog.createdAt).toLocaleDateString()}</td>
                    <td className="border-b p-4">{blog.tags.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        item={selectedItem}
        type={modalType}
      />

    </Layout>
  );
};

export default Dashboard;
