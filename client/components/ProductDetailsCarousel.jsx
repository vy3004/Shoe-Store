import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const ProductDetailsCarousel = ({ images }) => {
  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className="productCarousel"
      >
        {/* <Image width={500} height={500} src="/p2.png" alt="img" />
        <Image width={500} height={500} src="/p3.png" alt="img" />
        <Image width={500} height={500} src="/p4.png" alt="img" />
        <Image width={500} height={500} src="/p5.png" alt="img" />
        <Image width={500} height={500} src="/p6.png" alt="img" />
        <Image width={500} height={500} src="/p7.png" alt="img" /> */}
        <img src="/p2.png" />
        <img src="/p3.png" />
        <img src="/p4.png" />
        <img src="/p5.png" />
        <img src="/p6.png" />
        <img src="/p7.png" />
      </Carousel>
    </div>
  );
};

export default ProductDetailsCarousel;
