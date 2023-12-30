import React from "react";

type NavItemProps = {
  firstText: String;
  secondText: String;
};

const NavItem = ({ firstText, secondText }: NavItemProps) => {
  return (
    <div className="text-white">
      <p className="text-xs leading-3 text-nowrap">{firstText}</p>
      <p className="text-xs font-bold text-nowrap">{secondText}</p>
    </div>
  );
};

export default NavItem;
