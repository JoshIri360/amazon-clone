import Image from "next/image";
import SearchBar from "./SearchBar";
import NavItem from "./NavItem";
import { ShoppingCart } from "lucide-react";
import CartNavItem from "./CartNavItem";

const Nav = () => {
  return (
    <div className="bg-[#131921] flex-center">
      <div className="flex p-2 gap-4 items-center justify-between responsive-width">
        <div className="relative max-w-28 min-w-24">
          <Image
            src="/logo.png"
            alt="Logo"
            width={1012}
            height={307}
            className="cursor-pointer"
          />
        </div>
        <SearchBar />
        <div className="flex gap-5">
          <NavItem
            firstText="Hello, Joshua Aideloje"
            secondText="Account & Lists"
          />
          <NavItem firstText="Returns" secondText="& Orders" />
          <CartNavItem items={0} />
        </div>
      </div>
    </div>
  );
};

export default Nav;
