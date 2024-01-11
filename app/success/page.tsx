import Image from "next/image";
import React from "react";

const Success = () => {
  return (
    <div className="w-full h-[80vh] flex-center">
      <div className="rounded-md overflow-hidden bg-[#131921] h-[52vh] flex gap-4 items-center flex-col">
        <div className="text-black font-semibold px-10 py-5 bg-[#F3A847] text-4xl">
          <h1>Order Successful!</h1>
        </div>
        <div>
          <p className="text-white font-semibold">
            Your order has been recieved
          </p>
        </div>
        <div className="relative w-full h-36">
          <Image
            src="/dancing-meme.jpg"
            // height={150}
            // width={350}
            fill={true}
            style={{ objectFit: "cover" }}
            alt="Dancing Meme"
          />
        </div>
        <div>
            <button className="rounded-md font-bold py-2 px-4 bg-[#F3A847]">
                CHECK STATUS
            </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
