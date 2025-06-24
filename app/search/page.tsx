"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TiShoppingCart } from "react-icons/ti";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

function SearchResultContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        if (q) {
          setLoading(true);
          setError(null);
          const response = await axios.get(
            `https://dummyjson.com/products/search?q=${q}`
          );
          setResults(response.data.products);
        }
      } catch (err) {
        setError("Failed to fetch search results");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [q]);
  if (loading) {
    return <div className="p-4 text-center">Loading</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold mb-10 text-center">
        Search Results for: {q}
      </h1>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((product: Product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 p-6 rounded-2xl flex flex-col"
            >
              <div className="flex justify-center mb-4">
                <Link href={`/products/${product.id}`}>
                  <Image
                    src={product.thumbnail}
                    width={200}
                    height={200}
                    alt={product.title}
                    className="rounded-xl object-cover"
                  />
                </Link>
              </div>
              <div className="flex-1">
                <Link href={`/products/${product.id}`}>
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
      ) : (
        <p>{q ? "No results found" : "Enter a search term."}</p>
      )}
    </div>
  );
}

export default function SearchResult() {
  return (
    <Suspense
      fallback={<div className="p-4 text-center">Loading Search...</div>}
    >
      <SearchResultContent />
    </Suspense>
  );
}
