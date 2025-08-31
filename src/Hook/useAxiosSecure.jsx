import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  axiosSecure.interceptors.request.use(function (config) {
    const token = localStorage.getItem('Access-Token');
    console.log('request stopped by interceptors', token);
    config.headers.authorization = `Bearer ${token}`;
    return config;
  }, function (error) {
    return Promise.reject(error);
  })

  // 401 & 403
  axiosSecure.interceptors.response.use(function (response) {
    return response;
  }, async (error) => {
    const status = error.response.status;
    console.log('interceptors error function', status);

    if (status === 401 || status === 403) {
      await logOut();
      navigate('/');
    }
    return Promise.reject(error)
  })
  return axiosSecure;
};

export default useAxiosSecure;