import { theme } from "@/app/theme";
import {
  FormControl,
  FormControlProps,
  FormHelperText,
  StandardTextFieldProps,
  TextField,
  Typography,
} from "@mui/material";
import { omit } from "lodash";
import React from "react";

export interface PCTextFieldProps extends StandardTextFieldProps {
  helperText?: string;
  disabledTextBold?: boolean;
  containerProps?: FormControlProps;
}

const PCTextField = ({
  fullWidth,
  label,
  helperText,
  error,
  containerProps,
  disabledTextBold,
  ...props
}: PCTextFieldProps) => {
  return (
    <FormControl fullWidth={fullWidth} {...containerProps}>
      {!!label && (
        <Typography variant="body" fontWeight={500} mb={1}>
          {label}
        </Typography>
      )}
      <TextField
        variant="standard"
        InputProps={{
          disableUnderline: true,
          ...props?.InputProps,
        }}
        fullWidth
        sx={{
          borderRadius: "8px",
          p: props?.size === "small" ? 1 : 1.5,
          bgcolor: theme.palette.grey[200],
          [`input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button`]: {
            WebkitAppearance: "none",
            margin: 0,
          },
          [`input::placeholder`]: {
            color: theme.palette.tertiary.main,
          },

          ...props.sx,
        }}
        {...omit(props, ["sx", "InputProps"])}
      />
      {!!helperText && (
        <FormHelperText
          sx={{ fontSize: 14, color: theme.palette.error.main, mt: 1, mx: 0 }}
          error={error}
        >
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default PCTextField;
