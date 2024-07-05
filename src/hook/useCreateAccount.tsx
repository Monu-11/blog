import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

interface RegisterForm {
    name?: string
    email: string
    password: string
}

const useCreateAccount = () => {
    const navigate = useNavigate()
  const [createAccount, setCreateAccount] = useState(null);
  const [loading , setLoading] = useState(false)

  const register = async (form: RegisterForm) => {
    try {
      setLoading(true)
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, form);
      setCreateAccount(response.data);
      toast.success('Account Created Successfully')
      setLoading(false)
      navigate('/login')
    } catch (error) {
      console.log('Error creating account:', error);
      toast.error('Error on Creating Account')
      setLoading(false)
    }finally{
      setLoading(false)
    }
  };

  return {
    createAccount,
    register,
    loading
  };
};

export default useCreateAccount;

