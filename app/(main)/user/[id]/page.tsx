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

const UserProfilePage = () => {
  const { id } = useParams();
  const data = useGetUserInfoById(+id);
  const user = data?.data?.data;
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { isOpen, onClose } = useCreatePetModal();

  if (!id || !user) return null;

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

      <CreatePetModal open={isOpen} onClose={onClose} />
    </>
  );
};

export default UserProfilePage;
