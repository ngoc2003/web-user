"use client";

import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { theme } from "@/app/theme";
import PCTextField from "@/app/components/textfield";
import PCRadioButton from "@/app/components/radio-button";
import PCLink from "@/app/components/link";
import OathBox from "./_component/oath-box";

export default function AuthPage() {
  const [isShowPassWord, setIsShowPassword] = useState(false);

  return (
    <>
      <PCTextField
        type="email"
        fullWidth
        InputProps={{
          startAdornment: <MailIcon sx={{ mr: 1 }} />,
        }}
        label="Email"
        placeholder="Email"
      />
      <PCTextField
        containerProps={{
          sx: {
            mt: 2,
          },
        }}
        fullWidth
        type={isShowPassWord ? "text" : "password"}
        InputProps={{
          startAdornment: <LockIcon sx={{ mr: 1 }} />,
          endAdornment: (
            <IconButton onClick={() => setIsShowPassword((prev) => !prev)}>
              {!isShowPassWord ? (
                <VisibilityOffIcon sx={{ fill: theme.palette.common.black }} />
              ) : (
                <VisibilityIcon sx={{ fill: theme.palette.common.black }} />
              )}
            </IconButton>
          ),
        }}
        label="Password"
        placeholder="Password"
      />
      <Box
        mt={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <PCRadioButton value="isRemember" label="Remember me" />
        <Typography fontWeight={500} color={theme.palette.primary.main}>
          Forgot password?
        </Typography>
      </Box>
      <Button sx={{ mt: 4 }} fullWidth variant="contained">
        <Image src="/footprint.png" width={20} height={20} alt="Footprint" />
        <Typography ml={1}>Sign in</Typography>
      </Button>
      <Divider
        sx={{
          mt: 4,
          "&::before, &::after": {
            borderColor: theme.palette.primary.light,
          },
        }}
      >
        <Typography color={theme.palette.primary.light}>OR</Typography>
      </Divider>
      <OathBox />

      <Box mt={4} textAlign="center">
        <Typography color={theme.palette.tertiary.main}>
          Dont have an account?
        </Typography>
        <PCLink href="#">
          <Typography fontWeight={500}>Sign up</Typography>
        </PCLink>
      </Box>
    </>
  );
}
