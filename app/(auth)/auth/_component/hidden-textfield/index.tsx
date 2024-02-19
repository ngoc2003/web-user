"use client";

import PCTextField, { PCTextFieldProps } from "@/app/components/textfield";
import { theme } from "@/app/theme";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const PCHiddenTextField = (props: PCTextFieldProps) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <PCTextField
      {...props}
      type={isShow ? "text" : "password"}
      InputProps={{
        startAdornment: <LockIcon sx={{ mr: 1 }} />,
        endAdornment: (
          <IconButton onClick={() => setIsShow((prev) => !prev)}>
            {!isShow ? (
              <VisibilityOffIcon sx={{ fill: theme.palette.common.black }} />
            ) : (
              <VisibilityIcon sx={{ fill: theme.palette.common.black }} />
            )}
          </IconButton>
        ),
      }}
    />
  );
};

export default PCHiddenTextField;
