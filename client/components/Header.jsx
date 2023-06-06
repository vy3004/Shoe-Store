import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Wrapper from "./Wrapper";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";

import { BsSearch } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { FiUser } from "react-icons/fi";
import { BiUserCircle } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { IoMdLogIn } from "react-icons/io";

import { useAuth } from "@/context/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Store } from "@/utils/Store";
import { signOut, useSession } from "next-auth/react";
import Cookies from "js-cookie";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);

  const { data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const handleLogout = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/auth/login" });
  };

  return (
    <header className="w-full h-[50px] md:h-[70px] border-b z-20 sticky top-0 bg-white flex items-center justify-between">
      <Wrapper className="h-[50px] flex justify-between items-center">
        <Link href="/" className="w-[40px] md:w-[60px]">
          <Image width={500} height={500} src="/logo.svg" alt="logo" />
        </Link>

        <Menu showCatMenu={showCatMenu} setShowCatMenu={setShowCatMenu} />

        {mobileMenu && (
          <MenuMobile
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            setMobileMenu={setMobileMenu}
          />
        )}

        <div className="flex items-center gap-2 text-black">
          {/* Search icon start */}
          <div
            className="w-8 md:w-12 h-8 md:h-12 rounded-full 
          flex justify-center items-center 
          hover:bg-black/[0.05] cursor-pointer relative"
          >
            <BsSearch className="text-[15px] md:text-[20px]" />
          </div>
          {/* Search icon end */}

          {/* Favorite icon start */}
          <div
            className="w-8 md:w-12 h-8 md:h-12 rounded-full 
          flex justify-center items-center 
          hover:bg-black/[0.05] cursor-pointer relative"
          >
            <IoMdHeartEmpty className="text-[17px] md:text-[24px]" />
            <div
              className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] 
              rounded-full bg-red-500 absolute top-1 left-5 md:left-7 
              text-white text-[10px] md:text-[12px] 
              flex justify-center items-center px-[2px] md:px-[5px]"
            >
              59
            </div>
          </div>
          {/* Favorite icon end */}

          {/* Cart icon start */}
          <Link href="/cart">
            <div
              className="w-8 md:w-12 h-8 md:h-12 rounded-full 
          flex justify-center items-center 
          hover:bg-black/[0.05] cursor-pointer relative"
            >
              <BsCart className="text-[15px] md:text-[20px]" />
              <div
                className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] 
              rounded-full bg-red-500 absolute top-1 left-5 md:left-7 
              text-white text-[10px] md:text-[12px] 
              flex justify-center items-center px-[2px] md:px-[5px]"
              >
                {/* {cart &&
                    cart.cartItems &&
                    cart.cartItems.length > 0 &&
                    cart.cartItems.reduce((a, c) => a + c.quantity, 0)} */}
                100
              </div>
            </div>
          </Link>
          {/* Cart icon end */}

          {/* User icon start */}
          {session?.user ? (
            <div className="group inline-block relative">
              <div
                className="w-8 md:w-12 h-8 md:h-12 rounded-full 
          flex justify-center items-center 
          hover:bg-black/[0.05] cursor-pointer relative"
              >
                <BsPerson className="text-[18px] md:text-[24px]" />
              </div>
              <div className="absolute right-0 hidden mt-0 group-hover:block">
                <div className="block bg-white text-black shadow-lg rounded-md p-1">
                  <button className="w-full h-10 px-3 my-1 border-b text-left font-semibold">
                    {session.user.name}
                  </button>
                  <Link href="/dashboard">
                    <button className="w-full h-12 hover:bg-black/[0.03] px-3 rounded-md">
                      Dashboard
                    </button>
                  </Link>
                  <button
                    className="w-full h-12 hover:bg-black/[0.03] px-3 rounded-md text-left"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link href="/auth/login">
              <div
                className="w-8 md:w-12 h-8 md:h-12 rounded-full 
          flex justify-center items-center 
          hover:bg-black/[0.05] cursor-pointer relative"
              >
                <BsPerson className="text-[18px] md:text-[24px]" />
              </div>
            </Link>
          )}

          {/* User icon end */}

          {/* MobileMenu icon start */}
          <div
            className="w-8 md:w-12 h-8 md:h-12 rounded-full md:hidden 
          flex justify-center items-center 
          hover:bg-black/[0.05] cursor-pointer relative"
          >
            {mobileMenu ? (
              <VscChromeClose
                className="text-[16px]"
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <BiMenuAltRight
                className="text-[20px]"
                onClick={() => setMobileMenu(true)}
              />
            )}
          </div>
          {/* MobileMenu icon end */}
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
