"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/store";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { IconStarFilled } from "@tabler/icons-react";
import { Minus, Plus } from "lucide-react";

const Page = () => {
  const { data: session } = useSession();

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const cart = useCart((state) => state.cart);
  const increaseQuantity = useCart((state) => state.increaseQuantity);
  const remove = useCart((state) => state.remove);
  const decreaseQuantity = useCart((state) => state.decreaseQuantity);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex-center py-4 bg-blue-50">
      {/* Left */}
      <div className="flex flex-col gap-5 md:flex-row w-[min(95%,1300px)]">
        <div className="md:w-5/6">
          <Image
            src={isSmallScreen ? "/sm/cart.jpg" : "/lg/cart.jpg"}
            alt="Cart"
            width={2220}
            height={2}
          />

          <div>
            {cart.length === 0 ? (
              <div className="flex flex-col sm:flex-row gap-6 items-center p-10 sm:p-4 bg-white mt-4">
                <div className="relative w-4/5 sm:w-2/6">
                  <Image
                    src="/lg/empty-cart.svg"
                    alt="Your cart is empty"
                    width={1080}
                    height={400}
                    // fill={true}
                    style={{ objectFit: "contain", objectPosition: "center" }}
                  />
                </div>
                <div className="flex flex-col gap-5">
                  <div>
                    <h1 className="text-2xl font-bold">
                      Your Amazon Cart is empty
                    </h1>
                    <Link
                      href="/"
                      className="text-blue-800 text-sm text-nowrap hover:underline hover:text-red-600 w-min"
                    >
                      Shop today&apos;s deals
                    </Link>
                  </div>
                  <button
                    onClick={() => signIn()}
                    className="w-min text-nowrap bg-yellow-400 p-2 py-1 rounded-lg hover:bg-yellow-500"
                  >
                    Sign in to your account
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-3xl font-bold py-4">Shopping Cart</h1>
                {cart.map(
                  ({
                    id,
                    title,
                    price,
                    description,
                    rating,
                    image,
                    quantity,
                  }) => {
                    return (
                      <div
                        key={id}
                        className="flex relative justify-between gap-4 p-4 z-20 bg-white transition-all"
                      >
                        <Image
                          src={image}
                          alt={title}
                          width={150}
                          height={400}
                        />

                        <div className="">
                          <h3 className="text-base font-bold mb-1 text-ellipsis line-clamp-2">
                            {title}
                          </h3>
                          <div className="flex items-center">
                            {Array(Math.floor(rating.rate)).fill(
                              <IconStarFilled
                                width={20}
                                className="text-yellow-400 my-2"
                              />
                            )}
                            {Array(5 - Math.floor(rating.rate)).fill(
                              <IconStarFilled
                                width={20}
                                className="text-gray-200 my-2"
                              />
                            )}
                            <p>
                              <span className="m-0 md:ml-3 text-blue-300 cursor-pointer">
                                {rating.count}
                              </span>
                            </p>
                          </div>
                          <p className="text-ellipsis line-clamp-2">
                            {description}
                          </p>
                          <p className="font-semibold mt-2">£{price}</p>
                        </div>

                        <div className="flex flex-center">
                          {/* Insert dropdown for quantity */}
                          <button
                            onClick={() => increaseQuantity(id)}
                            className="rounded-md bg-yellow-400 border border-yellow-500"
                          >
                            <Plus size={25} />{" "}
                          </button>
                          <div className="mx-1 w-[25px] h-[25px] flex-center border rounded-md">
                            {quantity}
                          </div>
                          <button
                            onClick={() => {
                              if (quantity === 1) {
                                remove(id);
                              } else {
                                decreaseQuantity(id);
                              }
                            }}
                            className="rounded-md bg-yellow-400 border border-yellow-500"
                          >
                            <Minus size={25} />
                          </button>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            )}
          </div>

          {/* Right */}
        </div>
        <div>
          <div>
            <h2 className="text-sm">
              Subtotal ({cart.length} items):
              <span className="font-bold">
                £
                {cart.reduce((acc, curr) => {
                  return acc + Number(curr.price) * curr.quantity;
                }, 0)}
              </span>
            </h2>
            <button
              className={`w-full mt-2 p-2 bg-gradient-to-t from-yellow-400 hover:to-yellow-300 to-yellow-200
              ${session ? "" : "opacity-50 cursor-not-allowed"}`}
            >
              {session ? "Proceed to checkout" : "Sign in to checkout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
