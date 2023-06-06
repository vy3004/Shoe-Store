import CheckoutWizard from "@/components/CheckoutWizard";
import Wrapper from "@/components/Wrapper";
import React from "react";

const Order = () => {
  return (
    <Wrapper className="my-10">
      <CheckoutWizard activeStep={3} />
      Order
    </Wrapper>
  );
};

Order.auth = true;

export default Order;
