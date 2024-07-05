import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

interface LoginForm {
    email: string
    password: string
}

const useLoginAccount = () => {
    const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [loading , setLoading] = useState(false)

  const loginUser = async (form: LoginForm) => {
    try {
      setLoading(true)
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, form);
      setUser(response.data.user.email);
      localStorage.setItem('token', response.data.jwt)
      toast.success('Login Successfully')
      setLoading(false)
      navigate('/create-blog')
    } catch (error) {
      console.log('Error Login account:', error);
      toast.error('Something went Wrong')
      setLoading(false)
    } finally {
      setLoading(false)
    }
  };

  return {
    user,
    loginUser,
    loading
  };
};

export default useLoginAccount;

