"use client";

import { useUser } from "@/app/hooks/useUser";
import { theme } from "@/app/theme";
import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

interface CommentProps {
  id: number;
  data: any;
}

const Comment = ({ data, id }: CommentProps) => {
  return (
    <Box display="flex" gap={3} mt={2}>
      <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
        {data.user.name.charAt(0)}
      </Avatar>
      <Box flex={1}>
        <Box
          p={2}
          borderRadius={1.5}
          bgcolor={theme.palette.grey[200]}
          display="inline-block"
        >
          <Typography fontWeight={600} mb={0.5}>
            {data.user.id === id ? "You" : data.user.name}
          </Typography>
          <Typography>{data.comment}</Typography>
        </Box>
        <Box display="flex" gap={2} mt={0.5}>
          <Typography color={theme.palette.grey[600]}>30 minute</Typography>
          <Typography color={theme.palette.grey[600]} fontWeight={600}>
            Like
          </Typography>
          <Typography color={theme.palette.grey[600]} fontWeight={600}>
            Relpy
          </Typography>
          <Typography color={theme.palette.grey[600]} fontWeight={600}>
            Share
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Comment;
