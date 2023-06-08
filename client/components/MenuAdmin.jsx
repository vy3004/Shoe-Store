import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import Link from "next/link";
import { BiShoppingBag } from "react-icons/bi";
import { FiPackage, FiUsers } from "react-icons/fi";

const MenuAdmin = ({ title }) => {
  const items = [
    {
      title: "dashboard",
      link: "/dashboard",
      icon: <MdOutlineDashboard />,
    },
    {
      title: "orders",
      link: "/dashboard/orders",
      icon: <BiShoppingBag />,
    },
    {
      title: "products",
      link: "/dashboard/products",
      icon: <FiPackage />,
    },
    {
      title: "users",
      link: "/dashboard/users",
      icon: <FiUsers />,
    },
  ];

  return (
    <div className="flex flex-col">
      {items.map((item) => (
        <Link
          key={item.title}
          className={`${
            title === item.title ? "bg-black text-white" : "bg-white text-black"
          } w-full h-12 my-1 border-black flex items-center justify-center capitalize text-[20px] font-semibold rounded-md shadow-md`}
          href={item.link}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default MenuAdmin;
