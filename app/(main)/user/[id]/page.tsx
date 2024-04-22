"use client";
import { useGetUserInfoById } from "@/app/services/user";
import { Box, useMediaQuery } from "@mui/material";
import { useParams } from "next/navigation";
import React from "react";
import UserProfileMainContent from "./section/main-content";
import SideContent from "./section/side-content";
import { theme } from "@/app/theme";
import CreatePetModal from "@/app/components/modal/CreatePetModal";
import { useCreatePetModal } from "@/app/hooks/useCreatePetModal";
import { useEditProfileModal } from "@/app/hooks/useEditProfileModal";
import EditProfileModal from "@/app/components/modal/EditProfileModal";
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
