import { ShoppingCart } from "lucide-react";
import React from "react";

type CartNavProps = {
  items: React.ReactNode;
};

const CartNavItem = ({ items }: CartNavProps) => {
  return (
    <div className="flex gap-1">
      <div className="relative">
        <div className="absolute -top-1 -right-1 bg-[#f3a847] w-4 h-4 rounded-full flex-center text-xs">
          <p>{items}</p>
        </div>
        <ShoppingCart className="text-white" />
      </div>
      <p className="hidden md:block text-white text-sm font-bold">Basket</p>
    </div>
  );
};

export default CartNavItem;
