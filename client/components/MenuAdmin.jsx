import React, { useState } from "react";
import ProductDashboard from "./ProductDashboard";
import CategoryDashboard from "./CategoryDashboard";
import UserDashboard from "./UserDashboard";

const MenuAdmin = () => {
  const [openTab, setOpenTab] = useState(0);

  const items = [
    {
      title: "Profile",
      element: "Profile",
    },
    {
      title: "Oder",
      element: "Oder",
    },
    {
      title: "Product",
      element: <ProductDashboard />,
    },
    {
      title: "Category",
      element: <CategoryDashboard />,
    },
    {
      title: "User",
      element: <UserDashboard />,
    },
  ];

  return (
    <>
      <div className="flex flex-wrap my-6">
        <div className="w-full md:flex">
          <ul
            className="flex list-none justify-between md:w-1/6 md:flex-col md:justify-start"
            role="tablist"
          >
            {items &&
              items.map((item, index) => (
                <li
                  className="w-[32%] md:my-1 md:w-[98%] text-center"
                  key={index}
                >
                  <a
                    className={
                      "text-xs font-bold uppercase px-5 py-3 shadow-lg border rounded block leading-normal " +
                      (openTab === index
                        ? "text-white bg-black"
                        : "text-black bg-white")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(index);
                    }}
                    data-toggle="tab"
                    href={`#${index}`}
                    role="tablist"
                  >
                    <i className="fas fa-space-shuttle text-base mr-1"></i>{" "}
                    {item.title}
                  </a>
                </li>
              ))}
          </ul>
          <div className="relative min-w-0 bg-white w-full md:w-5/6 mt-2 md:my-1 shadow-lg border rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                {items &&
                  items.map((item, index) => (
                    <div
                      className={openTab === index ? "block" : "hidden"}
                      id={index}
                      key={index}
                    >
                      {item.element}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuAdmin;
