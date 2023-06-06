import CheckoutWizard from "@/components/CheckoutWizard";
import Wrapper from "@/components/Wrapper";
import { Store } from "@/utils/Store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

const Shipping = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  useEffect(() => {
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
  }, [setValue, shippingAddress]);

  const handleShippingAddress = ({
    fullName,
    address,
    city,
    postalCode,
    country,
  }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
        },
      })
    );

    router.push("/payment");
  };

  return (
    <Wrapper className="my-10">
      <CheckoutWizard activeStep={2} />
      <form
        onSubmit={handleSubmit(handleShippingAddress)}
        className="mx-auto max-w-screen-md md:w-[700px] py-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
      >
        <div className="mt-6 mb-10 text-[26px] font-bold">Shipping Address</div>
        <div className="relative">
          <input
            type="text"
            {...register("fullName", {
              required: "Please enter full name",
            })}
            className="peer placeholder-transparent h-9 mb-2 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-black"
            placeholder="Full Name"
            autoFocus
          />
          <label className="absolute left-0 -top-4 text-gray-600 text-sm font-bold peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:font-normal peer-placeholder-shown:top-2 transition-all peer-focus:-top-[18px] peer-focus:text-gray-600 peer-focus:text-sm peer-focus:font-bold">
            Full Name
          </label>
          {errors.fullName && (
            <div className="-mt-2 text-red-500 text-[14px]">
              {errors.fullName.message}
            </div>
          )}
        </div>

        <div className="relative">
          <input
            type="text"
            {...register("address", {
              required: "Please enter address",
              minLength: {
                value: 3,
                message: "Address is more than 2 characters",
              },
            })}
            className="peer placeholder-transparent h-9 mb-2 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-black"
            placeholder="Address"
          />
          <label className="absolute left-0 -top-4 text-gray-600 text-sm font-bold peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:font-normal peer-placeholder-shown:top-2 transition-all peer-focus:-top-[18px] peer-focus:text-gray-600 peer-focus:text-sm peer-focus:font-bold">
            Address
          </label>
          {errors.address && (
            <div className="-mt-2 text-red-500 text-[14px]">
              {errors.address.message}
            </div>
          )}
        </div>
        <div className="relative">
          <input
            type="text"
            {...register("city", {
              required: "Please enter city",
            })}
            className="peer placeholder-transparent h-9 mb-2 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-black"
            placeholder="City"
          />
          <label className="absolute left-0 -top-4 text-gray-600 text-sm font-bold peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:font-normal peer-placeholder-shown:top-2 transition-all peer-focus:-top-[18px] peer-focus:text-gray-600 peer-focus:text-sm peer-focus:font-bold">
            City
          </label>
          {errors.city && (
            <div className="-mt-2 text-red-500 text-[14px]">
              {errors.city.message}
            </div>
          )}
        </div>
        <div className="relative">
          <input
            type="text"
            {...register("postalCode", {
              required: "Please enter postal code",
            })}
            className="peer placeholder-transparent h-9 mb-2 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-black"
            placeholder="Postal Code"
          />
          <label className="absolute left-0 -top-4 text-gray-600 text-sm font-bold peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:font-normal peer-placeholder-shown:top-2 transition-all peer-focus:-top-[18px] peer-focus:text-gray-600 peer-focus:text-sm peer-focus:font-bold">
            Postal Code
          </label>
          {errors.postalCode && (
            <div className="-mt-2 text-red-500 text-[14px]">
              {errors.postalCode.message}
            </div>
          )}
        </div>
        <div className="relative">
          <input
            type="text"
            {...register("country", {
              required: "Please enter country",
            })}
            className="peer placeholder-transparent h-9 mb-2 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-black"
            placeholder="Country"
          />
          <label className="absolute left-0 -top-4 text-gray-600 text-sm font-bold peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:font-normal peer-placeholder-shown:top-2 transition-all peer-focus:-top-[18px] peer-focus:text-gray-600 peer-focus:text-sm peer-focus:font-bold">
            Country
          </label>
          {errors.country && (
            <div className="-mt-2 text-red-500 text-[14px]">
              {errors.country.message}
            </div>
          )}
        </div>
        <div className="relative">
          <button
            type="submit"
            className="w-full bg-black text-white rounded-md px-2 py-1 mt-4"
          >
            Next
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

Shipping.auth = true;

export default Shipping;
