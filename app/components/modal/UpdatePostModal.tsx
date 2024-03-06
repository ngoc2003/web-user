import React, { useLayoutEffect, useRef, useState } from "react";
import PCModal, { PCModalProps } from ".";
import NameWithAvatar from "../name-with-avatar";
import { useUser } from "@/app/hooks/useUser";
import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import PCTextField from "../textfield";
import Image from "next/image";
import { theme } from "@/app/theme";
import SendIcon from "@mui/icons-material/Send";
import { useUpdatePost } from "@/app/services/post";
import toast from "react-hot-toast";
import { useUpdatePostModal } from "@/app/hooks/useUpdatePostModal";

const UpdatePostModal = (props: Omit<PCModalProps, "children">) => {
  const { user } = useUser();
  const { mutate, isLoading } = useUpdatePost();
  const updatePost = useUpdatePostModal();
  const [inputValue, setInputValue] = useState<string>("");
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpdatePost = () => {
    if (!inputValue || !updatePost.data) return;

    if (inputValue === updatePost.data.content) return;

    mutate(
      {
        id: updatePost.data.id,
        data: { content: inputValue },
      },
      {
        onSuccess: () => {
          toast.success("Update post successfully.");
          props.onClose?.({}, "escapeKeyDown");
          window.location.reload();
        },
      }
    );
  };

  useLayoutEffect(() => {
    if (updatePost.data?.content) {
      setInputValue(updatePost.data.content);
    }
  }, [updatePost.data?.content]);

  if (!user?.name || !updatePost.data) return null;

  return (
    <PCModal title="Update your post" {...props}>
      <>
        <NameWithAvatar name={user.name} />
        <Box>
          <PCTextField
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            defaultValue={updatePost.data?.content || ""}
            fullWidth
            multiline
            rows={6}
            autoFocus
            placeholder={`${user.name}, what are you thinking...`}
            sx={{ bgcolor: "transparent" }}
          />
          <Box></Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box
          display="flex"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography color={theme.palette.grey[400]}>
            Add to your post
          </Typography>
          <Box>
            <IconButton onClick={() => imageInputRef.current?.click()}>
              <TextField
                inputRef={imageInputRef}
                type="file"
                sx={{ display: "none" }}
              />
              <Image
                src="/icons/camera.svg"
                alt="camera"
                width={24}
                height={24}
              />
            </IconButton>
          </Box>
        </Box>

        <Button
          onClick={handleUpdatePost}
          disabled={isLoading || !inputValue}
          endIcon={<SendIcon />}
          variant="contained"
          color="primary"
          fullWidth
        >
          Update
        </Button>
      </>
    </PCModal>
  );
};

export default UpdatePostModal;
