"use client";

import { Box, IconButton, Popover } from "@mui/material";
import EmojiPicker, { Theme } from "emoji-picker-react";
import Image from "next/image";
import React from "react";

interface PCIconPickerProps {
  onChange: (icon: string) => void;
}

export const PCIconPicker = ({ onChange }: PCIconPickerProps) => {
  const currentTheme = "light";

  const themeMap = {
    dark: Theme.DARK,
    light: Theme.LIGHT,
  };

  const theme = themeMap[currentTheme];

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton onClick={handleClick}>
        <Image
          src="/icons/faceSmile.svg"
          width={24}
          height={24}
          alt="icon-picker"
        />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <EmojiPicker
          height={380}
          theme={theme}
          onEmojiClick={(data) => onChange(data.emoji)}
        />{" "}
      </Popover>
    </>
  );
};
