import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    !user && router.push("/login");
  });

  return user && "dashboard";
};

export default dashboard;
