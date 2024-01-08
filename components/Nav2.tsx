import { Menu } from "lucide-react";
import React from "react";

const items = ["Today's Deals", "Registry", "Customer Service"];

const notRequired = ["Gift Cards", "Sell"];

const Nav2 = () => {
  return (
    <div className="bg-[#232f3e] flex-center">
      <div className="flex items-center responsive-width text-white text-sm gap-4 [&>*]:py-[0.3rem]">
        <div className="flex-center gap-1 cursor-pointer">
          <Menu />
          <p className="font-bold">All</p>
        </div>
        {items.map((item) => (
          <div key={item} className="[&>p]:cursor-pointer">
            <p>{item}</p>
          </div>
        ))}
        {notRequired.map((item) => (
          <div key={item} className="hidden md:block [&>p]:cursor-pointer">
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nav2;
