import MenuAdmin from "@/components/MenuAdmin";
import Wrapper from "@/components/Wrapper";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Login from "./auth/login";

const dashboard = () => {
  const router = useRouter();
  const [auth, setAuth] = useAuth();

  // useEffect(() => {
  //   !auth.user && router.push("/login");
  // });

  return !auth.user ? (
    <Login />
  ) : auth.user.role ? (
    <Wrapper>
      <MenuAdmin />
    </Wrapper>
  ) : (
    <Wrapper>user</Wrapper>
  );
};

export default dashboard;
