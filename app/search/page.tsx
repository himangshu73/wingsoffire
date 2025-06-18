"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

interface Product {
  id: string;
  title: string;
}

export default function SearchResult() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  console.log(q);
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        if (q) {
          setLoading(true);
          const response = await axios.get(
            `https://dummyjson.com/products/search?q=${q}`
          );
          console.log(response.data.products);
          setResults(response.data.products);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [q]);
  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <div>
      {results.map((product) => (
        <div key={product.id}>{product.title}</div>
      ))}
    </div>
  );
}
