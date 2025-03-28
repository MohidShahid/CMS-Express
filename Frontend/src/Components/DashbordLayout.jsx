import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "../Components/Logout";
import MainContent from "./MainContent";

function DashboardLayout() {
  const user = useSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  if (!user.data || user.data.role !== "admin") {
    return <h1>Unauthorized</h1>;
  } else {
    return (
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <aside
          className={`h-full w-64 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 
          sm:relative sm:flex sm:flex-col sm:z-0 
          fixed top-0 left-0 z-40 pt-16 transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
        >
          <div className="h-full px-3 pb-4 overflow-y-auto">
            <ul className="space-y-2 font-medium">
              <li>
                <a
                  href="/dashboard"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span className="ms-3">Dashboard</span>
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span className="ms-3">All Posts</span>
                </a>
              </li>
              <li>
                <a
                  href="/add-post"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span className="ms-3">Add New Post</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 w-full">
          {/* Navbar */}
          <nav className="fixed top-0 z-50 w-9/12 max-sm:w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-4 py-3 flex justify-between items-center">
              <div className="flex items-center">
                {/* Hamburger Menu */}
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  type="button"
                  className="inline-flex items-center p-2 text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                  <span className="sr-only">Open sidebar</span>
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                  </svg>
                </button>

                <a href="#" className="flex items-center ms-3">
                  <img
                    src="https://flowbite.com/docs/images/logo.svg"
                    className="h-8 me-3"
                    alt="Logo"
                  />
                  <span className="text-xl font-semibold dark:text-white">
                    Contently
                  </span>
                </a>
              </div>

              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={
                      user.data.profileImg
                        ? `http://localhost:3000/${user.data.profileImg}`
                        : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    }
                    alt="User"
                  />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 z-50 w-48 mt-2 bg-white divide-y divide-gray-100 rounded-md shadow-lg dark:bg-gray-700 dark:divide-gray-600">
                    <div className="px-4 py-3">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {user.data.name}
                      </p>
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">
                        {user.data.email}
                      </p>
                    </div>
                    <ul className="py-1">
                      <li>
                        <a
                          href="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <Link
                          to={"/uploadImg"}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Upload Image
                        </Link>
                      </li>
                      <li>
                        <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">
                          <Logout />
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 p-4 mt-16 bg-gray-100 dark:bg-gray-900">
            <MainContent />
          </main>
        </div>
      </div>
    );
  }
}
export default DashboardLayout;
