import React, { useContext, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch } from "react-redux";

import { IoMdHeartEmpty } from "react-icons/io";

import Wrapper from "@/components/Wrapper";
import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import RelatedProducts from "@/components/RelatedProducts";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "@/utils/Store";

const ProductDetails = ({ product, products }) => {
  const [selectedSize, setSelectedSize] = useState();
  const [showError, setShowError] = useState(false);
  //const dispatch = useDispatch();
  //const p = product?.data?.[0]?.attributes;
  const { state, dispatch } = useContext(Store);

  const notify = () => {
    toast.success("Success. Check your cart!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleAddToCart = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
  };

  return (
    <div className="w-full md:py-20">
      <ToastContainer />
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
          {/* left column start */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            <ProductDetailsCarousel />
          </div>
          {/* left column end */}

          {/* right column start */}
          <div className="flex-[1] py-3">
            {/* PRODUCT TITLE */}
            <div className="text-[34px] font-semibold mb-2 leading-tight">
              Nike
            </div>

            {/* PRODUCT SUBTITLE */}
            <div className="text-lg font-semibold mb-5">Sub Nike</div>

            {/* PRODUCT PRICE */}
            <div className="flex items-center">
              <p className="mr-2 text-lg font-semibold">MRP : $1000</p>

              <>
                <p className="text-base  font-medium line-through">$500</p>
                <p className="ml-auto text-base font-medium text-green-500">
                  50% off
                </p>
              </>
            </div>

            <div className="text-md font-medium text-black/[0.5]">
              incl. of taxes
            </div>
            <div className="text-md font-medium text-black/[0.5] mb-20">
              {`(Also includes all applicable duties)`}
            </div>

            {/* PRODUCT SIZE RANGE START */}
            <div className="mb-10">
              {/* HEADING START */}
              <div className="flex justify-between mb-2">
                <div className="text-md font-semibold">Select Size</div>
                <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                  Select Guide
                </div>
              </div>
              {/* HEADING END */}

              {/* SIZE START */}
              <div id="sizesGrid" className="grid grid-cols-3 gap-2">
                <div
                  className={`border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer border-black`}
                  // onClick={() => {
                  //   setSelectedSize(item.size);
                  //   setShowError(false);
                  // }}
                >
                  40
                </div>
                <div
                  className={`border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer border-black`}
                >
                  40
                </div>
                <div
                  className={`border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer border-black`}
                >
                  40
                </div>
                <div
                  className={`border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer border-black`}
                >
                  40
                </div>
                <div
                  className={`border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer border-black`}
                >
                  40
                </div>
                <div
                  className={`border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer border-black`}
                >
                  40
                </div>
                {/* {p.size.data.map((item, i) => (
                  <div
                    key={i}
                    className={`border rounded-md text-center py-3 font-medium ${
                      item.enabled
                        ? "hover:border-black cursor-pointer"
                        : "cursor-not-allowed bg-black/[0.1] opacity-50"
                    } ${selectedSize === item.size ? "border-black" : ""}`}
                    onClick={() => {
                      setSelectedSize(item.size);
                      setShowError(false);
                    }}
                  >
                    {item.size}
                  </div>
                ))} */}
              </div>
              {/* SIZE END */}

              {/* SHOW ERROR START */}
              {showError && (
                <div className="text-red-600 mt-1">
                  Size selection is required
                </div>
              )}
              {/* SHOW ERROR END */}
            </div>
            {/* PRODUCT SIZE RANGE END */}

            {/* ADD TO CART BUTTON START */}
            <button
              className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
              // onClick={() => {
              //   if (!selectedSize) {
              //     setShowError(true);
              //     document.getElementById("sizesGrid").scrollIntoView({
              //       block: "center",
              //       behavior: "smooth",
              //     });
              //   } else {
              //     dispatch(
              //       addToCart({
              //         ...product?.data?.[0],
              //         selectedSize,
              //         oneQuantityPrice: p.price,
              //       })
              //     );
              //     notify();
              //   }
              // }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            {/* ADD TO CART BUTTON END */}

            {/* WISHLIST BUTTON START */}
            <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
              Wishlist
              <IoMdHeartEmpty size={20} />
            </button>
            {/* WISHLIST BUTTON END */}

            <div>
              <div className="text-lg font-bold mb-5">Product Details</div>
              <div className="markdown text-md mb-5">
                <ReactMarkdown>
                  description description description description description
                  description description description description description
                </ReactMarkdown>
              </div>
            </div>
          </div>
          {/* right column end */}
        </div>

        <RelatedProducts products={products} />
      </Wrapper>
    </div>
  );
};

export default ProductDetails;
