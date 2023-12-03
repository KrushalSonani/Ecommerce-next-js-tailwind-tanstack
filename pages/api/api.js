// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { useQuery } from "@tanstack/react-query";

//fetch products
const fetchProducts = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/products`);
  const data = await response.json();
  return data;
};

//call fetchproduct api
export const useGetProducts = () => {
  return useQuery({ queryKey: ['products'], queryFn: fetchProducts })
};


//fetch product details from id 
const fetchProductById = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`);
  const data = await response.json();
  return data;
};


//call fetchProductById api
export const useGetProductById = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id
  });
};


// update product details using id
export const updateProductById = async (id, payload) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  return data;
};
