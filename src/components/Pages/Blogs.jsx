// Blogs.js
import React, { useState, useEffect } from 'react';
import Layout from '../../Layout/Layout';

const Blogs = () => {

  const [blogs, setBlogs] = useState([]);
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
        className="mb-2 p-2 border rounded w-full"
        required
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={form.author}
        onChange={handleInputChange}
        className="mb-2 p-2 border rounded w-full"
        required
      />
      <input
        type="text"
        name="tags"
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={handleInputChange}
        className="mb-2 p-2 border rounded w-full"
        required
      />
      <input
        type="text"
        name="cover"
        placeholder="Cover Image URL"
        value={form.cover}
        onChange={handleInputChange}
        className="mb-2 p-2 border rounded w-full"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {isEditing ? "Update Blog" : "Create Blog"}
      </button>
    </form>
  );


  return (
    <Layout>
      <div className="flex flex-col mb-8 px-6 py-8 gap-6 bg-[#fff] shadow-customShadow rounded-2xl">
        <div className="flex items-center justify-between">
          <h5 className="text-2xl text-[#111] font-bold">Blogs</h5>
          <button
            onClick={() => setIsEditing(true)}
            type="button"
            className="bg-blue-500 text-white p-2 rounded"
          >
            Create Blog
          </button>
        </div>

        {/* Blog Form */}
        {isEditing && <BlogForm />}

        {/* Blog List */}
        <div className="overflow-x-auto">
          <div className="flex flex-col">
            <ul className="flex justify-between">
              <li className="p-0 list-none w-[250px]">
                <div className="text-[#111] text-lg font-bold">Title</div>
              </li>

              <li className="p-0 list-none w-[200px]">
                <div className="text-[#111] text-lg font-bold">Author</div>
              </li>

              <li className="p-0 list-none w-[200px]">
                <div className="text-[#111] text-lg font-bold">Created At</div>
              </li>

              <li className="p-0 list-none w-[300px]">
                <div className="text-[#111] text-lg font-bold">Tags</div>
              </li>

              <li className="p-0 list-none w-[150px]">
                <div className="text-[#111] text-lg font-bold">Actions</div>
              </li>
            </ul>

            <div>
              <ul className="flex flex-col gap-[20px]">
                {blogs.map((blog) => (
                  <li
                    key={blog._id}
                    className="flex items-center p-2 border-b border-[#E5E8EC] justify-between"
                  >
                    <div className="flex items-center gap-3 w-[250px] p-2">
                      <img
                        className="h-16 w-16 object-cover rounded-lg"
                        src={blog.cover}
                        alt={blog.title}
                      />
                      <div className="text-[#111] text-lg font-bold">
                        {blog.title}
                      </div>
                    </div>
                    <div className="text-[#111] text-lg w-[200px] p-2">{`${blog.author.firstName} ${blog.author.lastName}`}</div>
                    <div className="text-[#111] text-lg w-[200px] p-2">{new Date(blog.createdAt).toLocaleDateString()}</div>
                    <div className="text-[#111] text-lg w-[350px] p-2">
                      {blog.tags.join(', ')}
                    </div>
                    <div className="text-[#111] text-lg w-[150px] p-2 flex gap-2">
                      <button
                        onClick={() => {
                          setIsEditing(true);
                          setCurrentBlog(blog);
                          setForm({
                            title: blog.title,
                            author: blog.author,
                            tags: blog.tags.join(', '),
                            cover: blog.cover,
                          });
                        }}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteBlog(blog._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default Blogs;
