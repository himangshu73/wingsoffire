"use client";

import { Product } from "@/types/product";
import axios from "axios";
import Image from "next/image";
import { notFound } from "next/navigation";
import { TiShoppingCart } from "react-icons/ti";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";

type Params = Promise<{ id: string }>;

export default function SingleProductPage({ params }: { params: Params }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { id } = await params;
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        if (response.status !== 200) {
          setError(true);
          return;
        }
        setProduct(response.data);
        setSelectedImage(response.data.images[0]);
      } catch (error) {
        console.log(`Error fetching product:`, error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 max-w-6xl text-center">
        Loading...
      </div>
    );
  }

  if (error || !product) {
    notFound();
  }
  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Gallery Section */}
        <div className="lg:w-1/2">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Image
              src={selectedImage}
              width={600}
              height={600}
              alt={product.title}
              className="w-full h-auto object-contain rounded-lg"
              priority
            />
            <div className="flex gap-2 mt-4 overflow-x-auto py-2">
              {product.images.slice(0, 4).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className="focus:outline-none cursor-pointer"
                >
                  <Image
                    src={image}
                    width={100}
                    height={100}
                    alt={`${product.title} thumbnail ${index + 1}`}
                    className={`w-20 h-20 object-cover rounded border-2 ${
                      selectedImage == image
                        ? `border-blue-500`
                        : `border-gray-200`
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/*Product Info Section*/}
        <div className="lg:w-1/2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            <div className="flex items-center mb-4">
              <div
                className="flex mr-2"
                aria-label={`Rating: ${product.rating} out of 5`}
              >
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={20}
                    color={
                      i < Math.floor(product.rating) ? "gold" : "lightgray"
                    }
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {product.rating} ({product.stock} in stock){" "}
                {product.availabilityStatus}
              </span>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-bold text-green-600">
                ${product.price}
              </span>
              {product.discountPercentage && (
                <span className="ml-2 text-sm text-gray-500 line-through">
                  $
                  {(
                    product.price /
                    (1 - product.discountPercentage / 100)
                  ).toFixed(2)}
                </span>
              )}
              {product.discountPercentage && (
                <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </div>
            <div className="mbd-6">
              <p className="text-gray-700 mb-4">{product.description}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {product.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="flex-1 px-6 py-3 text-white font-medium bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg flex items-center justify-center gap-2"
                  disabled={product.stock <= 0}
                >
                  <TiShoppingCart className="w-5 h-5" />
                  {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                </button>
                <button className="flex-1 px-6 py-3 text-white font-medium bg-orange-600 hover:bg-orange-700 transition duration-200 rounded-lg">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        {/* Product Details Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Product Details</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex">
              <span className="w-48 font-medium">Brand</span>
              <span>{product.brand}</span>
            </li>
            <li className="flex">
              <span className="w-48 font-medium">Category</span>
              <span className="capitalize">{product.category}</span>
            </li>
            <li className="flex">
              <span className="w-48 font-medium">SKU</span>
              <span>{product.sku}</span>
            </li>
            <li className="flex">
              <span className="w-48 font-medium">Weight</span>
              <span>{product.weight} oz</span>
            </li>
            <li className="flex">
              <span className="w-48 font-medium">Dimensions</span>
              <span>
                {product.dimensions?.width} × {product.dimensions?.height} ×{" "}
                {product.dimensions?.depth} mm
              </span>
            </li>
            <li className="flex">
              <span className="w-48 font-medium">Minimum Order</span>
              <span>{product.minimumOrderQuantity} units</span>
            </li>
          </ul>
        </div>

        {/* Policy Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Policies</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex">
              <span className="w-48 font-medium">Warranty</span>
              <span>{product.warrantyInformation}</span>
            </li>
            <li className="flex">
              <span className="w-48 font-medium">Shipping</span>
              <span>{product.shippingInformation}</span>
            </li>
            <li className="flex">
              <span className="w-48 font-medium">Returns</span>
              <span>{product.returnPolicy}</span>
            </li>
          </ul>
        </div>

        {/* Reviews Section */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
            <div className="space-y-6">
              {product.reviews.map((review, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 pb-4 last:border-0"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">{review.reviewerName}</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            size={16}
                            color={i < review.rating ? "gold" : "lightgray"}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
