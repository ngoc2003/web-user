"use client";
import { useUser } from "@/app/hooks/useUser";
import { theme } from "@/app/theme";
import {
  Avatar,
  Box,
  BoxProps,
  Icon,
  MenuItem,
  MenuList,
  Portal,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import DoorBackIcon from "@mui/icons-material/DoorBack";
import VideocamIcon from "@mui/icons-material/Videocam";
import ClassIcon from "@mui/icons-material/Class";
import Image from "next/image";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import Invitation from "../invitation";
import NameWithAvatar from "@/app/components/name-with-avatar";
import { omit } from "lodash";
import { useToggleMobileSidebarLeft } from "@/app/hooks/useToggleMobileSidebarLeft";

const LIST_LINK = [
  {
    label: "Home",
    link: "/home",
    icon: DoorBackIcon,
  },
  {
    label: "My pet",
    link: "/home",
    icon: PetsOutlinedIcon,
  },
  {
    label: "Friends",
    link: "/home",
    icon: "/icons/friend.svg",
  },
  {
    label: "Knowledge",
    link: "/home",
    icon: ClassIcon,
  },
  {
    label: "Video",
    link: "/home",
    icon: VideocamIcon,
  },
];

interface LeftSideBarProps extends BoxProps {}

const LeftSideBar = (props: LeftSideBarProps) => {
  const { user } = useUser();
  const isMiniMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTiniMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const toggleSidebarLeft = useToggleMobileSidebarLeft();
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  if (!user) return;

  return (
    <>
      {isTablet && toggleSidebarLeft.isOpen && (
        <Box
          onClick={toggleSidebarLeft.onToggle}
          position="fixed"
          sx={{ bgcolor: "rgba(0,0,0,0.2)", inset: 0, zIndex: 1 }}
        />
      )}
      <Box
        height="100%"
        minWidth={220}
        display="flex"
        flexDirection="column"
        overflow="auto"
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
            width: isTiniMobile ? "100%" : "50%",
            ...(toggleSidebarLeft.isOpen ? { left: 0 } : { left: "-100%" }),
          },
          ...props?.sx,
        }}
        {...omit(props, ["sx"])}
      >
        {isMiniMobile && (
          <Box px={3}>
            <Invitation />
          </Box>
        )}
        {!isMiniMobile && <NameWithAvatar name={user.name} />}
        <MenuList sx={{ flex: 1 }}>
          {LIST_LINK.map((link) => (
            <MenuItem
              key={link.label}
              sx={{
                px: 3,
                py: 2,
              }}
            >
              {typeof link.icon === "string" ? (
                <Icon>
                  <Image
                    height={24}
                    width={24}
                    src={link.icon + ""}
                    alt="icon"
                  />
                </Icon>
              ) : (
                <Icon component={link.icon as any} />
              )}
              <Typography ml={2} fontWeight={500}>
                {link.label}
              </Typography>
            </MenuItem>
          ))}
        </MenuList>
        <Box p={3} textAlign="center">
          <Typography variant="footnote" color={theme.palette.grey[500]}>
            Copyright © 2024 Pet Connect. All Rights Reserved.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default LeftSideBar;
