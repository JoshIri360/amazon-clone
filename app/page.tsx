import ProductCarousel from "@/components/ProductCarousel";
import ProductFeed from "@/components/ProductFeed";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`${inter.className} flex w-full min-h-screen flex-col items-center justify-between`}
    >
      <div className="responsive-width z-10 px-3 items-center justify-between flex-col text-sm lg:flex">
        <div className="w-full">
          <ProductCarousel />
        </div>
        <div>
          <ProductFeed />
        </div>
      </div>
    </main>
  );
}

export const getProducts = async () => {
  const products = await fetch(
    "https://fakestoreapi.com/products"
  ).then((res) => res.json());

  return products;
};
