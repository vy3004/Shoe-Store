import MenuAdmin from "@/components/MenuAdmin";
import Wrapper from "@/components/Wrapper";
import { getError } from "@/utils/error";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineDashboard } from "react-icons/md";
import { toast } from "react-toastify";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "SUBMIT_REQUEST":
      return { ...state, loadingSubmit: true, errorSubmit: "" };
    case "SUBMIT_SUCCESS":
      return { ...state, loadingSubmit: false, errorSubmit: "" };
    case "SUBMIT_FAIL":
      return { ...state, loadingSubmit: false, errorSubmit: action.payload };
  }
}

const ProductInfo = () => {
  const { query } = useRouter();
  const productId = query.id;
  const [image, setImage] = useState("");
  const [{ loading, error, loadingSubmit }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(
          `/api/dashboard/products/${productId}`
        );
        console.log("CHECK", data);
        if (data) {
          dispatch({ type: "FETCH_SUCCESS" });
          setValue("name", data.name);
          setValue("slug", data.slug);
          setValue("price", data.price);
          setImage(data.image);
          setValue("category", data.category);
          setValue("brand", data.brand);
          setValue("countInStock", data.countInStock);
          setValue("description", data.description);
        }
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
        console.log("FETCH ERROR");
      }
    };

    if (productId !== "new-product") {
      fetchData();
    } else {
      dispatch({ type: "FETCH_SUCCESS" });
    }
  }, [productId, setValue]);

  const router = useRouter();

  const covertToBase64 = (e) => {
    console.log("IMAGE", e);
    let reader = new FileReader();
    if (reader) reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("ERROR", error);
    };
  };

  const createHandle = async ({
    name,
    slug,
    price,
    category,
    brand,
    countInStock,
    description,
  }) => {
    console.log("TEST IMAGE", image);
    try {
      dispatch({ type: "SUBMIT_REQUEST" });
      await axios.post(`/api/dashboard/products`, {
        name,
        slug,
        price,
        category,
        image,
        brand,
        countInStock,
        description,
      });
      dispatch({ type: "SUBMIT_SUCCESS" });
      toast.success("Product created successfully");
      router.push("/dashboard/products");
    } catch (err) {
      dispatch({ type: "SUBMIT_FAIL", payload: getError(err) });
      toast.error(getError(err));
    }
  };

  const updateHandler = async ({
    name,
    slug,
    price,
    category,
    brand,
    countInStock,
    description,
  }) => {
    try {
      dispatch({ type: "SUBMIT_REQUEST" });
      await axios.put(`/api/dashboard/products/${productId}`, {
        name,
        slug,
        price,
        category,
        image,
        brand,
        countInStock,
        description,
      });
      dispatch({ type: "SUBMIT_SUCCESS" });
      toast.success("Product updated successfully");
      router.push("/dashboard/products");
    } catch (err) {
      dispatch({ type: "SUBMIT_FAIL", payload: getError(err) });
      toast.error(getError(err));
    }
  };

  return (
    <Wrapper>
      <div className="grid md:grid-cols-5 md:gap-5 my-5">
        <div>
          <MenuAdmin title="products" />
        </div>
        <div className="md:col-span-4 rounded-md shadow-md my-1">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <form
              className="max-w-screen-md md:mx-auto mx-2"
              onSubmit={handleSubmit(
                productId === "new-product" ? createHandle : updateHandler
              )}
            >
              <div className="mb-4 text-xl font-semibold mt-3">
                {productId === "new-product"
                  ? "New Product"
                  : `Edit Product ${productId}`}
              </div>
              <div className="mb-4">
                <label className="font-semibold" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full h-8 border rounded-md"
                  id="name"
                  {...register("name", {
                    required: "Please enter name",
                  })}
                />
                {errors.name && (
                  <div className="text-red-500">{errors.name.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label className="font-semibold" htmlFor="slug">
                  Slug
                </label>
                <input
                  type="text"
                  className="w-full h-8 border rounded-md"
                  id="slug"
                  {...register("slug", {
                    required: "Please enter slug",
                  })}
                />
                {errors.slug && (
                  <div className="text-red-500">{errors.slug.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label className="font-semibold" htmlFor="price">
                  Price
                </label>
                <input
                  type="text"
                  className="w-full h-8 border rounded-md"
                  id="price"
                  {...register("price", {
                    required: "Please enter price",
                  })}
                />
                {errors.price && (
                  <div className="text-red-500">{errors.price.message}</div>
                )}
              </div>

              <div className="mb-4">
                <label className="font-semibold" htmlFor="imageFile">
                  Upload image
                </label>
                {image == "" ||
                  (image === null ? (
                    ""
                  ) : (
                    <Image
                      className="my-2 rounded-md"
                      width={500}
                      height={500}
                      src={image}
                      alt="image"
                    />
                  ))}
                <input
                  type="file"
                  className="w-full h-8 border rounded-md"
                  id="imageFile"
                  multiple
                  onChange={covertToBase64}
                />
              </div>
              <div className="mb-4">
                <label className="font-semibold" htmlFor="category">
                  category
                </label>
                <input
                  type="text"
                  className="w-full h-8 border rounded-md"
                  id="category"
                  {...register("category", {
                    required: "Please enter category",
                  })}
                />
                {errors.category && (
                  <div className="text-red-500">{errors.category.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label className="font-semibold" htmlFor="brand">
                  brand
                </label>
                <input
                  type="text"
                  className="w-full h-8 border rounded-md"
                  id="brand"
                  {...register("brand", {
                    required: "Please enter brand",
                  })}
                />
                {errors.brand && (
                  <div className="text-red-500">{errors.brand.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label className="font-semibold" htmlFor="countInStock">
                  countInStock
                </label>
                <input
                  type="text"
                  className="w-full h-8 border rounded-md"
                  id="countInStock"
                  {...register("countInStock", {
                    required: "Please enter countInStock",
                  })}
                />
                {errors.countInStock && (
                  <div className="text-red-500">
                    {errors.countInStock.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label className="font-semibold" htmlFor="countInStock">
                  description
                </label>
                <textarea
                  rows={6}
                  className="w-full border rounded-md"
                  id="description"
                  {...register("description", {
                    required: "Please enter description",
                  })}
                />
                {errors.description && (
                  <div className="text-red-500">
                    {errors.description.message}
                  </div>
                )}
              </div>
              <div className="mb-4 flex">
                <button className="w-24 h-10 mr-4 border border-gray-300 rounded-lg px-3 py-2 font-semibold hover:bg-black hover:text-white">
                  <Link href={`/dashboard/products`}>Back</Link>
                </button>

                <button
                  disabled={loadingSubmit}
                  className="w-24 h-10 border border-gray-300 rounded-lg px-3 py-2 font-semibold hover:bg-black hover:text-white"
                >
                  {loadingSubmit ? "Loading" : "Submit"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

ProductInfo.auth = { adminOnly: true };

export default ProductInfo;
