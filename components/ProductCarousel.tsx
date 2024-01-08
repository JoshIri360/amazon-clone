"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const ProductCarousel = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // Update the state on window resize
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 800);
    };

    // Attach event listener
    window.addEventListener("resize", handleResize);

    // Call the handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  const renderImage = (src: string) => (
    <div className="sm:w-[95vw] aspect-square md:aspect-auto md:w-auto md:h-[80vh] bg-black relative">
      <Image
        alt="Carousel"
        src={isSmallScreen ? `/sm/${src}` : `/lg/${src}`}
        fill={true}
        style={{
          width: "100%",
          // height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );

  return (
    <div className="relative">
      <div className="absolute h-24 w-full bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-10"></div>
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        {renderImage("carousel1.jpg")}
        {renderImage("carousel2.jpg")}
        {renderImage("carousel3.jpg")}
        {renderImage("carousel4.jpg")}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
