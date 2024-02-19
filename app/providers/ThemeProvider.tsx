"use client";

import React, { ReactNode } from "react";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { theme } from "../theme";
import { ThemeProvider } from "@emotion/react";

interface ThemeProviderClientProp {
  children: ReactNode;
}

const ThemeProviderClient = ({ children }: ThemeProviderClientProp) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          fontFamily: "Roboto",
        }}
      />
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderClient;
