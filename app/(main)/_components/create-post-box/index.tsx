"use client";

import PCTextField from "@/app/components/textfield";
import { useCreatePostModal } from "@/app/hooks/useCreatePostModal";
import { useUser } from "@/app/hooks/useUser";
import { theme } from "@/app/theme";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Icon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import React from "react";

const BUTTON_ACTIONS = [
  {
    label: "Upload pictures",
    url: "/icons/camera.svg",
  },
  {
    label: "Your feeling",
    url: "/icons/faceSmile.svg",
  },
  {
    label: "Check-in",
    url: "/icons/mapPin.svg",
  },
];

const CreatePostBox = () => {
  const { user } = useUser();
  const createPostModal = useCreatePostModal();
  const isMiniMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!user) return;

  return (
    <Box
      bgcolor={theme.palette.common.white}
      borderRadius={1.5}
      px={2}
      py={3}
      boxShadow="0 1px 1px rgba(0,0,0,0.25)"
    >
      <Box display="flex" alignItems="center">
        <Avatar sx={{ bgcolor: theme.palette.primary.light, mr: 3 }}>
          {user.name.charAt(0)}
        </Avatar>
        <PCTextField
          onClick={() => createPostModal.onToggle()}
          fullWidth
          name="share"
          placeholder={`Hey ${user.name.split(" ")[0]}, what are you doing?`}
        />
      </Box>
      {!isMiniMobile && (
        <>
          <Divider sx={{ mt: 3, mb: 1.5 }} />

          <Box display="flex" gap={1} justifyContent="between">
            {BUTTON_ACTIONS.map((btn) => (
              <Button key={btn.label} variant="text" fullWidth>
                <Icon>
                  <Image src={btn.url} width={24} height={24} alt="camera" />
                </Icon>
                <Typography ml={1}>{btn.label}</Typography>
              </Button>
            ))}
          </Box>

          <Divider sx={{ mt: 1.5, mb: 3 }} />
          <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
            <Typography color={theme.palette.grey[500]}>With</Typography>
            {Array.from({ length: 3 }).map((_, index) => (
              <Chip
                key={1 * index}
                avatar={
                  <Avatar
                    sx={{
                      width: 24,
                      height: 24,
                      bgcolor: theme.palette.primary.light,
                    }}
                  >
                    <Typography variant="footnote">H</Typography>
                  </Avatar>
                }
                label="Harry James"
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default CreatePostBox;
