"use client";
import { theme } from "@/app/theme";
import { Avatar, Box, IconButton } from "@mui/material";
import React, { memo, useState } from "react";
import PCTextField from "../../textfield";
import SendIcon from "@mui/icons-material/Send";
import { useAddComment } from "@/app/services/comment";
import { CommentType } from "@/app/types/user";

interface CommentInputProps {
  name: string;
  postId: number;
  handleRefreshCommentList: (comment: CommentType) => void;
}
const CommentInput = React.forwardRef<HTMLInputElement, CommentInputProps>(
  ({ name, postId, handleRefreshCommentList }, ref) => {
    const [inputValue, setInputValue] = useState<string>("");
    const { mutate: addComment, isLoading } = useAddComment();

    const handleAddComment = () => {
      if (!inputValue || inputValue.length > 255) return;
      addComment(
        {
          content: inputValue,
          post_id: postId,
        },
        {
          onSuccess: ({ data }) => {
            setInputValue("");
            handleRefreshCommentList(data);
          },
        }
      );
    };

    return (
      <Box display="flex" alignItems="center" mt={2}>
        <Avatar sx={{ bgcolor: theme.palette.primary.light, mr: 3 }}>
          {name.charAt(0)}
        </Avatar>
        <PCTextField
          inputRef={ref}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddComment();
              e.preventDefault();
            }
          }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          fullWidth
          placeholder={`Hey ${name.split(" ")[0]}, put your comment here.`}
          InputProps={{
            endAdornment: (
              <IconButton
                sx={{ ml: 1 }}
                color="primary"
                disabled={!inputValue || isLoading || inputValue.length > 255}
                onClick={handleAddComment}
              >
                <SendIcon />
              </IconButton>
            ),
          }}
        />
      </Box>
    );
  }
);

CommentInput.displayName = "CommentInput";

export default memo(CommentInput);
