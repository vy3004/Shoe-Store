import Link from "next/link";
import React from "react";
import { BsChevronDown } from "react-icons/bs";

const data = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "About", url: "/about" },
  { id: 3, name: "Categories", subMenu: true },
  { id: 4, name: "Contact", url: "/contact" },
];

const subMenuData = [
  { id: 1, name: "Jordan", doc_count: 11 },
  { id: 2, name: "Sneakers", doc_count: 8 },
  { id: 3, name: "Running shoes", doc_count: 64 },
  { id: 4, name: "Football shoes", doc_count: 107 },
];

const Menu = ({ showCatMenu, setShowCatMenu }) => {
  return (
    <ul className="hidden md:flex items-center gap-8 font-medium text-black">
      {data.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {!!item?.subMenu ? (
              <li
                className="cursor-pointer flex items-center gap-2 relative 
                before:content-[''] before:absolute before:bg-black 
                before:h-[2px] before:w-0 before:top-[22px] before:rounded-full
                before:transition-all before:duration-[250ms] before:ease-out
                hover:before:w-full"
                onMouseEnter={() => setShowCatMenu(true)}
                onMouseLeave={() => setShowCatMenu(false)}
              >
                {item.name}
                <BsChevronDown size={14} />

                {showCatMenu && (
                  <ul
                    className="bg-white absolute top-6 
                  left-0 min-w-[250px] px-1 py-1
                  text-black shadow-lg rounded-md"
                  >
                    {subMenuData.map((submenu) => {
                      return (
                        <Link
                          key={submenu.id}
                          href="/"
                          onClick={() => setShowCatMenu(false)}
                        >
                          <li
                            className="h-12 flex justify-between items-center px-3 
                          hover:bg-black/[0.03] rounded-md"
                          >
                            {submenu.name}
                            <span className="opacity-50 text-sm">
                              ({submenu.doc_count})
                            </span>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : (
              <li
                className="cursor-pointer relative 
              before:content-[''] before:absolute before:bg-black 
              before:h-[2px] before:w-0 before:top-[22px] before:rounded-full
              before:transition-all before:duration-[250ms] before:ease-out
              hover:before:w-full"
              >
                <Link href={item?.url}>{item.name}</Link>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default Menu;
