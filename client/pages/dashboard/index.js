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
      <MenuAdmin />
    </Wrapper>
  );
};

DashBoardAdmin.auth = { adminOnly: true };

export default DashBoardAdmin;
