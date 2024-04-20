"use client";

import { useLikeComment, useUnlikeComment } from "@/app/services/comment";
import { theme } from "@/app/theme";
import { ExtendedCommentType } from "@/app/types/user";
import { Avatar, Box, Typography } from "@mui/material";
import { formatDistance } from "date-fns";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface CommentProps {
  id: number;
  data: ExtendedCommentType;
  isLike: boolean;
}

const Comment = ({ data, id, isLike }: CommentProps) => {
  const [like, setLike] = useState<boolean>(isLike);
  const { mutate: likeComment, isLoading: isLikeCommentLoading } =
    useLikeComment();
  const { mutate: unlikeComment, isLoading: isUnlikeCommentLoading } =
    useUnlikeComment();

  const handleLike = () => {
    likeComment(id, {
      onSuccess: () => {
        toast.success("Like successfully.");
        setLike(true);
      },
    });
  };
  const handleUnlike = () => {
    unlikeComment(id, {
      onSuccess: () => {
        toast.success("Unlike successfully.");
        setLike(false);
      },
    });
  };

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
          maxWidth={900}
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
          <Typography
            color={like ? theme.palette.primary.main : theme.palette.grey[600]}
            fontWeight={600}
            sx={{ cursor: "pointer" }}
            onClick={
              isLikeCommentLoading || isUnlikeCommentLoading
                ? undefined
                : like
                ? handleUnlike
                : handleLike
            }
          >
            Like
          </Typography>
          {/* <Typography color={theme.palette.grey[600]} fontWeight={600}>
            Reply
          </Typography>
          <Typography color={theme.palette.grey[600]} fontWeight={600}>
            Share
          </Typography> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Comment;
