"use client";

import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <Box
      display="grid"
      sx={{ placeItems: "center" }}
      minHeight="100vh"
      width="100%"
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
