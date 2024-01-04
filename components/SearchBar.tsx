import { Search } from "lucide-react";
import React from "react";

const SearchBar = () => {
  return (
    <div className=" rounded-md  overflow-hidden h-8 w-full">
      <input
        type="text"
        className="h-full w-full outline-none p-2"
        placeholder="Search"
      />
      <button className="h-full bg-[#f3a847] w-10 ">
        <Search width={20} />
      </button>
    </div>
  );
};

export default SearchBar;
