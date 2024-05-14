"use client";
import { useGetUserInfoById } from "@/app/services/user";
import { useMediaQuery } from "@mui/material";
import { useParams } from "next/navigation";
import React from "react";
import UserProfileMainContent from "./section/main-content";
import SideContent from "./section/side-content";
import { theme } from "@/app/theme";
import { useUser } from "@/app/hooks/useUser";

const UserProfilePage = () => {
  const { id } = useParams();
  const data = useGetUserInfoById(+id);
  const user = data?.data?.data;
  const { user: currentUser } = useUser();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  if (!id || !user || !currentUser) return null;

  return (
    <>
      <UserProfileMainContent user={user} flex={1} />

      {!isMobile && (
        <SideContent
          followers={user.followers}
          followings={user.following}
          pets={user.pets}
          width={442}
        />
      )}
    </>
  );
};

export default UserProfilePage;
