"use client";

import PCTextField from "@/app/components/textfield";
import { theme } from "@/app/theme";
import { IconButton, useMediaQuery } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

const SearchBox = () => {
  const [showSearchBox, setShowSearchBox] = useState(false);
  const isMiniMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {!showSearchBox ? (
        <IconButton onClick={() => setShowSearchBox(true)}>
          <Image alt="search" src="/icons/search.svg" width={24} height={24} />
        </IconButton>
      ) : (
        <PCTextField
          autoFocus
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
          placeholder="Search for users, pets,..."
          containerProps={{
            sx: isMiniMobile ? { flex: 1 } : { width: 350 },
          }}
          size="small"
          onBlur={() => showSearchBox && setShowSearchBox(false)}
        />
      )}
    </>
  );
};

export default SearchBox;
