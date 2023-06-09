import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }) => {
  //console.log("PRODUCT", product);
  return (
    product && (
      <Link
        href={`/product/${product._id}`}
        className="transform overflow-hidden bg-white rounded-xl border duration-200 hover:scale-105 cursor-pointer"
      >
        <Image
          width={700}
          height={700}
          src={product.image}
          alt="Image Product"
        />
        <div className="p-4 text-black/[0.9]">
          <h2 className="text-lg font-medium">{product.name}</h2>
          <div className="flex items-center text-black/[0.5]">
            <p className="mr-2 text-lg font-semibold">${product.price}</p>

            <>
              <p className="text-base  font-medium line-through">$200</p>
              <p className="ml-auto text-base font-medium text-green-500">
                80% off
              </p>
            </>
          </div>
        </div>
      </Link>
    )
  );
};

export default ProductCard;
