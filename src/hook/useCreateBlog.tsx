import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface blogProps {
    title: string;
    content: string;
    published?: boolean;
}

const useCreateBlog = () => {
    const [loading , setLoading] = useState(false)

    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const createBlog = async (blog: blogProps) => {
        try {
            setLoading(true)
           const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,blog,{
            headers: {
                Authorization: `Bearer ${token}`
            }
           }) 
           console.log(response)
           toast.success('Blog Added Successfully')
           setLoading(false)
           navigate('/')
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }
  return{
    createBlog,
    loading
  }
}

export default useCreateBlog