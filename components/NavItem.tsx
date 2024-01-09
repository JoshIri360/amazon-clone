import React from "react";

type NavItemProps = {
  firstText: String;
  secondText: String;
};

const NavItem = ({ firstText, secondText }: NavItemProps) => {
  return (
    <div className="text-white [&>*]:text-nowrap [&>*]:text-xs">
      <p className="leading-3">{firstText}</p>
      <p className="font-bold">{secondText}</p>
    </div>
  );
};

export default NavItem;
