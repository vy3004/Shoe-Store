import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = () => {
  return (
    <Link
      href={`/product/1`}
      className="transform overflow-hidden bg-white rounded-xl border duration-200 hover:scale-105 cursor-pointer"
    >
      <Image
        width={700}
        height={700}
        src="/product-1.webp"
        alt="Image Product"
      />
      <div className="p-4 text-black/[0.9]">
        <h2 className="text-lg font-medium">Nike</h2>
        <div className="flex items-center text-black/[0.5]">
          <p className="mr-2 text-lg font-semibold">$1000</p>

          <>
            <p className="text-base  font-medium line-through">$200</p>
            <p className="ml-auto text-base font-medium text-green-500">
              80% off
            </p>
          </>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
