import axios from "axios"
import { BACKEND_URL } from "../config"

const useGetBlog = () => {


    const fetchBlog = async (id: string) => {
        try {
         const response =  await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`)
         return response
        } catch (error) {
            console.log(error)
        }
    }
  return { fetchBlog };
}

export default useGetBlog