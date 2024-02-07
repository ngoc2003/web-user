"use client";

import PCTextField from "@/app/components/textfield";
import React, { useState } from "react";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { theme } from "@/app/theme";
import Image from "next/image";
import OathBox from "../_component/oath-box";
import PCLink from "@/app/components/link";
import PCSelect from "@/app/components/select";

const SignUpPage = () => {
  const [isShowPassWord, setIsShowPassword] = useState(false);
  const [isShowReTypePassWord, setIsShowReTypePassword] = useState(false);

  return (
    <>
      <PCTextField fullWidth label="Name" placeholder="Full name" />
      <Box display="flex" gap={2} mt={2}>
        <PCSelect
          fullWidth
          label="Gender"
          options={[
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
          ]}
        />
        <PCTextField fullWidth type="date" label="Date of Birth" />
      </Box>
      <PCTextField
        type="email"
        fullWidth
        InputProps={{
          startAdornment: <MailIcon sx={{ mr: 1 }} />,
        }}
        label="Email"
        placeholder="Email"
        containerProps={{ sx: { mt: 2 } }}
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
      <PCTextField
        fullWidth
        placeholder="Confirm password"
        label="Confirm password"
        type={isShowReTypePassWord ? "text" : "password"}
        containerProps={{
          sx: {
            mt: 2,
          },
        }}
        InputProps={{
          startAdornment: <LockIcon sx={{ mr: 1 }} />,
          endAdornment: (
            <IconButton
              onClick={() => setIsShowReTypePassword((prev) => !prev)}
            >
              {!isShowReTypePassWord ? (
                <VisibilityOffIcon sx={{ fill: theme.palette.common.black }} />
              ) : (
                <VisibilityIcon sx={{ fill: theme.palette.common.black }} />
              )}
            </IconButton>
          ),
        }}
      />

      <Button sx={{ mt: 4 }} fullWidth variant="contained">
        <Image src="/footprint.png" width={20} height={20} alt="Footprint" />
        <Typography ml={1}>Sign up</Typography>
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
          Already have an account?
        </Typography>
        <PCLink href="/auth">
          <Typography fontWeight={500}>Sign in</Typography>
        </PCLink>
      </Box>
    </>
  );
};

export default SignUpPage;
