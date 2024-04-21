"use client";

import React from "react";
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
      <Box display="flex" gap={2}>
        <Button
          onClick={() => props.onClose?.({}, "escapeKeyDown")}
          sx={{ mt: 2 }}
          fullWidth
        >
          Cancel
        </Button>
        <Button
          disabled={isLoading}
          onClick={handleSubmit}
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

export default ConfirmModal;
