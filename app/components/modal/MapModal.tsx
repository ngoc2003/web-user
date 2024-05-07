"use  client";

import React, { useMemo, useState } from "react";
import PCModal, { PCModalProps } from ".";
import { Box, Button, Typography } from "@mui/material";
import PCTextField from "../textfield";
import { useCountries } from "@/app/hooks/useCountries";
import Image from "next/image";
import { theme } from "@/app/theme";
import { debounce } from "lodash";

interface MapModalProps extends Omit<PCModalProps, "children"> {
  onSelect: (val: any) => void;
}
const MapModal = ({ onSelect, ...props }: MapModalProps) => {
  const [searchText, setSearchText] = useState("");
  const { getByValue } = useCountries();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const location = useMemo(() => getByValue(searchText), [searchText]);

  const handleSearchChange = debounce((value: string) => {
    setSearchText(value.toLowerCase());
  }, 300);

  return (
    <PCModal
      title="Searching location"
      onChange={(e) => {
        const target = e.target as HTMLInputElement;
        handleSearchChange(target.value);
      }}
      {...props}
    >
      <>
        <PCTextField
          InputProps={{
            endAdornment: (
              <Image
                alt="search"
                src="/icons/search.svg"
                width={24}
                height={24}
              />
            ),
          }}
          fullWidth
          placeholder="Where are you now ?"
        />

        <Box mt={2} maxHeight={400} sx={{ overflow: "scroll" }}>
          {!!searchText &&
            !!location?.length &&
            location.map((l) => (
              <Box
                onClick={() => {
                  onSelect({
                    name: l.label,
                    lat: l.latlng[0],
                    lon: l.latlng[1],
                  });
                  props?.onClose?.({}, "escapeKeyDown");
                }}
                px={2}
                py={1}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: theme.palette.grey[200],
                  },
                  borderRadius: 2,
                  transition: "0.1s",
                }}
                width="100%"
                key={l.value}
                display="flex"
                alignItems="center"
              >
                <Typography sx={{ mr: 2 }} fontSize={30}>
                  {l.flag}
                </Typography>
                <Typography>{l.label}</Typography>
              </Box>
            ))}
        </Box>
      </>
    </PCModal>
  );
};

export default MapModal;
