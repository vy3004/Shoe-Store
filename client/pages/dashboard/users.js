import MenuAdmin from "@/components/MenuAdmin";
import Wrapper from "@/components/Wrapper";
import React from "react";

const Users = () => {
  return (
    <Wrapper>
      <div className="grid md:grid-cols-5 md:gap-5 my-5">
        <div>
          <MenuAdmin title="users" />
        </div>

        <div className="overflow-x-auto md:col-span-4 rounded-md shadow-md my-1 px-3">
          Users
        </div>
      </div>
    </Wrapper>
  );
};

Users.auth = { adminOnly: true };

export default Users;
