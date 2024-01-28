"use client";
import { theme } from "@/app/theme";
import { Box } from "@mui/material";
import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box
      position="relative"
      width="100vw"
      py={14}
      display="grid"
      sx={{
        placeItems: "center",
      }}
    >
      <Image
        src="/background.png"
        alt="background"
        fill
        objectFit="cover"
        style={{
          zIndex: -1,
          position: "absolute",
          inset: 0,
        }}
      />
      <Box
        borderRadius={2}
        bgcolor={theme.palette.common.white}
        px={5}
        py={4}
        maxWidth={500}
      >
        <Box display="flex" justifyContent="center" mb={2} width="100%">
          <Image src="/logo.png" width={175} height={60} alt="logo" />
        </Box>
        {children}
      </Box>
    </Box>
  );
}
