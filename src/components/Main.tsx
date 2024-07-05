import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import useGetAllBlog from "../hook/useGetAllBlog";
import useGetBlog from "../hook/useGetBlog";
import { useNavigate } from "react-router-dom";

interface Blog {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
}

interface JwtPayload {
  id?: string;
}

const SkeletonCard = () => (
  <div className="bg-gray-200 rounded-lg shadow-md p-6 animate-pulse">
    <div className="h-6 bg-gray-300 mb-4 rounded"></div>
    <div className="h-4 bg-gray-300 mb-2 rounded"></div>
    <div className="h-4 bg-gray-300 mb-2 rounded"></div>
    <div className="h-4 bg-gray-300 mb-4 rounded"></div>
    <div className="flex justify-between items-center">
      <div className="h-4 bg-gray-300 w-24 rounded"></div>
      <div className="h-4 bg-gray-300 w-16 rounded"></div>
      <div className="h-8 bg-gray-300 w-16 rounded-full"></div>
    </div>
  </div>
);

const Main = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const blogs = useGetAllBlog();
  const token = localStorage.getItem("token");

  const { fetchBlog } = useGetBlog();

  let userId = "";

  if (token) {
    const decodedToken = jwtDecode<JwtPayload>(token);
    userId = decodedToken?.id as string;
  }

  useEffect(() => {
    if (blogs.length > 0) {
      setLoading(false);
    }
  }, [blogs]);

  const handleClick = async (id: string) => {
   const response = await  fetchBlog(id);
   if(response?.data){
    navigate("/create-blog", { state: { blog: response?.data.post } });
   } 
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 9 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : blogs.map((blog: Blog) => (
              <div key={blog.id} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                <p className="text-gray-700 mb-4">{blog.content}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Author: {blog.authorId}</span>
                  <span
                    className={`text-sm ${
                      blog.published ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {blog.published ? "Published" : "Unpublished"}
                  </span>
                  <button
                    onClick={() => handleClick(blog.id)}
                    className={`px-4 py-2 ml-4 rounded-full bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      blog.authorId !== userId
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Main;
