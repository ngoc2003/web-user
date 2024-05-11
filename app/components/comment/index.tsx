"use client";

import {
  useDeleteComment,
  useLikeComment,
  useUnlikeComment,
  useUpdateComment,
} from "@/app/services/comment";
import { theme } from "@/app/theme";
import { ExtendedCommentType } from "@/app/types/user";
import { Avatar, Box, Typography } from "@mui/material";
import { formatDistance } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect, useState } from "react";
import toast from "react-hot-toast";
import PCTextField from "../textfield";

interface CommentProps {
  id: number;
  data: ExtendedCommentType;
  isLike: boolean;
  handleDeleteComment: (id: number) => void;
}

const Comment = ({ data, id, isLike, handleDeleteComment }: CommentProps) => {
  const router = useRouter();
  const [like, setLike] = useState<boolean>(isLike);
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { mutate: likeComment, isLoading: isLikeCommentLoading } =
    useLikeComment();
  const { mutate: unlikeComment, isLoading: isUnlikeCommentLoading } =
    useUnlikeComment();

  const { mutate: deleteComment } = useDeleteComment();
  const { mutate: updateComment } = useUpdateComment();

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

  const handleUpdateComment = () => {
    if (inputValue !== data.content) {
      updateComment(
        {
          id: data.id,
          data: {
            post_id: data.post_id,
            content: inputValue,
          },
        },
        {
          onSuccess: () => {
            toast.success("Update success!");
          },
        }
      );
    }
    setIsEdit(false);
  };

  useLayoutEffect(() => {
    if (data?.content) {
      setInputValue(data.content);
    }
  }, [data?.content]);
  return (
    <>
      {!isEdit ? (
        <Box display="flex" mt={2}>
          <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
            {data.user.name.charAt(0)}
          </Avatar>
          <Box pl={2} flex={1}>
            <Box
              py={1}
              px={1.5}
              borderRadius={4}
              bgcolor={theme.palette.grey[200]}
              display="inline-block"
              maxWidth={900}
            >
              <Typography
                fontWeight={600}
                mb={0.25}
                sx={{ cursor: "poiner" }}
                onClick={() => router.push("/user/" + data.user.id)}
              >
                {data.user.id === id ? "You" : data.user.name}
              </Typography>
              <Typography>{inputValue}</Typography>
            </Box>
            <Box display="flex" mt={0.5} ml={1}>
              <Typography color={theme.palette.grey[600]}>
                {formatDistance(new Date(data.created_at), new Date(), {
                  addSuffix: true,
                })}
              </Typography>
              <Typography
                color={
                  like ? theme.palette.primary.main : theme.palette.grey[600]
                }
                fontWeight={600}
                sx={{ cursor: "pointer", ml: 2 }}
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
              {data.user.id === id && (
                <>
                  <Typography
                    sx={{ cursor: "pointer", ml: 2 }}
                    color={theme.palette.grey[600]}
                    fontWeight={600}
                    onClick={() => setIsEdit(true)}
                  >
                    Edit
                  </Typography>
                  <Typography
                    sx={{ cursor: "pointer", ml: 2 }}
                    color={theme.palette.grey[600]}
                    fontWeight={600}
                    onClick={() => {
                      deleteComment(data.id, {
                        onSuccess: () => handleDeleteComment(data.id),
                      });
                    }}
                  >
                    Delete
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        </Box>
      ) : (
        <>
          <Box display="flex" alignItems="start" mt={2} width="100%">
            <Avatar sx={{ bgcolor: theme.palette.primary.light, mr: 2 }}>
              {data.user.name.charAt(0)}
            </Avatar>
            <Box flex={1}>
              <PCTextField
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    // handleAddComment();
                    e.preventDefault();
                  }
                }}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                fullWidth
                multiline
                containerProps={{
                  sx: {
                    borderRadius: 4,
                  },
                }}
              />
              <Box display="flex" mt={0.5} ml={1}>
                <Typography color={theme.palette.grey[600]}>
                  {formatDistance(new Date(data.created_at), new Date(), {
                    addSuffix: true,
                  })}
                </Typography>

                <Typography
                  sx={{ cursor: "pointer", ml: 2 }}
                  color={theme.palette.grey[600]}
                  fontWeight={600}
                  onClick={() => {
                    handleUpdateComment();
                  }}
                >
                  Save
                </Typography>
                <Typography
                  sx={{ cursor: "pointer", ml: 2 }}
                  color={theme.palette.grey[600]}
                  fontWeight={600}
                  onClick={() => setIsEdit(false)}
                >
                  Cancel
                </Typography>
                <Typography
                  sx={{ cursor: "pointer", ml: 2 }}
                  color={theme.palette.grey[600]}
                  fontWeight={600}
                  onClick={() => {
                    deleteComment(data.id, {
                      onSuccess: () => handleDeleteComment(data.id),
                    });
                  }}
                >
                  Delete
                </Typography>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Comment;
