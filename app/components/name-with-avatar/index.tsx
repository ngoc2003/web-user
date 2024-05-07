"use client";

import { theme } from "@/app/theme";
import { Avatar, Box, BoxProps, Typography } from "@mui/material";
import { omit } from "lodash";
import React, { ReactNode } from "react";

interface NameWithAvatarProps extends BoxProps {
  name: string;
  subText?: string | ReactNode;
}

const NameWithAvatar = ({ name, subText, ...props }: NameWithAvatarProps) => {
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
      <Box display="flex">
        <Typography mx={1.5} fontWeight={600}>
          {name}
        </Typography>
        {!!subText && (
          <Typography mr={1.5} fontWeight={400} color={theme.palette.grey[600]}>
            {subText}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default NameWithAvatar;
