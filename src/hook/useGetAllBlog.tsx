import { useState, useEffect } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"

const useGetAllBlog = () => {
    const [blogs, setBlogs] = useState([])


    const fetchAllBlogs = async () => {
        try {
         const response =  await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`)
         setBlogs(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAllBlogs()
    }, [])
  return (
    blogs
  )
}

export default useGetAllBlog