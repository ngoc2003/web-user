"use client";

import { theme } from "@/app/theme";
import { Avatar, Box, BoxProps, Typography } from "@mui/material";
import { omit } from "lodash";
import React from "react";

interface NameWithAvatarProps extends BoxProps {
  name: string;
}

const NameWithAvatar = ({ name, ...props }: NameWithAvatarProps) => {
  return (
    <Box
      sx={{ cursor: "pointer", ...props?.sx }}
      display="flex"
      alignItems="center"
      px={2}
      pb={2}
      {...omit(props, ["sx"])}
    >
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
