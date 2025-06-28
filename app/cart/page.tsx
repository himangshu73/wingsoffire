"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { TiDelete } from "react-icons/ti";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { toast } from "sonner";

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCartStore();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
    toast.success("Quantity Updated");
  };

  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId);
    toast.error("Item removed from cart");
  };

  const handleClearCart = () => {
    clearCart();
    toast.error("Cart Cleared");
  };
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10 max-w-6xl text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is Empty</h1>
        <p className="text-gray-600 mb-6">
          Looks like you have not added anything to your cart yet.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">
        Your cart has {totalItems()} items
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {cart.map((item) => (
              <div
                key={item.id}
                className="border-b border-gray-200 last:border-0 p-4 flex flex-col sm:flex-row gap-4"
              >
                <div className="w-full sm:w-32 h-32 relative">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    priority
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                      aria-label="Remove Item"
                    >
                      <TiDelete size={24} />
                    </button>
                  </div>
                  <p className="text-gray-600 mb-2">{item.brand}</p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="px-3 py-1 text-gray-600 disabled:text-gray-300"
                      >
                        <FaMinus />
                      </button>
                      <span className="px-3 py-1">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="px-3 py-1 text-gray-600"
                        aria-label="Increase Quantity"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <p className="text-lg font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleClearCart}
            className="mt-4 text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Clear Entire Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems()} items)</span>
                <span>${totalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${totalPrice().toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 px-6 my-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Proceed to Checkout
            </button>
            <p className="text-xl text-gray-500 mt-4 text-center">
              * Taxes Calculated at checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
