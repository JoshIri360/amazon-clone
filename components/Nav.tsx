import Image from "next/image";
import SearchBar from "./SearchBar";
import NavItem from "./NavItem";
import { ShoppingCart } from "lucide-react";
import CartNavItem from "./CartNavItem";

const Nav = () => {
  return (
    <div className="bg-[#131921] flex p-2 gap-4 items-center justify-between">
      <div className="flex items-center flex-grow sm:flex-grow-0">
        <Image
          src="/logo.png"
          alt="Logo"
          width={150}
          height={40}
          objectFit="contain"
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
  );
};

export default Nav;
