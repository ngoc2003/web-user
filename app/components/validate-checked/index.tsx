import { theme } from "@/app/theme";
import { Box, Typography } from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface ValidateCheckedProps {
  checked: boolean;
  label: string;
}

const ValidateChecked = ({ checked, label }: ValidateCheckedProps) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns="14px auto"
      gap={1.5}
      alignItems="center"
      mt={2}
    >
      <CheckCircleIcon
        fontSize="small"
        color={checked ? "success" : "disabled"}
      />
      <Typography
        color={checked ? theme.palette.success.main : theme.palette.grey[200]}
        variant="footnote"
        letterSpacing={0.048}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default ValidateChecked;
