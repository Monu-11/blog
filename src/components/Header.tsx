import { TfiWrite } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token")
    toast.success('Sucessfully Logout')
    navigate('/')
  }
  return (
    <div className="h-20 bg-gray-800 text-white w-full flex items-center px-6">
      <div className="flex justify-between w-full">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold">
            <Link to={"/"}>Medium-blog</Link>
          </div>
          
        </div>
        <div className="flex items-center space-x-6">
          <button
            data-tooltip-target="tooltip-default"
            onClick={() => navigate("/create-blog")}
            className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <TfiWrite />
          </button>
          {token && (
            <button
              onClick={handleLogout}
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
