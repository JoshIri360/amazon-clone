"use client";
import Image from "next/image";
import SearchBar from "./SearchBar";
import NavItem from "./NavItem";
import CartNavItem from "./CartNavItem";
import { useEffect, useState } from "react";
import { BuiltInProviderType } from "next-auth/providers/index";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Nav = () => {
  const { data: session } = useSession();

  const isLoading = status === "loading";

  return (
    <div className="bg-[#232f3e] sm:bg-[#131921] flex flex-col items-center">
      <div className="bg-[#232f3e] sm:bg-[#131921] flex-center w-full">
        <div className="flex py-2 gap-4 items-center justify-between responsive-width">
          <Link href="/" className="relative max-w-20 min-w-16">
            <Image
              src="/logo.png"
              alt="Logo"
              width={1010}
              height={305}
              className="cursor-pointer"
            />
          </Link>
          <div className="hidden sm:block sm:[&>*]:flex w-full sm:[&>*>button]:flex-center">
            <SearchBar />
          </div>
          <div className="flex gap-5 [&>*]:cursor-pointer">
            <div
              onClick={async () => {
                if (!session && !isLoading) {
                  await signIn();
                } else if (!isLoading) {
                  await signOut();
                }
              }}
            >
              <NavItem
                firstText={
                  isLoading
                    ? "Loading..."
                    : session
                    ? `Hello, ${session?.user?.name}`
                    : `Sign In`
                }
                secondText="Account & Lists"
              />
            </div>

            <NavItem firstText="Returns" secondText="& Orders" />

            <Link href="/checkout">
              <CartNavItem items={0} />
            </Link>
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
