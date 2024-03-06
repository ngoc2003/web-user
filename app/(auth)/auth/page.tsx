"use client";

import { Box, Button, Divider, Typography } from "@mui/material";
import Image from "next/image";
import MailIcon from "@mui/icons-material/Mail";
import { theme } from "@/app/theme";
import PCTextField from "@/app/components/textfield";
import PCRadioButton from "@/app/components/radio-button";
import PCLink from "@/app/components/link";
import OathBox from "./_component/oath-box";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import PCHiddenTextField from "./_component/hidden-textfield";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useResendVerificationCode } from "@/app/services/auth";

interface LoginFormProps {
  email: string;
  password: string;
}

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { mutate } = useResendVerificationCode();
  const scheme = yup.object().shape({
    email: yup.string().required("This field is required").email(),
    password: yup
      .string()
      .required("This field is required")
      .min(6, "Must be at least 6 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d).+$/,
        "Must contain at least 1 number and 1 alphabetical character"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>({
    mode: "onSubmit",
    resolver: yupResolver(scheme),
  });

  const onSubmit = (values: LoginFormProps) => {
    setIsLoading(true);

    signIn("credentials", {
      ...values,
      redirect: false,
    })
      .then((callback) => {
        setIsLoading(false);
        if (!callback?.error) {
          router.push("/home");
          return toast.success("Login successfully. Welcome back.");
        }
        if (callback?.error === "Account have not active yet.") {
          mutate(
            { email: values.email },
            {
              onSuccess: () => {
                toast.success(
                  `Verify code has sent to your email at ${values.email}`
                );
                router.push(`/auth/otp?email=${values.email}`);
              },
              onError: () => {
                toast.error(`Can not send an email to ${values.email}`);
              },
            }
          );
          return;
        }
        toast.error(callback.error);
      })
      .finally(() => setIsLoading(false));
  };

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
        helperText={errors.email?.message || ""}
        inputProps={{ ...register("email") }}
      />
      <PCHiddenTextField
        containerProps={{
          sx: {
            mt: 2,
          },
        }}
        helperText={errors.password?.message || ""}
        fullWidth
        label="Password"
        placeholder="Password"
        inputProps={{ ...register("password") }}
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
      <Button
        fullWidth
        sx={{ mt: 4 }}
        variant="contained"
        disabled={isLoading}
        onClick={handleSubmit(onSubmit)}
      >
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
        <PCLink href="/auth/sign-up">
          <Typography fontWeight={500}>Sign up</Typography>
        </PCLink>
      </Box>
    </>
  );
}
