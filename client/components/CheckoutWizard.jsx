import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { FaRegAddressCard } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { IoBagCheckOutline } from "react-icons/io5";
import Link from "next/link";

const CheckoutWizard = ({ activeStep = 0 }) => {
  const steps = [
    {
      title: "User Information",
      icon: <BsPerson />,
      link: "/auth/login",
    },
    {
      title: "Shipping Address",
      icon: <FaRegAddressCard />,
      link: "/shipping",
    },
    {
      title: "Payment Method",
      icon: <MdOutlinePayment />,
      link: "/payment",
    },
    {
      title: "Place Order",
      icon: <IoBagCheckOutline />,
      link: "/order",
    },
  ];

  console.log(activeStep);

  return (
    <div className="flex items-center w-full">
      {steps &&
        steps.map((step, index) => (
          <div
            key={index}
            className={`flex w-full items-center text-white ${
              index + 1 < activeStep && "after:border-black"
            } after:content-[''] last:after:content-none after:w-full after:h-1 after:border-b after:border-4 after:inline-block`}
          >
            <Link
              href={step.link}
              className={`flex items-center justify-center h-10 px-4 
              ${
                index < activeStep ? "bg-black" : "bg-gray-200 text-black"
              } rounded-full lg:h-12 shrink-0`}
            >
              {index + 1 < activeStep ? <AiOutlineCheck /> : step.icon}
              <span className="ml-1 hidden md:flex">{step.title}</span>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default CheckoutWizard;
