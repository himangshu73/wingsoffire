import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Product } from "@/types/product";

interface ImageSliderProps {
  products: Product[];
}

export default function ImageSlider({ products }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const currentProduct = products[currentIndex];
  console.log(currentProduct);
  if (!products || products.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 text-center">
        No Products Available
      </div>
    );
  }
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all p-6 rounded-2xl flex flex-col items-center">
        <div className="mb-4 w-full flex justify-center">
          <Link href={`/products/${currentProduct.id}`}>
            <Image
              src={currentProduct.images[0]}
              width={600}
              height={400}
              alt={currentProduct.title}
              className="rounded-xl object-cover max-h-80 w-auto"
              priority
            />
          </Link>
        </div>
        <div className="text-center">
          <Link href={`/products/${currentProduct.id}`}>
            <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transitions-colors mb-2">
              {currentProduct.title}
            </h2>
          </Link>
          <p className="text-gray-600 mb-2">${currentProduct.price}</p>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
          aria-label="Previous Slide"
        >
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
          aria-label="Next slide"
        >
          &gt;
        </button>
        <div className="flex gap-2 mt-4">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-blue-500" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
