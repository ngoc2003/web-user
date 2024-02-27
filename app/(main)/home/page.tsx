"use client";

import React from "react";
import { Box } from "@mui/material";
import LeftSideBar from "../_components/left-sidebar";
import RightSidebar from "../_components/right-sidebar";
import MainContent from "../_components/main-content";
import { theme } from "@/app/theme";
import { useToggleMobileSidebarLeft } from "@/app/hooks/useToggleMobileSidebarLeft";
import { useMediaQuery } from "@mui/material";
import Layer from "@/app/components/layer";

const HomePage = () => {
  const toggleSidebarLeft = useToggleMobileSidebarLeft();
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isMiniMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box display="flex" height="100%" maxWidth={1920} mx="auto">
      <Layer
        isShow={isTablet && toggleSidebarLeft.isOpen}
        onClick={toggleSidebarLeft.onToggle}
      />
      <LeftSideBar
        flex={0.3}
        minWidth={220}
        sx={{
          [theme.breakpoints.down("lg")]: {
            position: "fixed",
            top: 0,
            bottom: 0,
            transition: "0.1s",
            bgcolor: theme.palette.common.white,
            zIndex: 3,
            pt: 10,
            boxShadow: "0px 1px 1px rgba(0,0,0,0.25)",
            width: isMiniMobile ? "100%" : "50%",
            ...(toggleSidebarLeft.isOpen ? { left: 0 } : { left: "-100%" }),
          },
        }}
      />
      <MainContent sx={{ flex: 1 }} />
      {!isMobile && <RightSidebar width={320} />}
    </Box>
  );
};

export default HomePage;
