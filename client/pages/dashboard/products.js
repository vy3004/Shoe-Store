import Wrapper from "@/components/Wrapper";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useReducer } from "react";
import { getError } from "../../utils/error";
import { toast } from "react-toastify";
import axios from "axios";
import { BsEye, BsSearch } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Image from "next/image";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreate: false };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false };
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true };
    case "DELETE_SUCCESS":
      return { ...state, loadingDelete: false, successDelete: true };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };

    default:
      state;
  }
}

const Products = () => {
  const router = useRouter();

  const [
    { loading, error, products, loadingCreate, successDelete, loadingDelete },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    products: [],
    error: "",
  });

  const createHandler = async () => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await axios.post(`/api/dashboard/products`);
      dispatch({ type: "CREATE_SUCCESS" });
      toast.success("Product created successfully");
      router.push(`/dashboard/product/${data.product._id}`);
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/dashboard/products`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [successDelete]);

  const deleteHandler = async (productId) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    try {
      dispatch({ type: "DELETE_REQUEST" });
      await axios.delete(`/api/dashboard/products/${productId}`);
      dispatch({ type: "DELETE_SUCCESS" });
      toast.success("Product deleted successfully");
    } catch (err) {
      dispatch({ type: "DELETE_FAIL" });
      toast.error(getError(err));
    }
  };
  return (
    <Wrapper>
      <div className="grid md:grid-cols-4 md:gap-5">
        <div>
          <ul>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/dashboard/orders">Orders</Link>
            </li>
            <li>
              <Link href="/dashboard/products" className="font-bold">
                Products
              </Link>
            </li>
            <li>
              <Link href="/dashboard/users">Users</Link>
            </li>
          </ul>
        </div>
        <div className="overflow-x-auto md:col-span-3">
          <div className="flex justify-between">
            <h1 className="mb-4 text-xl">Products</h1>
            {loadingDelete && <div>Deleting item...</div>}
            <button
              disabled={loadingCreate}
              onClick={createHandler}
              className="primary-button"
            >
              {loadingCreate ? "Loading" : "Create"}
            </button>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="relative overflow-x-auto sm:rounded-lg">
              <p className="text-xl font-bold my-5">All Products</p>
              <div className="flex items-center justify-between pb-4">
                <div>
                  <Link
                    href="/dashboard/product/create-product"
                    className="border border-gray-300 rounded-lg px-3 py-1.5 font-semibold hover:bg-black hover:text-white"
                  >
                    New Product
                  </Link>
                </div>
                <label htmlFor="table-search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <BsSearch className="text-gray-500" />
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
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products.map((product) => (
                      <tr
                        key={product._id}
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
                            src={product.image}
                            alt={product.name}
                          />
                          {product.name}
                        </th>
                        <td className="px-6 py-4">{product.category}</td>
                        <td className="px-6 py-4">{product.countInStock}</td>
                        <td className="px-6 py-4">${product.price}</td>
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
                className="flex items-center justify-between py-4"
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
                      <MdArrowBackIos className="text-[20px]" />
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
                      <MdArrowForwardIos className="text-[20px]" />
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            // <div className="overflow-x-auto">
            //   <table className="min-w-full">
            //     <thead className="border-b">
            //       <tr>
            //         <th className="px-5 text-left">ID</th>
            //         <th className="p-5 text-left">NAME</th>
            //         <th className="p-5 text-left">PRICE</th>
            //         <th className="p-5 text-left">CATEGORY</th>
            //         <th className="p-5 text-left">COUNT</th>
            //         <th className="p-5 text-left">RATING</th>
            //         <th className="p-5 text-left">ACTIONS</th>
            //       </tr>
            //     </thead>
            //     <tbody>
            //       {products.map((product) => (
            //         <tr key={product._id} className="border-b">
            //           <td className=" p-5 ">{product._id.substring(20, 24)}</td>
            //           <td className=" p-5 ">{product.name}</td>
            //           <td className=" p-5 ">${product.price}</td>
            //           <td className=" p-5 ">{product.category}</td>
            //           <td className=" p-5 ">{product.countInStock}</td>
            //           <td className=" p-5 ">{product.rating}</td>
            //           <td className=" p-5 ">
            //             <Link
            //               href={`/admin/product/${product._id}`}
            //               type="button"
            //               className="default-button"
            //             >
            //               Edit
            //             </Link>
            //             &nbsp;
            //             <button
            //               onClick={() => deleteHandler(product._id)}
            //               className="default-button"
            //               type="button"
            //             >
            //               Delete
            //             </button>
            //           </td>
            //         </tr>
            //       ))}
            //     </tbody>
            //   </table>
            // </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

Products.auth = { adminOnly: true };

export default Products;
