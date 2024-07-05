import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Layout from "./Layout"
import Login from "./components/Login"
import Register from "./components/Register"
import Main from "./components/Main"
import Blog from "./components/Blog"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-blog" element={<Blog />} />
      </Route>
    )
  )
  return (
    <>
    <RouterProvider router={router} />
    <ToastContainer />
    </>
  )
}

export default App
