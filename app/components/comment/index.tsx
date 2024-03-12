"use client";

import { ExtendedCommentType } from "@/app/api/comment";
import { theme } from "@/app/theme";
import { Avatar, Box, Typography } from "@mui/material";
import { formatDistance } from "date-fns";
import React from "react";

interface CommentProps {
  id: number;
  data: ExtendedCommentType;
}

const Comment = ({ data, id }: CommentProps) => {
  return (
    <Box display="flex" gap={2} mt={2}>
      <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
        {data.user.name.charAt(0)}
      </Avatar>
      <Box flex={1}>
        <Box
          py={1}
          px={1.5}
          borderRadius={4}
          bgcolor={theme.palette.grey[200]}
          display="inline-block"
        >
          <Typography fontWeight={600} mb={0.25}>
            {data.user.id === id ? "You" : data.user.name}
          </Typography>
          <Typography>{data.content}</Typography>
        </Box>
        <Box display="flex" gap={2} mt={0.5} ml={1}>
          <Typography color={theme.palette.grey[600]}>
            {formatDistance(new Date(data.created_at), new Date(), {
              addSuffix: true,
            })}
          </Typography>
          <Typography color={theme.palette.grey[600]} fontWeight={600}>
            Like
          </Typography>
          <Typography color={theme.palette.grey[600]} fontWeight={600}>
            Reply
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
