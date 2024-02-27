"use client";

import { useUser } from "@/app/hooks/useUser";
import { theme } from "@/app/theme";
import { Avatar, Box, Button, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import React, { useMemo } from "react";

const Invitation = () => {
  const isMiniMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { user } = useUser();

  const time = useMemo<string>(() => {
    const date = new Date().getHours();
    if (date < 12) return "morning";
    if (date < 18) return "afternoon";
    return "evening";
  }, []);

  if (!user) return;

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Box>
          <Typography variant="title2" fontWeight={600}>
            Hi {user.name}
          </Typography>
          <Typography mt={1}>Good {time}!</Typography>
        </Box>
        {isMiniMobile && (
          <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
            {user.name.charAt(0)}
          </Avatar>
        )}
      </Box>
      <Box
        my={3}
        bgcolor={theme.palette.secondary.main}
        borderRadius={isMiniMobile ? 2 : 5}
        p={3}
        boxShadow="inset 0 4px 4px 0 rgba(0,0,0,0.25)"
      >
        <Typography
          color={theme.palette.common.white}
          variant="title4"
          fontWeight={600}
        >
          Join our Animal Lovers Community
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Box>
            <Button
              size="small"
              variant="text"
              sx={{ bgcolor: theme.palette.common.white }}
            >
              Join now
            </Button>
          </Box>
          <Image
            height={110}
            width={130}
            style={{ marginTop: -6 }}
            alt="animal lovers"
            src="/animalLover.svg"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Invitation;
