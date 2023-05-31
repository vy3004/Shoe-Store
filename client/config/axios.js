import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

instance.interceptors.response.use((response) => {
  return response.data;
});

export default instance;
