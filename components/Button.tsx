"use client";
import { useCart } from "@/store";
import { useSession } from "next-auth/react";
import { Key } from "react";

type ButtonProps = {
  id: Key;
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

const Button: React.FC<ButtonProps> = ({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
}) => {
  const { data: session } = useSession();
  const addToCart = useCart((state) => state.add);
  const cart = useCart((state) => state.cart);
  const increaseQuantity = useCart((state) => state.increaseQuantity);

  const handleClick = () => {
    if (!session) {
      // Add to local storage
      localStorage.setItem(
        "cart",
        JSON.stringify([
          ...cart,
          {
            id,
            title,
            price,
            description,
            category,
            image,
            rating,
            quantity: 1,
          },
        ])
      );
      return;
    }
    if (cart.some((item) => item.id === id)) {
      increaseQuantity(id);
      return;
    }
    addToCart({
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
      quantity: 1,
    });
  };

  return (
    <button
      onClick={handleClick}
      className="bg-gradient-to-t from-yellow-400 hover:to-yellow-300 to-yellow-200 w-full px-4 py-2 mt-1"
    >
      Add to Cart
    </button>
  );
};

export default Button;
