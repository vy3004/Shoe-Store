import MenuAdmin from "@/components/MenuAdmin";
import Wrapper from "@/components/Wrapper";
import React from "react";

const Orders = () => {
  return (
    <Wrapper>
      <div className="grid md:grid-cols-5 md:gap-5 my-5">
        <div>
          <MenuAdmin title="orders" />
        </div>

        <div className="overflow-x-auto md:col-span-4 rounded-md shadow-md my-1 px-3">
          Orders
        </div>
      </div>
    </Wrapper>
  );
};

Orders.auth = { adminOnly: true };

export default Orders;
