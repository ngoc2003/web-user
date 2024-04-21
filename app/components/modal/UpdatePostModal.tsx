import React, { memo, useLayoutEffect, useRef, useState } from "react";
import PCModal, { PCModalProps } from ".";
import NameWithAvatar from "../name-with-avatar";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import PCTextField from "../textfield";
import Image from "next/image";
import { theme } from "@/app/theme";
import SendIcon from "@mui/icons-material/Send";
import { useUpdatePost } from "@/app/services/post";
import toast from "react-hot-toast";
import { useUpdatePostModal } from "@/app/hooks/useUpdatePostModal";
import { useUploadImage } from "@/app/hooks/useUploadImage";
import ClearIcon from "@mui/icons-material/Clear";
import { useUser } from "@/app/hooks/useUser";

const UpdatePostModal = (props: Omit<PCModalProps, "children">) => {
  const { user } = useUser();
  const { mutate, isLoading } = useUpdatePost();
  const { deleteImage, upload } = useUploadImage();
  const updatePost = useUpdatePostModal();
  const [inputValue, setInputValue] = useState<string>("");
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const [images, setImages] = useState<string[]>([]);

  const handleUpdatePost = async () => {
    if (!inputValue || !updatePost.data) return;

    const uploadPromises = newImages.map((img) => upload(img));
    const deletePromises = imagesToDelete.map((img) => {
      const parts = img.split("/");
      const lastPart = parts[parts.length - 1].split("?")[0];
      return deleteImage(decodeURIComponent(lastPart));
    });

    try {
      const newImageUrls = await Promise.all(uploadPromises);

      const remainingImages = updatePost.data.images
        .filter((img) => !imagesToDelete.includes(img.link))
        .map((img) => img.link);

      const updatedImages = remainingImages.concat(newImageUrls);

      await Promise.all(deletePromises);
      mutate(
        {
          id: updatePost.data.id,
          data: { content: inputValue, images: updatedImages },
        },
        {
          onSuccess: () => {
            toast.success("Update post successfully.");
            props.onClose?.({}, "escapeKeyDown");
            window.location.reload();
          },
        }
      );
      setImages(updatedImages);
    } catch (error: any) {
      toast.error("Failed to update post: " + error.message);
    }
  };

  const handleAddImage = (event: any) => {
    const files = Array.from(event.target.files);
    setImages((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
    setNewImages((prev) => [...prev, ...files]);
  };

  const handleDeleteImage = (imageId: string) => {
    setImages((prev) => prev.filter((img) => img !== imageId));
    if (!imageId.startsWith("blob")) {
      setImagesToDelete((prev) => [...prev, imageId]);
    }
  };

  useLayoutEffect(() => {
    if (updatePost.data?.content) {
      setInputValue(updatePost.data.content);
    }
    if (updatePost.data?.images && updatePost.data.images?.length) {
      setImages(updatePost.data?.images.map((img) => img.link));
    }
  }, [updatePost.data?.content, updatePost.data?.images]);

  if (!user?.name || !updatePost.data) return null;

  return (
    <PCModal title="Update your post" {...props}>
      <>
        <NameWithAvatar name={user.name} />
        <Box>
          <PCTextField
            onChange={(e) => setInputValue(e.target.value)}
            defaultValue={updatePost.data?.content || ""}
            fullWidth
            multiline
            rows={6}
            autoFocus
            placeholder={`${user.name}, what are you thinking...`}
            sx={{ bgcolor: "transparent" }}
          />
          <Box>
            {images?.length &&
              images.map((image) => (
                <Box key={image} position="relative" mt={1}>
                  <IconButton
                    onClick={() => handleDeleteImage(image)}
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                  <Box textAlign="center" bgcolor={theme.palette.grey[200]}>
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      src={image}
                      alt="Image"
                      style={{ width: "100%", height: "auto", maxWidth: 400 }}
                      objectFit="contain"
                    />
                  </Box>
                </Box>
              ))}
          </Box>
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
              <input
                ref={imageInputRef}
                type="file"
                onChange={handleAddImage}
                multiple
                accept="image/png, image/gif, image/jpeg"
                style={{ display: "none" }}
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

export default memo(UpdatePostModal);
