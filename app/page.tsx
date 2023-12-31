import ProductCarousel from "@/components/ProductCarousel";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="responsive-width z-10 px-3 items-center justify-between font-mono text-sm lg:flex">
        <div className="w-full">
          <ProductCarousel />
        </div>
      </div>
    </main>
  );
}
