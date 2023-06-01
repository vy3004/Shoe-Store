import Image from "next/image";
import React from "react";
import { BiEdit } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";

const CategoryDashboard = () => {
  const items = [
    {
      id: 1,
      name: "Product 1",
      image: "/product-1.webp",
      description: "Jordan",
    },
    {
      id: 2,
      name: "Product 2",
      image: "/product-1.webp",
      description: "Jordan",
    },
    {
      id: 3,
      name: "Product 3",
      image: "/product-1.webp",
      description: "Jordan",
    },
    {
      id: 4,
      name: "Product 4",
      image: "/product-1.webp",
      description: "Jordan",
      price: 900,
      quantity: 10,
    },
    {
      id: 5,
      name: "Product 5",
      image: "/product-1.webp",
      description: "Jordan",
    },
    {
      id: 6,
      name: "Product 6",
      image: "/product-1.webp",
      description: "Jordan",
    },
    {
      id: 7,
      name: "Product 7",
      image: "/product-1.webp",
      description: "Jordan",
    },
    {
      id: 8,
      name: "Product 8",
      image: "/product-1.webp",
      description: "Jordan",
    },
    {
      id: 9,
      name: "Product 9",
      image: "/product-1.webp",
      description: "Jordan",
    },
    {
      id: 10,
      name: "Product 10",
      image: "/product-1.webp",
      description: "Jordan",
    },
  ];

  return (
    <div>
      <div className="relative overflow-x-auto sm:rounded-lg">
        <p className="text-xl font-bold my-5">All Categories</p>
        <div className="flex items-center justify-between pb-4">
          <div>
            <button className="border border-gray-300 rounded-lg px-3 py-1.5 font-semibold hover:bg-black hover:text-white">
              New Category
            </button>
          </div>
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for items"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left text-black">
          <thead className="text-xs text-black uppercase bg-gray-50">
            <tr>
              <th scope="col" className="p-4">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 bg-gray-700 border-black rounded"
                />
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {items &&
              items.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="w-4 p-4">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 bg-gray-700 border-black rounded"
                    />
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 flex items-center font-bold text-gray-900 whitespace-nowrap"
                  >
                    <Image
                      className="rounded-lg mr-2"
                      width={40}
                      height={40}
                      src={item.image}
                      alt={item.name}
                    />
                    {item.name}
                  </th>
                  <td className="px-6 py-4">{item.description}</td>
                  <td className="px-6 py-4">
                    <div className="h-full flex items-center justify-between">
                      <button>
                        <BsEye className="text-[22px] hover:text-green-500" />
                      </button>
                      <button>
                        <BiEdit className="text-[22px] hover:text-yellow-500" />
                      </button>
                      <button>
                        <RiDeleteBin6Line className="text-[21px] hover:text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <nav
          className="flex items-center justify-between pt-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500">
            Showing
            <span className="font-semibold text-black"> 1-10 </span>
            of
            <span className="font-semibold text-black"> 1000 </span>
          </span>
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <a
                href="#"
                className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                ...
              </a>
            </li>
            <li>
              <a
                href="#"
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                100
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CategoryDashboard;
