import axios from "axios";

export const labExpress = axios.create({
  baseURL: "/api",  
});

labExpress.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const { response } = error;
    return response.data;
  }
);
