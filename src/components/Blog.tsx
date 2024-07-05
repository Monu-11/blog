import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useCreateBlog from "../hook/useCreateBlog";
import useUpdateBlog from "../hook/useUpdateBlog";

interface Blog {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
}

const Blog = () => {
  const location = useLocation();
  const [title, setTitle] = useState<string>(
    location?.state?.blog?.title || ""
  );
  const [content, setContent] = useState<string>(
    location?.state?.blog?.content || ""
  );
  const [isPublished, setIsPublished] = useState<boolean>(
    location?.state?.blog?.published || false
  );

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const { loading: createLoading, createBlog } = useCreateBlog();

  const { loading, updateBlog } = useUpdateBlog();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here

    const blogData = {
      title,
      content,
      published: isPublished,
    };
    if (location?.state?.blog.id) {
      // Update existing blog
      updateBlog({ ...blogData, id: location?.state?.blog?.id });
    } else {
      // Create new blog
      createBlog(blogData);
    }
  };

  return token ? (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {location?.state?.blog?.id ? "Update Blog" : "Create Blog"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the blog title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="content">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the blog content"
              rows={6}
            ></textarea>
          </div>
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="isPublished"
              name="isPublished"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isPublished" className="ml-2 block text-gray-700">
              Is Published
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {location?.state?.blog?.id
              ? loading
                ? "Loading..."
                : "Update Blog"
              : createLoading
              ? "Loading..."
              : "Create Blog"}
          </button>
        </form>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Please Login/Register the Account
        </h2>

        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-center">
            <p className="mr-2">If you are already registered, click here:</p>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            >
              Login
            </button>
          </div>

          <div className="flex items-center justify-center">
            <p className="mr-2">If you are not registered, click here:</p>
            <button
              onClick={() => navigate("/register")}
              className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
