import axios from 'axios';
import {toast} from 'react-toastify';
import {BASE_URL} from './constants';

const API = axios.create(
  { baseURL: `${BASE_URL}/api` },
  {
    headers: {
      'Content-Type': 'multipart/form-data'
  }}
);

API.interceptors.request.use((req) => {
  if (localStorage.getItem('auth')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('auth')).access}`;
  } else {
    window.location.href = "/login";
  }
  return req;
});

API.interceptors.response.use(
	(response) => response,
    async function errorfunc(error) {
		const originalRequest = error.config;

		if (typeof error.response === 'undefined') {
			toast.error('Server Error', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
			return Promise.reject(error);
		}
    if(error.response.status === 401){
      localStorage.clear();
      window.location.href="/login";
    }


		// specific error handling done elsewhere
		return Promise.reject(error);
	}
);



export const getUserData =()=> API.get('/user/');
export const updateUserData =(formData)=> API.put('/user/', formData);


export const getAllOrders =(formData)=> API.get('/orders/', {params : formData});
export const getOrder = (formData) => API.get(`/orders/${formData.id}/`);
export const placeUserOrder = (formData) => API.post('/orders/', formData);

export const getCartItems = (formData) => API.get('/orderitem/', formData);
export const updateCartItem = (formData) => API.put(`/orderitem/${formData.id}/`, formData);
export const deleteCartItem = (formData) => API.delete(`/orderitem/${formData.id}/`, formData);

export const addItemToCart = (formData) => API.post('/orderitem/create/', formData);
export const addItemToWishlist = (formData) => API.post('/wishlist/create/', formData);
export const getWishlist =(formData)=> API.get('/wishlist/', {params : formData});
export const removeWishlist =(formData)=> API.delete(`/wishlist/${formData.id}/`, {params : formData});





