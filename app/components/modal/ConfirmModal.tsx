"use client";

import React, { memo } from "react";
import PCModal, { PCModalProps } from ".";
import { Box, Button } from "@mui/material";

interface ConfirmModalProps extends Omit<PCModalProps, "children"> {
  handleSubmit: () => void;
  isLoading?: boolean;
}

const ConfirmModal = ({
  isLoading,
  handleSubmit,
  ...props
}: ConfirmModalProps) => {
  return (
    <PCModal {...props}>
      <Box display="flex">
        <Button
          onClick={() => props.onClose?.({}, "escapeKeyDown")}
          sx={{ mt: 2, mr: 2 }}
          fullWidth
        >
          Cancel
        </Button>
        <Button
          disabled={isLoading}
          onClick={() => {
            handleSubmit();
          }}
          sx={{ mt: 2 }}
          fullWidth
          variant="contained"
          color="primary"
        >
          Confirm
        </Button>
      </Box>
    </PCModal>
  );
};

export default memo(ConfirmModal);
