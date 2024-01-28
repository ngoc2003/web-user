import {
  FormControlLabel,
  FormControlLabelProps,
  Radio,
  RadioProps,
} from "@mui/material";
import React from "react";

interface PCRadioButotnProps extends Omit<FormControlLabelProps, "control"> {
  radioProps?: RadioProps;
}

const PCRadioButton = ({
  label,
  value,
  radioProps,
  ...props
}: PCRadioButotnProps) => {
  return (
    <FormControlLabel
      {...props}
      value={value}
      control={<Radio {...radioProps} />}
      label={label}
    />
  );
};

export default PCRadioButton;
