"use client";

import React from "react";
import RightSidebar from "./section/right-sidebar";
import MainContent from "./section/main-content";
import { theme } from "@/app/theme";
import { useMediaQuery } from "@mui/material";

const HomePage = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <MainContent sx={{ flex: 1 }} />
      {!isMobile && <RightSidebar width={400} />}
    </>
  );
};

export default HomePage;
