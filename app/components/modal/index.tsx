"use client";

import {
  Box,
  BoxProps,
  IconButton,
  Modal,
  ModalProps,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import * as Styles from "./modal.styles";
import { theme } from "@/app/theme";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
export interface PCModalProps extends ModalProps {
  containerProps?: BoxProps;
  disabledCloseButton?: boolean;
  onBack?: () => void;
}

const PCModal = ({ onBack, containerProps, title, ...props }: PCModalProps) => {
  return (
    <Modal {...props}>
      <Styles.ModalContainer
        {...containerProps}
        sx={{
          outline: "none",
          width: theme.spacing(82),
          ...containerProps?.sx,
        }}
      >
        <Box
          borderBottom="1px solid"
          borderColor={theme.palette.grey[200]}
          p={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          {!!onBack && (
            <Box position="absolute" sx={{ left: 18 }}>
              <IconButton size="small" onClick={onBack}>
                <ArrowBackIosIcon />
              </IconButton>
            </Box>
          )}
          <Typography variant="title3">{title}</Typography>
          {!props?.disabledCloseButton && (
            <Box position="absolute" sx={{ right: 18 }}>
              <IconButton
                size="small"
                onClick={() => props.onClose?.({}, "escapeKeyDown")}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          )}
        </Box>
        <Box p={2}>{props.children}</Box>
      </Styles.ModalContainer>
    </Modal>
  );
};

export default PCModal;
