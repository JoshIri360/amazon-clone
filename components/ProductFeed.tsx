import { getProducts } from "@/app/page";
import { useStore } from "@/store";
import { IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";
import { Key } from "react";
import Button from "./Button";

type productProps = {
  id: Key;
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

async function ProductFeed() {
  const products = await getProducts();
  // const addToCart = useStore((state) => state.inc);

  return (
    <div>
      <div className="grid -mt-[17vh] sm:-mt-[20vh] md:-mt-[40vh] grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-5 md:gap-10 w-full px-2 md:px-5">
        {products.map(
          ({
            id,
            title,
            price,
            description,
            category,
            rating,
            image,
          }: productProps) => {
            return (
              <div
                key={id}
                className={`${
                  title.includes("John") || title.includes("SanDisk")
                    ? `col-span-2`
                    : ``
                } flex flex-col relative justify-between gap-4 p-4 z-20 bg-white transition-all cursor-pointer`}
              >
                <div>
                  <div className="w-full min-h-64 h-fit flex-center">
                    <Image
                      src={image}
                      alt={title}
                      width={0}
                      height={0}
                      sizes="90vh"
                      style={{
                        width: "auto",
                        height: "90%",
                        maxHeight: "15rem",
                      }}
                      // style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                  <h3 className="text-base font-bold mb-1 text-ellipsis line-clamp-2">
                    {title}
                  </h3>
                  <div className="gap-2 flex items-center">
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
                  <p className="text-ellipsis line-clamp-2">{description}</p>
                  <p className="font-semibold mt-2">£{price}</p>
                  <p className="absolute right-2 top-2 capitalize text-sm text-gray-400">
                    {category}
                  </p>
                </div>

                <div>
                  <Button
                    id={id}
                    title={title}
                    price={price}
                    description={description}
                    category={category}
                    rating={rating}
                    image={image}
                  />
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

export default ProductFeed;
