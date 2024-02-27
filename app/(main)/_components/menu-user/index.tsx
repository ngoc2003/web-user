"use client";

import { theme } from "@/app/theme";
import { ExtendedUserType } from "@/app/types/user";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface MenuUserProps {
  user: ExtendedUserType;
}

const MenuUser = ({ user }: MenuUserProps) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = !!anchorEl;
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    signOut();
    router.push("/auth");
  };
  return (
    <Box>
      <IconButton onClick={handleClick}>
        <Avatar alt="avatar" sx={{ bgcolor: theme.palette.primary.light }}>
          {user.name.charAt(0)}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box px={2} py={1}>
          <Typography fontWeight={500}>{user.name}</Typography>
          <Typography color={theme.palette.grey[600]}>{user.email}</Typography>
        </Box>
        <Divider sx={{ mb: 1, mt: 0 }} />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <Typography>Setting</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <Typography>Profile</Typography>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={() => {
            handleLogout();
            handleClose();
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <Typography>Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default MenuUser;
