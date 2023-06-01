import React, { useEffect, useState } from "react";
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

import { useAuth } from "@/context/auth";
import { toast } from "react-toastify";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);

  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("User logout successfully");
  };

  const controlNavbar = () => {
    if (window.scrollY > 50) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[25px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`w-full bg-stone-200 border-b z-20 sticky top-0 
    transition-transform duration-300 ${show}`}
    >
      {auth.user ? (
        <Wrapper
          className="h-[25px] flex items-center justify-between 
      text-[12px] md:text-[14px] text-black font-semibold"
        >
          <Link href="/dashboard">DashBoard</Link>
          <button onClick={handleLogout}>Logout</button>
          Hello! {auth.user.name}
        </Wrapper>
      ) : (
        <Wrapper
          className="h-[25px] flex items-center justify-end 
      text-[12px] md:text-[14px] text-black font-semibold"
        >
          <Link
            className="mr-1 cursor-pointer hover:font-extrabold"
            href="/auth/register"
          >
            Sign Up
          </Link>
          |
          <Link
            className="w-[46px] md:w-[52px] ml-1 cursor-pointer hover:font-extrabold"
            href="/auth/login"
          >
            Sign In
          </Link>
        </Wrapper>
      )}

      <nav
        className="w-full h-[50px] md:h-[70px] bg-white 
      flex items-center justify-between"
      >
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
                  5
                </div>
              </div>
            </Link>
            {/* Cart icon end */}

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
      </nav>
    </header>
  );
};

export default Header;
