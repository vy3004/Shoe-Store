import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import publicClient from "@/configs/publicClient.js";
import { useAuth } from "../../context/auth.js";
import Link from "next/link.js";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const router = useRouter();
  // const [auth, setAuth] = useAuth();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const data = await publicClient.post("auth/login", {
  //       email,
  //       password,
  //     });
  //     if (data && data.success) {
  //       toast.success(data && data.message);
  //       setAuth({
  //         ...auth,
  //         user: data.user,
  //         token: data.token,
  //       });
  //       localStorage.setItem("auth", JSON.stringify(data));
  //       router.pathname !== "/auth/login" ? router : router.push("/");
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something went wrong");
  //   }
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
    formState: { errors },
  } = useForm();

  const handlerLogin = async ({ email, password }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
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
                onSubmit={handleSubmit(handlerLogin)}
                className="sm:w-[300px] md:w-[350px] py-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
              >
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
                    autoFocus
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
                        value: 6,
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
                  <button className="w-full bg-black text-white font-bold rounded-md px-2 py-1 mt-4 mb-2">
                    Sign In
                  </button>
                </div>
                <div className="relative">
                  Don't have an account? &nbsp;
                  <Link href={`/auth/register?redirect=${redirect || "/"}`}>
                    Register
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
