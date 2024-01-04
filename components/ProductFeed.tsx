import { getProducts } from "@/app/page";
import { IconStarFilled } from "@tabler/icons-react";
import { Star } from "lucide-react";
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
      <div className="grid -mt-64 bg-white grid-cols-4 gap-10 w-full px-5">
        {products.map(
          ({
            id,
            title,
            price,
            description,
            category,
            image,
          }: productProps) => {
            const rating = Math.floor(Math.random() * 5) + 1;

            return (
              <div key={id} className="flex flex-col justify-between gap-4 p-4 z-20 bg-white">
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
                  <div className="flex gap-2">
                    {Array(rating).fill(
                      <IconStarFilled className="text-yellow-400 my-2" />
                    )}
                  </div>
                  <p className="text-ellipsis line-clamp-2">{description}</p>
                  <p className="font-semibold mt-2">£{price}</p>
                </div>

                <button className="bg-gradient-to-t from-yellow-400 to-yellow-200 w-full px-4 py-2 mt-1">
                  Add to Basket
                </button>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

export default ProductFeed;
