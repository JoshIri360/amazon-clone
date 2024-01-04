import Image from "next/image";
import SearchBar from "./SearchBar";
import NavItem from "./NavItem";
import { ShoppingCart } from "lucide-react";
import CartNavItem from "./CartNavItem";

const Nav = () => {
  return (
    <div className="bg-[#232f3e] sm:bg-[#131921] flex flex-col items-center">
      <div className="bg-[#232f3e] sm:bg-[#131921] flex-center w-full">
        <div className="flex p-2 gap-4 items-center justify-between responsive-width">
          <div className="relative max-w-20 min-w-16">
            <Image
              src="/logo.png"
              alt="Logo"
              width={1010}
              height={305}
              className="cursor-pointer"
            />
          </div>
          <div className="hidden sm:block sm:[&>*]:flex w-full sm:[&>*>button]:flex-center">
            <SearchBar />
          </div>
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
      <div className="bg-[#232f3e] sm:bg-[#131921] responsive-width block [&>*]:flex [&>*>button]:flex-center sm:hidden">
        <SearchBar />
      </div>
    </div>
  );
};

export default Nav;
