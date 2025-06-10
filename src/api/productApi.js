import axios from 'axios';

const BASE_URL = 'http://192.168.0.xxx:3001/products';

export const fetchProducts = () => axios.get(BASE_URL);
export const createProduct = (data) => axios.post(BASE_URL, data);
export const updateProductById = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteProductById = (id) => axios.delete(`${BASE_URL}/${id}`);
