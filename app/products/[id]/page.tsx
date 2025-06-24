import { Product } from "@/types/product";
import axios from "axios";
import Image from "next/image";
import { notFound } from "next/navigation";
import { TiShoppingCart } from "react-icons/ti";
import { FaStar } from "react-icons/fa";

type Params = Promise<{ id: string }>;

export default async function SingleProductPage({
  params,
}: {
  params: Params;
}) {
  try {
    const { id } = await params;
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    if (response.status !== 200) {
      return notFound();
    }

    const product: Product = response.data;
    console.log("Product: ", product);

    return (
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image Gallery Section */}
          <div className="lg:w-1/2">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <Image
                src={product.images[0]}
                width={600}
                height={600}
                alt={product.title}
                className="w-full h-auto object-contain rounded-lg"
                priority
              />
              <div className="flex gap-2 mt-4 overflow-x-auto py-2">
                {product.images.slice(0, 4).map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    width={100}
                    height={100}
                    alt={`${product.title} thumbnail ${index + 1}`}
                    className="w-20 h-20 object-cover rounded border border-gray-200 cursor-pointer hover:border-blue-500"
                  />
                ))}
              </div>
            </div>
          </div>

          {/*Product Infor Section*/}
          <div className="lg:w-1/2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      size={20}
                      color={
                        i < Math.floor(product.rating) ? "gold" : "lightgray"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product.rating} ({product.stock} in stock)
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
              <p className="text-gray-700 mb-6">{product.description}</p>

              <div className="border-t border-gray-200 pt-4">
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
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold md-4">Product Details</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex">
                  <span className="w-32 font-medium">Brand</span>
                  <span>{product.brand}</span>
                </li>
                <li className="flex">
                  <span className="w-32 font-medium">Category</span>
                  <span className="capitalize">{product.category}</span>
                </li>
                <li className="flex">
                  <span className="w-32 font-medium">Availability</span>
                  <span>{product.stock > 0 ? "In Stock" : "Out of Stock"}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    return notFound();
  }
}
