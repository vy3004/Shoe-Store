import CheckoutWizard from "@/components/CheckoutWizard";
import Wrapper from "@/components/Wrapper";
import { Store } from "@/utils/Store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error("Payment method is required");
    }
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push("/order");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping");
    }
    setSelectedPaymentMethod(paymentMethod || "");
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <Wrapper className="my-10">
      <CheckoutWizard activeStep={3} />
      <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
        <div className="mt-6 mb-10 text-[26px] font-bold">Shipping Address</div>
        {["PayPal", "Cash On Delivery"].map((payment) => (
          <div key={payment} className="mb-4">
            <input
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              id={payment}
              type="radio"
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
            />

            <label className="p-2" htmlFor={payment}>
              {payment}
            </label>
          </div>
        ))}
        <div className="mb-4 flex justify-between">
          <button
            onClick={() => router.push("/shipping")}
            type="button"
            className="w-2/6 bg-black text-white rounded-md px-2 py-1 mt-4"
          >
            Back
          </button>
          <button
            type="submit"
            className="w-2/6 bg-black text-white rounded-md px-2 py-1 mt-4"
          >
            Next
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

Payment.auth = true;

export default Payment;
