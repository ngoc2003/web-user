"use client";

import React from "react";
import RightSidebar from "./section/right-sidebar";
import MainContent from "./section/main-content";
import { theme } from "@/app/theme";
import { useMediaQuery } from "@mui/material";
import CreatePostModal from "@/app/components/modal/CreatePostModal";
import { useCreatePostModal } from "@/app/hooks/useCreatePostModal";
import UpdatePostModal from "@/app/components/modal/UpdatePostModal";
import { useUpdatePostModal } from "@/app/hooks/useUpdatePostModal";

const HomePage = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const updatePost = useUpdatePostModal();

  return (
    <>
      <MainContent sx={{ flex: 1 }} />
      {!isMobile && <RightSidebar width={320} />}
      <UpdatePostModal
        onClose={() => updatePost.onClose()}
        open={updatePost.isOpen}
      />
    </>
  );
};

export default HomePage;
