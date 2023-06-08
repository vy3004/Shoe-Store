import MenuAdmin from "@/components/MenuAdmin";
import Wrapper from "@/components/Wrapper";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Login from "../auth/login";
import axios from "axios";

const DashBoardAdmin = () => {
  return (
    <Wrapper>
      <div className="grid md:grid-cols-5 md:gap-5 my-5">
        <div>
          <MenuAdmin title="dashboard" />
        </div>

        <div className="overflow-x-auto md:col-span-4 rounded-md shadow-md my-1 px-3">
          dashboard
        </div>
      </div>
    </Wrapper>
  );
};

DashBoardAdmin.auth = { adminOnly: true };

export default DashBoardAdmin;
