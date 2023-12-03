// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import axios from "axios";

import { useQuery } from "@tanstack/react-query";


const fetchProducts = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/products`);
  const data = await response.json();
  return data;
};

const fetchProductById = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`);
  const data = await response.json();
  return data;
};


export const updateProductById = async (id, payload) => {
  // Declare data before using it
  const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  return data;
};

export const useGetProducts = () => {
  return useQuery({ queryKey: ['products'], queryFn: fetchProducts })
};

export const useGetProductById = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id
  });
};

export const useUpdateProductById = (id, payload) => {
  return useQuery({
    queryKey: ['update', id, payload],
    queryFn: () => updateProductById(id, payload),
    enabled: !!id
  });
};