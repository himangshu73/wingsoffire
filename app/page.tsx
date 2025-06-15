"use client";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TiShoppingCart } from "react-icons/ti";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export default function Home() {
  const [products, setProducts] = useState([]);
  async function getAllProducts() {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      setProducts(response.data.products);
      console.log(response.data.products);
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
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-extrabold my-8">List of Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: Product) => (
          <div
            key={product.id}
            className="p-4 border border-gray-300 shadow-lg rounded-lg overflow-hidden"
          >
            <div className="flex justify-center">
              <Image
                src={product.thumbnail}
                width={200}
                height={200}
                alt={product.title}
              />
            </div>
            <div>
              <Link href="" className="mb-2">
                <h2 className="text-xl font-bold hover:text-blue-500">
                  {product.title}
                </h2>
              </Link>
              <p className="text-gray-400 text-sm mb-2">
                {product.description}
              </p>
              <p className="font-bold mb-2">Price: ${product.price}</p>
              <div className="flex justify-between">
                <Button className="w-24 bg-blue-500 hover:bg-purple-500 hover:cursor-pointer">
                  <TiShoppingCart className="text-white" />
                </Button>
                <Button className="w-24 bg-green-500 hover:bg-amber-500 hover:cursor-pointer">
                  Buy
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
