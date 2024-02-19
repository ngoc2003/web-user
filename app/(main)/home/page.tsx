"use client";

import { useUser } from "@/app/hooks/useUser";
import { Button } from "@mui/material";
import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  const { user, setInformation } = useUser();

  const handleLogout = () => {
    signOut();
    router.push("/");
  };
  console.log(user);

  return (
    <div>
      Home
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default HomePage;
