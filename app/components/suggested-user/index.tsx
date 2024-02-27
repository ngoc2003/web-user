"use client";

import { theme } from "@/app/theme";
import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";

const SuggestedUser = () => {
  return (
    <Box
      mb={3}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box display="flex" alignItems="center">
        <Avatar sx={{ bgcolor: theme.palette.primary.light }}>N</Avatar>
        <Typography ml={2}>Harry James</Typography>
      </Box>
      <Button size="small" variant="contained" color="primary">
        Follow
      </Button>
    </Box>
  );
};

export default SuggestedUser;
