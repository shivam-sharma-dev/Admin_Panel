// // Layout.js
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   MdOutlineDashboard,
//   MdOutlineStore,
//   MdOutlineArticle,
//   MdOutlineLogout,
//   MdOutlinePerson,
//   MdOutlineSearch,
//   MdMenu, // Import hamburger menu icon
//   MdClose, // Import close icon for sidebar
// } from 'react-icons/md';

// const Layout = ({ children }) => {
//   const [activeItem, setActiveItem] = useState("Dashboard");
//   const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar visibility state

//   const menuItems = [
//     { name: "Dashboard", icon: <MdOutlineDashboard />, to: "/" },
//     { name: "Products", icon: <MdOutlineStore />, to: "/products" },
//     { name: "Blogs", icon: <MdOutlineArticle />, to: "/blogs" },
//   ];

//   const headerIcons = [
//     { icon: <MdOutlineLogout />, ariaLabel: "Logout" },
//     { icon: <MdOutlinePerson />, ariaLabel: "Profile" },
//   ];

//   const handleMenuItemClick = (item) => {
//     setActiveItem(item);
//     setSidebarOpen(false); // Close sidebar when a menu item is clicked
//   };

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <div className="flex min-h-screen transition-all duration-300 ease-linear">
//       {/* Sidebar */}
//       <aside
//         className={`fixed z-20 h-full bg-white shadow-custom pt-20 flex items-center justify-start flex-col transition-transform duration-300 ease-linear ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 md:w-[280px] md:min-w-[280px]`}
//       >
//         {/* Conditionally Render Close Button for Mobile */}
//         {sidebarOpen && (
//           <button
//             onClick={toggleSidebar}
//             className="absolute top-4 left-[200px] text-2xl md:hidden"
//             aria-label="Close sidebar"
//           >
//             <MdClose />
//           </button>
//         )}

//         {/* Logo */}
//         <div className="fixed top-0 left-0 flex items-center justify-center w-full py-4 px-2 border-b border-[#f2f7fb] z-5">
//           <Link to="/" className="relative no-underline">
//             <img
//               className="h-auto max-h-full align-middle border-0"
//               height={"55px"}
//               width={"220px"}
//               src="https://flexopack.netlify.app/Navlogo.jpg"
//               alt="Logo"
//             />
//           </Link>
//         </div>

//         {/* Navigation */}
//         <nav className="relative w-full overflow-y-auto z-5">
//           <div className="w-full p-5">
//             {/* Main Home Section */}
//             <div className="mb-5">
//               <div className="mb-[10px] text-lg font-bold leading-4 pl-[14px] text-[#bdc7d3]">
//                 Main Home
//               </div>
//               <ul className="flex flex-col justify-center">
//                 <li className="relative list-none p-0">
//                   <Link
//                     to={menuItems[0].to}
//                     onClick={() => handleMenuItemClick(menuItems[0].name)}
//                     className={`relative flex items-center justify-start gap-[10px] p-[14px] no-underline ${
//                       activeItem === menuItems[0].name
//                         ? "text-[#0d6efd]"
//                         : "text-[#111111]"
//                     }`}
//                   >
//                     <div className="w-5 h-5">{menuItems[0].icon}</div>
//                     <div className="text-[18px] font-semibold leading-[17px] hover:text-[#0d6efd]">
//                       {menuItems[0].name}
//                     </div>
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             {/* All Pages Section */}
//             <div className="mb-5">
//               <div className="mb-[10px] text-lg font-bold leading-4 pl-[14px] text-[#bdc7d3]">
//                 All Pages
//               </div>
//               <ul className="flex flex-col">
//                 {menuItems.slice(1).map((item) => (
//                   <li key={item.name} className="relative list-none p-0">
//                     <Link
//                       to={item.to}
//                       onClick={() => handleMenuItemClick(item.name)}
//                       className={`relative flex items-center justify-start gap-[10px] p-[14px] no-underline ${
//                         activeItem === item.name
//                           ? "text-[#0d6efd]"
//                           : "text-[#111111]"
//                       }`}
//                     >
//                       <div className="w-5 h-5">{item.icon}</div>
//                       <div className="text-[18px] font-semibold leading-[17px] hover:text-[#0d6efd]">
//                         {item.name}
//                       </div>
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-grow pl-0 md:pl-[280px] bg-[#F2F7FB] transition-all duration-300 ease-linear">
//         {/* Header */}
//         <header className="fixed top-0 right-0 z-19 flex items-center justify-between w-full h-20 py-[15px] pr-[40px] pl-[30px] bg-white shadow-custom md:w-customWidth transition-all duration-300 ease-linear">
//           {/* Hamburger Menu Icon */}
//           {!sidebarOpen && (
//             <button
//               onClick={toggleSidebar}
//               className="text-2xl md:hidden"
//               aria-label="Open sidebar"
//             >
//               <MdMenu />
//             </button>
//           )}

//           {/* Search Bar */}
//           <div className="relative flex items-center w-full gap-[15px] max-w-[780px]">
//             <form className="relative flex-grow w-full">
//               <fieldset className="mb-0 name">
//                 <input
//                   type="text"
//                   placeholder="Search here..."
//                   className="w-full py-[14px] px-[22px] mb-0 text-lg font-normal leading-5 text-[#111] placeholder:text-[#111] bg-transparent border-b border-[#ECF0F4] rounded-xl outline-0 shadow-none"
//                   name="name"
//                   tabIndex="2"
//                   aria-required="true"
//                   required
//                 />
//               </fieldset>
//               <div className="absolute top-[15px] right-[22px] button-submit">
//                 <button
//                   type="submit"
//                   className="inline-block relative p-0 text-2xl font-normal leading-[20px] text-[#111] bg-transparent border-0 hover:text-[#0d6efd]"
//                   aria-label="Search"
//                 >
//                   <MdOutlineSearch />
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* Header Icons */}
//           <div className="flex gap-5 header-grid">
//             {headerIcons.map((icon, index) => (
//               <button
//                 key={index}
//                 type="button"
//                 className="flex items-center justify-center w-9 h-9 text-2xl rounded-full bg-[#cbd5e14d] hover:text-[#0d6efd]"
//                 aria-label={icon.ariaLabel}
//               >
//                 {icon.icon}
//               </button>
//             ))}
//           </div>
//         </header>

//         {/* Main Content */}
//         <main className="flex flex-col flex-grow pt-20 bg-[#F2F7FB] transition-all duration-300 ease-linear">
//           <div className="p-[30px] main-content-inner">{children}</div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;


// Layout.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MdOutlineDashboard,
  MdOutlineStore,
  MdOutlineArticle,
  MdOutlineLogout,
  MdOutlinePerson,
  MdOutlineSearch,
  MdMenu, // Import hamburger menu icon
  MdClose, // Import close icon for sidebar
} from 'react-icons/md';

const Layout = ({ children }) => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar visibility state
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <MdOutlineDashboard />, to: "/" },
    { name: "Products", icon: <MdOutlineStore />, to: "/products" },
    { name: "Blogs", icon: <MdOutlineArticle />, to: "/blogs" },
  ];

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Redirect to the login page
    navigate('/login');
  };


  const headerIcons = [
    { icon: <MdOutlineLogout />, ariaLabel: "Logout", onClick: handleLogout },
    { icon: <MdOutlinePerson />, ariaLabel: "Profile" },
  ];

  const handleMenuItemClick = (item) => {
    setActiveItem(item);
    setSidebarOpen(false); // Close sidebar when a menu item is clicked
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };


  return (
    <div className="flex min-h-screen transition-all duration-300 ease-linear">
      {/* Sidebar */}
      <aside
        className={`fixed z-20 h-full bg-white shadow-custom pt-20 flex items-center justify-start flex-col transition-transform duration-300 ease-linear ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-[280px] md:min-w-[280px]`}
      >
        {/* Conditionally Render Close Button for Mobile */}
        {sidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="absolute top-4 left-[200px] text-2xl md:hidden"
            aria-label="Close sidebar"
          >
            <MdClose />
          </button>
        )}

        {/* Logo */}
        <div className="fixed top-0 left-0 flex items-center justify-center w-full py-4 px-2 border-b border-[#f2f7fb] z-5">
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
        <nav className="relative w-full overflow-y-auto z-5">
          <div className="w-full p-5">
            {/* Main Home Section */}
            <div className="mb-5">
              <div className="mb-[10px] text-lg font-bold leading-4 pl-[14px] text-[#bdc7d3]">
                Main Home
              </div>
              <ul className="flex flex-col justify-center">
                <li className="relative list-none p-0">
                  <Link
                    to={menuItems[0].to}
                    onClick={() => handleMenuItemClick(menuItems[0].name)}
                    className={`relative flex items-center justify-start gap-[10px] p-[14px] no-underline ${
                      activeItem === menuItems[0].name
                        ? "text-[#0d6efd]"
                        : "text-[#111111]"
                    }`}
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
              <div className="mb-[10px] text-lg font-bold leading-4 pl-[14px] text-[#bdc7d3]">
                All Pages
              </div>
              <ul className="flex flex-col">
                {menuItems.slice(1).map((item) => (
                  <li key={item.name} className="relative list-none p-0">
                    <Link
                      to={item.to}
                      onClick={() => handleMenuItemClick(item.name)}
                      className={`relative flex items-center justify-start gap-[10px] p-[14px] no-underline ${
                        activeItem === item.name
                          ? "text-[#0d6efd]"
                          : "text-[#111111]"
                      }`}
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
      <div className="flex-grow pl-0 md:pl-[280px] bg-[#F2F7FB] transition-all duration-300 ease-linear">
        {/* Header */}
        <header className="fixed top-0 right-0 z-20 flex items-center justify-between w-full h-20 py-[15px] pr-[40px] pl-[30px] bg-white shadow-custom md:w-customWidth transition-all duration-300 ease-linear">
          {/* Hamburger Menu Icon */}
          {!sidebarOpen && (
            <button
              onClick={toggleSidebar}
              className="text-2xl md:hidden"
              aria-label="Open sidebar"
            >
              <MdMenu />
            </button>
          )}

          {/* Search Bar */}
          <div className="relative flex items-center w-full gap-[15px] max-w-[780px]">
            <form className="relative flex-grow w-full">
              <fieldset className="mb-0 name">
                <input
                  type="text"
                  placeholder="Search here..."
                  className="w-full py-[14px] px-[22px] mb-0 text-lg font-normal leading-5 text-[#111] placeholder:text-[#111] bg-transparent border-b border-[#ECF0F4] rounded-xl outline-0 shadow-none"
                  name="name"
                  tabIndex="2"
                  aria-required="true"
                  required
                />
              </fieldset>
              <div className="absolute top-[15px] right-[22px] button-submit">
                <button
                  type="submit"
                  className="inline-block relative p-0 text-2xl font-normal leading-[20px] text-[#111] bg-transparent border-0 hover:text-[#0d6efd]"
                  aria-label="Search"
                >
                  <MdOutlineSearch />
                </button>
              </div>
            </form>
          </div>

          {/* Header Icons */}
          <div className="flex gap-5 header-grid">
            {headerIcons.map((icon, index) => (
              <button
                key={index}
                type="button"
                className="flex items-center justify-center w-9 h-9 text-2xl rounded-full bg-[#cbd5e14d] hover:text-[#0d6efd]"
                aria-label={icon.ariaLabel}
                onClick={icon.onClick}
              >
                {icon.icon}
              </button>
            ))}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-col flex-grow pt-20 bg-[#F2F7FB] transition-all duration-300 ease-linear">
          <div className="p-[30px] main-content-inner">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
