"use client";
import axios, { AxiosError } from "axios";
import { useEffect } from "react";

export default function Home() {
  async function getAllProducts() {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      console.log(response);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.message);
        if (error.response) {
          console.log(error.response.status || error.response.data);
        } else if (error.request) {
          console.log(error.request);
        }
      } else {
        console.log(error);
      }
    }
  }
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div>
      <h1>Wing of Fire</h1>
    </div>
  );
}
