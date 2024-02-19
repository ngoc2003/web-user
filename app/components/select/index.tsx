import { theme } from "@/app/theme";
import { KeyboardArrowDown } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectProps,
  Typography,
} from "@mui/material";
import { omit } from "lodash";
import React from "react";

export interface SelectOption {
  value: string | number;
  label: string;
  subOptions?: SelectOption[];
  metadata?: Record<string, unknown>;
}

interface PCSelectProps extends Omit<SelectProps, "children"> {
  helperText?: string;
  label?: string;
  placeholder?: string;
  options: SelectOption[];
}

const PCSelect = ({
  fullWidth,
  label,
  helperText,
  placeholder,
  options,
  ...props
}: PCSelectProps) => {
  return (
    <FormControl fullWidth={fullWidth}>
      {!!label && (
        <Typography
          variant="body"
          fontWeight={500}
          mb={1}
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {label}
        </Typography>
      )}
      <Select
        sx={{
          borderColor: "transparent",
          minWidth: 150,
          borderRadius: "8px",
          padding: 1.5,
          bgcolor: theme.palette.grey[500],
          ...props.sx,
        }}
        {...omit(props, ["sx"])}
        disableUnderline
        variant="standard"
        IconComponent={props.IconComponent ?? KeyboardArrowDown}
        defaultValue={props.defaultValue ?? options[0].value}
        displayEmpty
      >
        {!!placeholder && (
          <MenuItem value="" sx={{ display: "none" }}>
            <Typography color={theme.palette.grey[200]}>
              {placeholder}
            </Typography>
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem key={JSON.stringify(option.value)} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {!!helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default PCSelect;
