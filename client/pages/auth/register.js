import publicClient from "@/configs/publicClient.js";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router.js";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const register = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const handleSignUp = async ({ name, email, password }) => {
    try {
      const response = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      if (response.data.message) toast.success(response.data.message);

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) toast.error(result.error);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-[50vh] md:min-h-[80vh] bg-gray-100 py-3 flex flex-col justify-center sm:py-6">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-200 to-black shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative p-2 bg-white shadow-lg sm:rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <form
                onSubmit={handleSubmit(handleSignUp)}
                className="sm:w-[300px] md:w-[350px] py-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
              >
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    {...register("name", {
                      required: "Please enter name",
                    })}
                    className="peer placeholder-transparent h-9 mb-2 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-black"
                    placeholder="Name"
                    autoFocus
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-0 -top-4 text-gray-600 text-sm font-bold peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:font-normal peer-placeholder-shown:top-2 transition-all peer-focus:-top-[18px] peer-focus:text-gray-600 peer-focus:text-sm peer-focus:font-bold"
                  >
                    Name
                  </label>
                  {errors.name && (
                    <div className="-mt-2 text-red-500 text-[14px]">
                      {errors.name.message}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <input
                    id="email"
                    type="text"
                    {...register("email", {
                      required: "Please enter email",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i,
                        message: "Please enter valid email",
                      },
                    })}
                    className="peer placeholder-transparent h-9 mb-2 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-black"
                    placeholder="Email"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-4 text-gray-600 text-sm font-bold peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:font-normal peer-placeholder-shown:top-2 transition-all peer-focus:-top-[18px] peer-focus:text-gray-600 peer-focus:text-sm peer-focus:font-bold"
                  >
                    Email
                  </label>
                  {errors.email && (
                    <div className="-mt-2 text-red-500 text-[14px]">
                      {errors.email.message}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    {...register("password", {
                      required: "Please enter password",
                      minLength: {
                        value: 8,
                        message: "Password is more than 8 characters",
                      },
                    })}
                    className="peer placeholder-transparent h-9 mb-2 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-black"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-4 text-gray-600 text-sm font-bold peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:font-normal peer-placeholder-shown:top-2 transition-all peer-focus:-top-[18px] peer-focus:text-gray-600 peer-focus:text-sm peer-focus:font-bold"
                  >
                    Password
                  </label>
                  {errors.password && (
                    <div className="-mt-2 text-red-500 text-[14px]">
                      {errors.password.message}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword", {
                      required: "Please enter confirm password",
                      validate: (value) => value === getValues("password"),
                      minLength: {
                        value: 8,
                        message: "Confirm password is more than 8 characters",
                      },
                    })}
                    className="peer placeholder-transparent h-9 mb-2 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-black"
                    placeholder="Phone"
                  />
                  <label
                    htmlFor="confirmPassword"
                    className="absolute left-0 -top-4 text-gray-600 text-sm font-bold peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:font-normal peer-placeholder-shown:top-2 transition-all peer-focus:-top-[18px] peer-focus:text-gray-600 peer-focus:text-sm peer-focus:font-bold"
                  >
                    Confirm Password
                  </label>
                  {errors.confirmPassword && (
                    <div className="-mt-2 text-red-500 text-[14px]">
                      {errors.confirmPassword.message}
                    </div>
                  )}
                  {errors.confirmPassword &&
                    errors.confirmPassword.type === "validate" && (
                      <div className="-mt-2 text-red-500 text-[14px]">
                        Password do not match
                      </div>
                    )}
                </div>
                <div className="relative">
                  <button
                    type="submit"
                    className="w-full bg-black text-white rounded-md px-2 py-1 mt-4"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default register;
