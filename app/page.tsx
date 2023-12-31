import ProductCarousel from "@/components/ProductCarousel";
import ProductFeed from "@/components/ProductFeed";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="responsive-width z-10 px-3 items-center justify-between flex-col font-mono text-sm lg:flex">
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
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  console.log(products);

  return products;
};
