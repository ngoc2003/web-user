"use client";

import PCTextField from "@/app/components/textfield";
import React from "react";
import MailIcon from "@mui/icons-material/Mail";
import { Box, Button, Divider, Typography } from "@mui/material";
import { theme } from "@/app/theme";
import Image from "next/image";
import OathBox from "../_component/oath-box";
import PCLink from "@/app/components/link";
import PCSelect from "@/app/components/select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PCHiddenTextField from "../_component/hidden-textfield";
import ValidateChecked from "@/app/components/validate-checked";
import useValidatePassword from "@/app/hooks/useValidatePassword";
import useSignUpSchema from "./useSignUpSchema";
import { SignUpBody } from "@/app/api/auth";
import PlaceIcon from "@mui/icons-material/Place";
import { useRegister } from "@/app/services/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const SignUpPage = () => {
  const schema = useSignUpSchema();
  const { mutate, isLoading } = useRegister();
  const router = useRouter();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpBody>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const passwordValue = watch("password");

  const { includedAlphanumeric, isValidLength } =
    useValidatePassword(passwordValue);

  const onSubmit = (values: SignUpBody) => {
    mutate(values, {
      onSuccess: () => {
        router.push(`/auth/otp?email=${values.email}`);
        toast.success("Otp was sent. Please check your email.");
      },
      onError: (response: any) => {
        if (response.response?.data?.errors)
          toast.error(
            Object.values(response.response?.data?.errors).toString()
          );
        else toast.error("Somethings went wrong. Please try again.");
      },
    });
  };

  return (
    <>
      <PCTextField
        inputProps={{ ...register("name") }}
        fullWidth
        label="Name"
        placeholder="Full name"
        helperText={errors.name?.message || ""}
      />
      <Box display="flex" gap={2} mt={2}>
        <PCSelect
          inputProps={{ ...register("sex") }}
          fullWidth
          label="Gender"
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
        />
        <PCTextField
          inputProps={{ ...register("birthday") }}
          fullWidth
          type="date"
          label="Date of Birth"
          helperText={errors.birthday?.message || ""}
        />
      </Box>
      <PCTextField
        fullWidth
        InputProps={{
          startAdornment: <PlaceIcon sx={{ mr: 1 }} />,
        }}
        label="Address"
        placeholder="Address"
        containerProps={{ sx: { mt: 2 } }}
        inputProps={{ ...register("address") }}
        helperText={errors.address?.message || ""}
      />
      <PCTextField
        type="email"
        fullWidth
        InputProps={{
          startAdornment: <MailIcon sx={{ mr: 1 }} />,
        }}
        label="Email"
        placeholder="Email"
        containerProps={{ sx: { mt: 2 } }}
        inputProps={{ ...register("email") }}
        helperText={errors.email?.message || ""}
      />
      <PCHiddenTextField
        containerProps={{
          sx: {
            mt: 2,
          },
        }}
        fullWidth
        label="Password"
        placeholder="Password"
        inputProps={{ ...register("password") }}
        helperText={errors.password?.message || ""}
      />
      <Box>
        <ValidateChecked
          label="Must contain at least 1 number and 1 alphabetical character"
          checked={includedAlphanumeric}
        />
        <ValidateChecked
          label="Must be at least 6 characters"
          checked={isValidLength}
        />
      </Box>
      <PCHiddenTextField
        fullWidth
        placeholder="Confirm password"
        label="Confirm password"
        containerProps={{
          sx: {
            mt: 2,
          },
        }}
        inputProps={{ ...register("confirmPassword") }}
        helperText={errors.confirmPassword?.message || ""}
      />
      <Button
        sx={{ mt: 4 }}
        fullWidth
        variant="contained"
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
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
