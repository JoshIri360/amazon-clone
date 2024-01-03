import { getProducts } from "@/app/page";
import Image from "next/image";
import { Key } from "react";

type productProps = {
  id: Key;
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
};

async function ProductFeed() {
  const products = await getProducts();

  return (
    <div>
      <div>Products here...</div>
      <div className="grid grid-cols-4 gap-10 w-full">
        {products.map(
          ({
            id,
            title,
            price,
            description,
            category,
            image,
          }: productProps) => (
            <div key={id} className="flex-col gap-4 border border-blue-400 p-4">
              <Image src={image} alt={title} width={200} height={200} />

              <h3>{title}</h3>
              <p>{price}</p>
              <p>{description}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default ProductFeed;
