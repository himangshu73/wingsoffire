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
          Looks like you haven't added anything to your cart yet.
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
      <div>
        <div>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-2 space-y-4">
              <div className="border">
                <Image
                  src={item.thumbnail}
                  height={50}
                  width={50}
                  alt={item.title}
                  priority
                  className="object-contain"
                />
              </div>
              <div className="text-xl font-medium">{item.title}</div>
              <div className="flex gap-1">
                <span className="px-3 py-1">Qty: {item.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                  className="px-3 py-1 text-gray-600"
                  aria-label="Increase quantity"
                >
                  <FaPlus />
                </button>
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                  className="px-3 py-1 text-gray-600 disabled:text-gray-300"
                  aria-label="Decrease quantity"
                >
                  <FaMinus />
                </button>
              </div>
              <span className="text-lg font-semibold">
                Price: ${(item.price * item.quantity).toFixed(2)}
              </span>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-red-500 hover:text-red-700"
                aria-label="Remove item"
              >
                <TiDelete size={24} />
              </button>
            </div>
          ))}
        </div>
        <div>
          <button className="px-3 py-1">Checkout</button>
        </div>
      </div>
    </div>
  );
}
