"use client";

import { useLikePost, useUnlikePost } from "@/app/services/post";
import { Box, Icon, IconButton, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import TextsmsRoundedIcon from "@mui/icons-material/TextsmsRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import { theme } from "@/app/theme";
import { LikePostType } from "@/app/api/likePost";

interface ActionsProps {
  handleFocusInputComment: () => void;
  likes: LikePostType[];
  id: number;
  userId: number;
}

const Actions = ({
  handleFocusInputComment,
  likes,
  id,
  userId,
}: ActionsProps) => {
  const { mutate: likePost, isLoading: isLikePostLoading } = useLikePost();
  const { mutate: unlikePost, isLoading: isUnlikePostLoading } =
    useUnlikePost();
  const [like, setLike] = useState(!!likes.find((l) => l.user_id === userId));
  const handleLikePost = () => {
    likePost(id, {
      onSuccess: () => {
        toast.success("Like successfully.");
        setLike(true);
      },
    });
  };

  const handleUnlikePost = () => {
    unlikePost(id, {
      onSuccess: () => {
        toast.success("Unlike successfully.");
        setLike(false);
      },
    });
  };

  const POST_ACTIONS = useMemo(
    () => [
      {
        label: "Like",
        icon: PetsOutlinedIcon,
        color: !like ? "default" : "error",
        onClick: () => {
          !like ? handleLikePost() : handleUnlikePost();
        },
        loading: isLikePostLoading || isUnlikePostLoading,
      },
      {
        label: "Comment",
        icon: TextsmsRoundedIcon,
        color: "default",
        onClick: () => handleFocusInputComment(),
        loading: false,
      },
      {
        label: "Share",
        icon: ShareRoundedIcon,
        color: "default",
        onClick: () => {},
        loading: false,
      },
    ],
    [like]
  );
  return (
    <Box display="flex">
      {POST_ACTIONS.map((action) => (
        <Box
          key={action.label}
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            disabled={action.loading}
            color={action.color as any}
            onClick={action.onClick}
          >
            <Icon component={action.icon} />
          </IconButton>
          <Typography ml={1} variant="footnote" color={theme.palette.grey[500]}>
            {action.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Actions;
