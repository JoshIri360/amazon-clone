"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/store";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { IconLoader2, IconStarFilled } from "@tabler/icons-react";
import { Minus, Plus } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useRouter } from "next/navigation";

const publicKey = process.env.stripe_public_key;
if (!publicKey) {
  throw new Error("Missing Stripe public key");
}
const stripePromise = loadStripe(publicKey);

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const createCheckoutSession = async () => {
    if (!session) {
      signIn();
      return;
    }

    if (cart.length === 0) {
      return;
    }

    setIsLoading(true);
    const { data } = await axios.post("/api/create-checkout-session", {
      cart,
      email: session?.user?.email,
    });
    setIsLoading(false);

    const checkoutURL = data.url;
    router.push(checkoutURL);
  };

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
    <div className="flex-center py-4">
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
                  {!session ? (
                    <button
                      onClick={() => signIn()}
                      className="w-min text-nowrap bg-yellow-400 p-2 py-1 rounded-lg hover:bg-yellow-500"
                    >
                      Sign in to your account
                    </button>
                  ) : (
                    <></>
                  )}
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

                        <div className="flex flex-col md:flex-row gap-2 md:gap-0">
                          <div className="flex flex-col">
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

                          <div className="flex md:flex-center">
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
                      </div>
                    );
                  }
                )}
              </div>
            )}
          </div>
        </div>
        <div>
          <div>
            <h2 className="text-sm">
              Subtotal ({cart.length} items):
              <span className="font-bold">
                £
                {cart
                  .reduce((acc, curr) => {
                    return acc + Number(curr.price) * curr.quantity;
                  }, 0)
                  .toFixed(2)}
              </span>
            </h2>
            <button
              onClick={createCheckoutSession}
              className={`w-full mt-2 p-2 bg-gradient-to-t from-yellow-400 hover:to-yellow-300 to-yellow-200
  ${!session || !cart.length ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isLoading ? (
                <div className="flex gap-2">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </div>
              ) : !session ? (
                "Sign in to checkout"
              ) : !cart.length ? (
                "Your cart is empty"
              ) : (
                "Proceed to checkout"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
