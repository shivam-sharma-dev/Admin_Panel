import React, { useState, useEffect } from 'react';
import Layout from '../../Layout/Layout';
import Modal from './BlogModal';  // Import your modal component

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [form, setForm] = useState({ title: '', author: '', tags: '', cover: '' });

  // Fetch blogs data
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://flex-o-pack-api.onrender.com/api/v1/blog/get-blogs");
        const data = await response.json();
        if (data.status === "success") {
          setBlogs(data.data.blogs);
        } else {
          console.error("Failed to fetch blogs:", data.message);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Create Blog
  const createBlog = async (newBlog) => {
    try {
      const response = await fetch("https://flex-o-pack-api.onrender.com/api/v1/blog/create-blog", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlog),
      });
      const data = await response.json();
      if (data.status === 'success') {
        setBlogs((prevBlogs) => [...prevBlogs, data.data.blog]);
      } else {
        console.error("Failed to create blog:", data.message);
      }
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  // Update Blog
  const updateBlog = async (updatedBlog) => {
    try {
      const response = await fetch(`https://flex-o-pack-api.onrender.com/api/v1/blog/update-blog/${updatedBlog._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBlog),
      });
      const data = await response.json();
      if (data.status === 'success') {
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) => (blog._id === data.data.blog._id ? data.data.blog : blog))
        );
        setIsEditing(false);
        setCurrentBlog(null);
        setIsModalOpen(false);
      } else {
        console.error("Failed to update blog:", data.message);
      }
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  // Delete Blog
  const deleteBlog = async (id) => {
    try {
      const response = await fetch(`https://flex-o-pack-api.onrender.com/api/v1/blog/delete-blog/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.status === 'success') {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      } else {
        console.error("Failed to delete blog:", data.message);
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateBlog({ ...form, _id: currentBlog._id });
    } else {
      createBlog(form);
    }
  };

  // Form Component
  const BlogForm = () => (
    <form onSubmit={handleFormSubmit} className="bg-[#fff] p-6 shadow-customShadow rounded-2xl">
      <h3 className="text-xl font-bold mb-4">{isEditing ? "Edit Blog" : "Create Blog"}</h3>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-md w-full"
        required
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={form.author}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-md w-full"
        required
      />
      <input
        type="text"
        name="tags"
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-md w-full"
        required
      />
      <input
        type="text"
        name="cover"
        placeholder="Cover Image URL"
        value={form.cover}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-md w-full"
        required
      />
      <button type="submit" className="bg-[#0d6efd] text-white py-2 px-4 rounded-md hover:bg-[#0056b3]">
        {isEditing ? "Update Blog" : "Create Blog"}
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
            <h5 className="text-2xl text-[#111] font-bold">Blogs</h5>
            <button
              onClick={() => {
                setIsEditing(false);
                setIsModalOpen(true);
              }}
              type="button"
              className="bg-[#0d6efd] text-white py-2 px-4 rounded-md hover:bg-[#0056b3]"
            >
              Create Blog
            </button>
          </div>

          {/* Blog List */}
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-b p-4 text-left">Cover</th>
                  <th className="border-b p-4 text-left">Title</th>
                  <th className="border-b p-4 text-left">Author</th>
                  <th className="border-b p-4 text-left">Created At</th>
                  <th className="border-b p-4 text-left">Tags</th>
                  <th className="border-b p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog._id}>
                    <td className="border-b p-4">
                      <img
                        src={blog.cover}
                        alt={blog.title}
                        className="h-16 w-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="border-b p-4">{blog.title}</td>
                    <td className="border-b p-4">{`${blog.author.firstName} ${blog.author.lastName}`}</td>
                    <td className="border-b p-4">{new Date(blog.createdAt).toLocaleDateString()}</td>
                    <td className="border-b p-4">{blog.tags.join(', ')}</td>
                    <td className="border-b p-4 space-x-2">
                      <button
                        onClick={() => {
                          setIsEditing(true);
                          setCurrentBlog(blog);
                          setForm({ title: blog.title, author: blog.author, tags: blog.tags.join(', '), cover: blog.cover });
                          setIsModalOpen(true);
                        }}
                        className="bg-[#0d6efd] text-white py-1 px-2 rounded-md hover:bg-[#0056b3]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteBlog(blog._id)}
                        className="bg-red-600 text-white py-1 px-2 rounded-md hover:bg-red-800"
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

      {/* Modal for Create/Edit Blog */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <BlogForm />
      </Modal>
    </Layout>
  );
};

export default Blogs;

