"use client";
import Image from "next/image";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const ProductCarousel = () => {
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
        <div className="h-[80vh] bg-black">
          <Image
            alt="Carousel"
            src="/carousel/carousel1.jpg"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="h-[80vh] bg-black">
          <Image
            alt="Carousel"
            src="/carousel/carousel2.jpg"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="h-[80vh] bg-black">
          <Image
            alt="Carousel"
            src="/carousel/carousel3.jpg"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="h-[80vh] bg-black">
          <Image
            alt="Carousel"
            src="/carousel/carousel4.jpg"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
