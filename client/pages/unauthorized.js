import Wrapper from "@/components/Wrapper";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Unauthorized = () => {
  const router = useRouter();
  const { message } = router.query;
  console.log(message);
  return (
    <div className="min-h-[650px] flex items-center">
      <Wrapper>
        <div className="max-w-[600px] rounded-lg p-5 border border-black mx-auto flex flex-col">
          <div className="text-2xl font-bold">Access Denied!</div>
          <div className="text-lg font-bold mt-2 capitalize">{message}</div>
          <div className="text-base mt-5">
            For any product related query, drop an email to
          </div>
          <div className="underline">shoeshopcontact@shop.com</div>

          <Link href="/auth/login" className="font-bold mt-5">
            Login here!
          </Link>
        </div>
      </Wrapper>
    </div>
  );
};

export default Unauthorized;
