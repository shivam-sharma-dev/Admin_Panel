// Layout.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineDashboard, MdOutlineStore, MdOutlineArticle, MdOutlineLogin, MdOutlineLogout, MdOutlinePerson, MdOutlineSearch } from 'react-icons/md';

const Layout = ({ children }) => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <MdOutlineDashboard />, to: "/" },
    { name: "Products", icon: <MdOutlineStore />, to: "/products" },
    { name: "Blogs", icon: <MdOutlineArticle />, to: "/blogs" },
  ];

  const headerIcons = [
    { icon: <MdOutlineLogin />, ariaLabel: "Login" },
    { icon: <MdOutlineLogout />, ariaLabel: "Logout" },
    { icon: <MdOutlinePerson />, ariaLabel: "Profile" },
  ];

  const handleMenuItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="transition-all duration-300 ease-linear flex min-h-screen">
      {/* Sidebar */}
      <aside className="fixed w-[280px] min-w-[280px] h-full left-0 z-20 shadow-custom pt-[81px] flex items-center justify-start flex-col bg-[#fff]">
        {/* Logo */}
        <div className="fixed top-0 left-0 pt-[14px] pb-[13px] w-[280px] border-b border-[#f2f7fb] flex items-center justify-center z-[5]">
          <Link to="/" className="relative no-underline">
            <img
              className="h-auto max-h-full align-middle border-0"
              height={"55px"}
              width={"220px"}
              src="https://flexopack.netlify.app/Navlogo.jpg"
              alt="Logo"
            />
          </Link>
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
                  <Link
                    to={menuItems[0].to}
                    onClick={() => handleMenuItemClick(menuItems[0].name)}
                    className={`p-[14px] relative flex items-center justify-start gap-[10px] no-underline ${activeItem === menuItems[0].name ? "text-[#0d6efd]" : "text-[#111111]"}`}
                  >
                    <div className="w-5 h-5">{menuItems[0].icon}</div>
                    <div className="text-[18px] font-semibold leading-[17px] hover:text-[#0d6efd]">
                      {menuItems[0].name}
                    </div>
                  </Link>
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
                    <Link
                      to={item.to}
                      onClick={() => handleMenuItemClick(item.name)}
                      className={`p-[14px] relative flex items-center justify-start gap-[10px] no-underline ${activeItem === item.name ? "text-[#0d6efd]" : "text-[#111111]"}`}
                    >
                      <div className="w-5 h-5">{item.icon}</div>
                      <div className="text-[18px] font-semibold leading-[17px] hover:text-[#0d6efd]">
                        {item.name}
                      </div>
                    </Link>
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
                <fieldset className="name mb-0">
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
                <div className="button-submit absolute top-[15px] right-[22px]">
                  <button
                    type="submit"
                    className="p-0 border-0 text-2xl text-[#111] font-normal leading-[20px] bg-transparent inline-block relative"
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
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
