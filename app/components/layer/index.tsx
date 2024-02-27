"use client";

import { Box } from "@mui/material";
import React from "react";

interface LayerProps {
  onClick: () => void;
  isShow?: boolean;
}

const Layer = ({ onClick, isShow = true }: LayerProps) => {
  if (!isShow) return;

  return (
    <Box
      onClick={onClick}
      position="fixed"
      sx={{ bgcolor: "rgba(0,0,0,0.2)", inset: 0, zIndex: 1 }}
    />
  );
};

export default Layer;
