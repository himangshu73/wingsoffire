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
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold mb-10 text-center">
        List of Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product: Product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 p-6 rounded-2xl flex flex-col"
          >
            <div className="flex justify-center mb-4">
              <Image
                src={product.thumbnail}
                width={200}
                height={200}
                alt={product.title}
                className="rounded-xl object-cover"
              />
            </div>
            <div className="flex-1">
              <Link href="">
                <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors mb-2">
                  {product.title}
                </h2>
              </Link>
              <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                {product.description}
              </p>
              <p className="text-lg  text-green-600 font-bold mb-4">
                Price: ${product.price}
              </p>
              <div className="flex gap-4">
                <Button className="flex-1 bg-blue-500 hover:bg-blue-700 text-white">
                  <TiShoppingCart className="mr-2 text-xl" />
                  Add to Cart
                </Button>
                <Button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white">
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
