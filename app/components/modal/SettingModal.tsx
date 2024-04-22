"use client";

import React from "react";
import PCModal, { PCModalProps } from ".";
import { Box, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEditProfileModal } from "@/app/hooks/useEditProfileModal";
interface SettingModalProps extends Omit<PCModalProps, "children"> {}

const SettingModal = ({ ...props }: SettingModalProps) => {
  const { onToggle } = useEditProfileModal();
  return (
    <PCModal title="Setting" {...props}>
      <Box>
        <Button
          onClick={() => {
            onToggle();
            props.onClose?.({}, "escapeKeyDown");
          }}
          endIcon={<ArrowForwardIosIcon />}
        >
          Change your information
        </Button>
        <Button endIcon={<ArrowForwardIosIcon />}>Change your pass word</Button>
      </Box>
    </PCModal>
  );
};

export default SettingModal;
