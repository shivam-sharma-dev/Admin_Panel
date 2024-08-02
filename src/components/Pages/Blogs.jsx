import { useState, useEffect } from "react";
import {
  MdOutlineArticle,
  MdOutlineDashboard,
  MdOutlineLogin,
  MdOutlineLogout,
  MdOutlinePerson,
  MdOutlineSearch,
  MdOutlineStore,
} from "react-icons/md";

function Blogs() {
  const [activeItem, setActiveItem] = useState("Dashboard");
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

  // Handle menu item click
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
          </div>
        </main>
      </div>
    </div>
  );
}

export default Blogs;
