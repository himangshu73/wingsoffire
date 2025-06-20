"use client";
import ImageSlider from "@/components/ImageSlider";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { Product } from "@/types/product";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function getAllProducts() {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("https://dummyjson.com/products");
      setProducts(response.data.products);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || error.message;
        setError(errorMessage);
        console.error(errorMessage);
      } else {
        setError("An unexpected error occurred");
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getAllProducts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-10 min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <p className="text-xl font-semibold mb-4">Error loading products</p>
          <p className="mb-4">{error}</p>
          <Button
            onClick={getAllProducts}
            className="bg-blue-500 hover:bg-blue-700"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      {products.length > 0 && <ImageSlider products={products.slice(0, 5)} />}
      <h1 className="text-4xl font-extrabold mt-6 mb-10 text-center">
        List of Products
      </h1>
      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">No products found</p>
        </div>
      ) : (
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
                  priority={products.indexOf(product) < 6}
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
      )}
    </div>
  );
}
