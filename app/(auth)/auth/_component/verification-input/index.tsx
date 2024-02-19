import { theme } from "@/app/theme";
import { Box, Typography } from "@mui/material";
import React from "react";
import VerificationInput, {
  type VerificationInputProps,
} from "react-verification-input";

interface PCVerificationInputProps extends VerificationInputProps {
  isShowError?: boolean;
}

const PCVerificationInput = ({
  isShowError,
  ...props
}: PCVerificationInputProps) => {
  return (
    <Box
      sx={{
        ".container": { gap: 2, width: "auto" },
        ".character": {
          backgroundColor: theme.palette.grey[500],
          borderRadius: 1.5,
          height: 44,
          width: 44,
          display: "grid",
          placeItems: "center",
          borderColor: "transparent",
          outline: "none",
          ...theme.typography.title3,
        },
        ".character--selected": {
          borderBottomColor: theme.palette.primary.light,
          borderBottomWidth: 3,
          
        },
      }}
    >
      <VerificationInput
        placeholder=""
        autoFocus
        validChars="0-9"
        classNames={{
          container: "container",
          character: "character",
          characterInactive: "character--inactive",
          characterSelected: "character--selected",
          characterFilled: "character--filled",
        }}
        {...props}
      />
      {isShowError && (
        <Typography mt={1} color={theme.palette.error.main}>
          Invalid Otp. Please try again.
        </Typography>
      )}
    </Box>
  );
};

export default PCVerificationInput;
