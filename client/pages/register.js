import axios from "../config/axios.js";
import Link from "next/link";
import { useRouter } from "next/router.js";
import React, { useState } from "react";
import { toast } from "react-toastify";

const register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const router = useRouter();

  // register function
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ name, email, password, phone, address });
    console.log(process.env.REACT_APP_BACKEND_URL);
    try {
      const data = await axios.post("/api/auth/register", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data && data.success) {
        toast.success(data && data.message);
        router.push("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
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
                onSubmit={handleSubmit}
                className="sm:w-[300px] md:w-[350px] py-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
              >
                <div className="relative">
                  <input
                    autoComplete="off"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="peer placeholder-transparent h-9 mb-2 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-black"
                    placeholder="Name"
                    required
                    autoFocus
                  />
                  <label className="absolute left-0 -top-4 text-gray-600 text-sm font-bold peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:font-normal peer-placeholder-shown:top-2 transition-all peer-focus:-top-[18px] peer-focus:text-gray-600 peer-focus:text-sm peer-focus:font-bold">
                    Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer placeholder-transparent h-9 mb-2 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-black"
                    placeholder="Email"
                  />
                  <label className="absolute left-0 -top-4 text-gray-600 text-sm font-bold peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:font-normal peer-placeholder-shown:top-2 transition-all peer-focus:-top-[18px] peer-focus:text-gray-600 peer-focus:text-sm peer-focus:font-bold">
                    Email
                  </label>
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="peer placeholder-transparent h-9 mb-2 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-black"
                    placeholder="Password"
                    required
                  />
                  <label className="absolute left-0 -top-4 text-gray-600 text-sm font-bold peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:font-normal peer-placeholder-shown:top-2 transition-all peer-focus:-top-[18px] peer-focus:text-gray-600 peer-focus:text-sm peer-focus:font-bold">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="peer placeholder-transparent h-9 mb-2 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-black"
                    placeholder="Phone"
                    required
                  />
                  <label className="absolute left-0 -top-4 text-gray-600 text-sm font-bold peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:font-normal peer-placeholder-shown:top-2 transition-all peer-focus:-top-[18px] peer-focus:text-gray-600 peer-focus:text-sm peer-focus:font-bold">
                    Phone
                  </label>
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="peer placeholder-transparent h-9 mb-2 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-black"
                    placeholder="Address"
                    required
                  />
                  <label className="absolute left-0 -top-4 text-gray-600 text-sm font-bold peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:font-normal peer-placeholder-shown:top-2 transition-all peer-focus:-top-[18px] peer-focus:text-gray-600 peer-focus:text-sm peer-focus:font-bold">
                    Address
                  </label>
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
