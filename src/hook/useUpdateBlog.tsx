import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'

interface blogProps {
    title?: string;
    content?: string;
    published?: boolean;
    id: string;
}

const useUpdateBlog = () => {
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const updateBlog = async (blog: blogProps) => {
        try {
            setloading(false)
           const response = await axios.put(`${BACKEND_URL}/api/v1/blog`,blog,{
            headers: {
                Authorization: `Bearer ${token}`
            }
           }) 
           console.log(response)
           toast.success('Successfully updated blog')
           setloading(false)
           navigate('/')
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
            setloading(false)
        } finally {
            setloading(false)
        }
    }
  return{
    updateBlog,
    loading
  }
}

export default useUpdateBlog