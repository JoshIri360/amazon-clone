"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const Page = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // Update the state on window resize
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };

    // Attach event listener
    window.addEventListener("resize", handleResize);

    // Call the handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return (
    <div className="flex-center w-screen py-4 bg-blue-50">
      {/* Left */}
      <div className="w-[min(90%,1300px)]">
        <Image
          src={isSmallScreen ? "/sm/cart.jpg" : "/lg/cart.jpg"}
          alt="Cart"
          width={1020}
          height={400}
        />
        <h3>Your Shopping Basket</h3>
      </div>

      {/* Right */}
    </div>
  );
};

export default Page;
