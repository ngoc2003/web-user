"use client";

import { theme } from "@/app/theme";
import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

interface NameWithAvatarProps {
  name: string;
}

const NameWithAvatar = ({ name }: NameWithAvatarProps) => {
  return (
    <Box display="flex" alignItems="center" px={2} pb={2}>
      <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
        {name.charAt(0)}
      </Avatar>
      <Typography ml={1.5} fontWeight={600}>
        {name}
      </Typography>
    </Box>
  );
};

export default NameWithAvatar;
