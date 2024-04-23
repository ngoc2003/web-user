"use client";

import { useUser } from "@/app/hooks/useUser";
import { theme } from "@/app/theme";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import Image from "next/image";
import React from "react";
import MenuUser from "../menu-user";
import { useToggleMobileSidebarLeft } from "@/app/hooks/useToggleMobileSidebarLeft";
import SearchBox from "../search-box";

const Topbar = () => {
  const { user } = useUser();

  const toggleSidebarLeft = useToggleMobileSidebarLeft();
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  if (!user) {
    return null;
  }

  return (
    <Box bgcolor={theme.palette.common.white} py={2} px={2}>
      <Box
        maxWidth={1200}
        display="flex"
        width="100%"
        alignItems="center"
        marginX="auto"
      >
        {isTablet && (
          <IconButton
            onClick={() => toggleSidebarLeft.onToggle()}
            sx={{
              zIndex: 9999,
              color: theme.palette.common.black,
              bgcolor: theme.palette.common.white,
              mr: 3,
              ...(toggleSidebarLeft.isOpen && {
                boxShadow: "0px 0px 2px rgba(0,0,0,0.2)",
              }),
            }}
          >
            {!toggleSidebarLeft.isOpen ? (
              <Image alt="bar" src="/icons/bar.svg" width={24} height={24} />
            ) : (
              <Image alt="bar" src="/icons/xMark.svg" width={24} height={24} />
            )}
          </IconButton>
        )}

        {!isTablet && (
          <Image
            src="/noTextLogo.png"
            height={48}
            width={48}
            alt="Logo"
            style={{ marginRight: 18 }}
          />
        )}

        <Box
          flex={1}
          display="flex"
          justifyContent="right"
          alignItems="center"
        >
          <SearchBox />
          <IconButton sx={{ mx: 4 }}>
            <Image
              alt="notification"
              src="/icons/notification.svg"
              width={24}
              height={24}
            />
          </IconButton>
          <MenuUser user={user} />
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
