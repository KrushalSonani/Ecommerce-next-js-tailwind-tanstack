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