"use client";
import { useGetUserInfoById } from "@/app/services/user";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import React from "react";
import UserProfileMainContent from "./section/main-content";
import SideContent from "./section/side-content";

const UserProfilePage = () => {
  const { id } = useParams();
  const data = useGetUserInfoById(+id);
  const user = data?.data?.data;

  if (!id || !user) return null;

  return (
    <>
      <UserProfileMainContent user={user} flex={1} />

      <SideContent pets={user.pets} width={320} />
    </>
  );
};

export default UserProfilePage;
