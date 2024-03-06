import React, { useRef, useState } from "react";
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
import { useAddPost } from "@/app/services/post";
import toast from "react-hot-toast";

const CreatePostModal = (props: Omit<PCModalProps, "children">) => {
  const { user } = useUser();
  const { mutate, isLoading } = useAddPost();
  const [inputValue, setInputValue] = useState<string>("");
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const handleAddPost = () => {
    if (!inputValue) return;

    mutate(
      {
        content: inputValue,
      },
      {
        onSuccess: () => {
          toast.success("Create post successfully.");
          props.onClose?.({}, "escapeKeyDown");
        },
      }
    );
  };

  if (!user?.name) return null;

  return (
    <PCModal title="Create new post" {...props}>
      <>
        <NameWithAvatar name={user.name} />
        <Box>
          <PCTextField
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
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
          onClick={handleAddPost}
          disabled={isLoading || !inputValue}
          endIcon={<SendIcon />}
          variant="contained"
          color="primary"
          fullWidth
        >
          Post
        </Button>
      </>
    </PCModal>
  );
};

export default CreatePostModal;
