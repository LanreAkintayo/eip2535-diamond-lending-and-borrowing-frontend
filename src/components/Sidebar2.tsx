import React from "react";
import { FaTimes, FaHome, FaJoget } from "react-icons/fa";
import { IoMdCreate } from "react-icons/io";
import { MdDashboard, MdHowToVote } from "react-icons/md";
import { useLocation, Link, NavLink } from "react-router-dom";
import { ImHome } from "react-icons/im";

interface SidebarProps {
  showSidebar: boolean;
  closeSidebar: () => void;
}

const Sidebar2: React.FC<SidebarProps> = ({ showSidebar, closeSidebar }) => {
  // const router = useRouter();
  // const currentUrl = router.asPath;

   const location = useLocation();

   // console.log("Location: ", location)

   const currentUrl = location.pathname;

  console.log("Current url: ", currentUrl == "/");

  return (
    <div
      className={`fixed top-0 left-0 bg-gray-900 h-screen w-64 p-4 shadow transform transition-transform duration-300 ease-in-out ${
        showSidebar ? "translate-x-0" : "-translate-x-full"
      } z-50`}
    >
      <div
        className="w-full flex justify-end text-xl text-gray-300 hover:text-gray-800"
        onClick={closeSidebar}
      >
        <FaTimes />
      </div>

      <ul className="flex flex-col space-y-7 text-gray-200">
        <li className=" mt-12 ">
          <Link to="/" className={``}>
            <a
              onClick={closeSidebar}
              className={`hover:text-gray-400 cursor-pointer flex space-x-4 items-center ${
                currentUrl == "/" &&
                "border-t-0 border-l-0 border-r-0 border-b border-red-500 text-red-500"
              }`}
            >
              <FaHome />
              <p>Home</p>
            </a>
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/dashboard">
            <a
              onClick={closeSidebar}
              className={`hover:text-gray-400 cursor-pointer flex space-x-4 items-center ${
                currentUrl == "/dashboard" &&
                "border-t-0 border-l-0 border-r-0 border-b border-red-500 text-red-500"
              }`}
            >
              <MdDashboard />

              <p>Dashboard</p>
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar2;
