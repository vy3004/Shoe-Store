import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BASE_URL}category/create-category`, {
        name,
        description,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        //getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in input form");
    }
  };

  return (
    <div>
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
            autoFocus
            required
          />
          <label className="absolute left-0 -top-4 text-gray-600 text-sm font-bold peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:font-normal peer-placeholder-shown:top-2 transition-all peer-focus:-top-[18px] peer-focus:text-gray-600 peer-focus:text-sm peer-focus:font-bold">
            Name
          </label>
        </div>
        <div className="relative">
          <input
            autoComplete="off"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="peer placeholder-transparent h-9 mb-2 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-black"
            placeholder="Description"
            required
          />
          <label className="absolute left-0 -top-4 text-gray-600 text-sm font-bold peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:font-normal peer-placeholder-shown:top-2 transition-all peer-focus:-top-[18px] peer-focus:text-gray-600 peer-focus:text-sm peer-focus:font-bold">
            Description
          </label>
        </div>

        <div className="relative">
          <button className="w-full bg-black text-white font-bold rounded-md px-2 py-1 mt-4 mb-2">
            Sign In
          </button>
        </div>
        <div className="relative flex items-center justify-center w-full border border-t">
          <div className="absolute px-5 bg-white text-[14px]">Or</div>
        </div>
        <div className="relative">
          <button className="w-full bg-white text-black border rounded-md px-2 py-1 mt-2">
            Sign In with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
