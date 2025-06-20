import { Product } from "@/types/product";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useState } from "react";
import { TiShoppingCart } from "react-icons/ti";

type Params = Promise<{ id: string }>;

export default async function SingleProductPage({
  params,
}: {
  params: Params;
}) {
  const [error, setError] = useState<string | null>(null);

  try {
    const { id } = await params;
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    if (response.status !== 200) {
      return notFound();
    }

    const product: Product = response.data;
    console.log("Product: ", product);

    return (
      <div className="container mx-auto px-4 py-10">
        <div className="sm:flex justify-between">
          <div>
            <Image
              src={product.images[0]}
              width={600}
              height={600}
              alt={product.title}
              className="w-full h-auto object-contain rounded-lg"
              priority
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {product.title}
              </h2>
              <p className="text-sm text-gray-700 mb-6">
                {product.description}
              </p>
              <p className="text-lg text-green-500 font-bold mb-2">
                Price: ${product.price}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                In Stock:{product.stock}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 px-6 py-3 text-white font-medium bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg flex items-center justify-center gap-2">
                <TiShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="flex-1 px-6 py-3 text-white font-medium bg-orange-600 hover:bg-orange-700 transition duration-200 rounded-lg">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || error.message;
      setError(errorMessage);
      console.error(errorMessage);
    } else {
      setError("An unexpected error occurred");
      console.error(error);
    }
    return notFound();
  }
}
