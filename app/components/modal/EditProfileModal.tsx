"use client";

import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import PCModal, { PCModalProps } from ".";
import PCTextField from "../textfield";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PlaceIcon from "@mui/icons-material/Place";
import MailIcon from "@mui/icons-material/Mail";
import { CustomUserType, SEX_TYPE } from "@/app/types/user";
import * as yup from "yup";
import PCSelect from "@/app/components/select";
import { useUser } from "@/app/hooks/useUser";
import { omit, pick } from "lodash";
import { useUpdateUserProfile } from "@/app/services/user";
import { UpdateUserProfileBody } from "@/app/api/user";
import { signIn, useSession } from "next-auth/react";

interface EditProfileModalProps extends Omit<PCModalProps, "children"> {
  user: CustomUserType;
}

const EditProfileModal = ({ user, ...props }: EditProfileModalProps) => {
  const { mutate, isLoading } = useUpdateUserProfile();

  const schema = yup.object().shape({
    name: yup.string().required("This field is required"),
    email: yup.string().required("This field is required").email(),
    address: yup.string().required("This field is required"),
    sex: yup.mixed<SEX_TYPE>().required("This field is required"),
    birthday: yup
      .date()
      .required("This field is required")
      .typeError("Invalid date!")
      .max(new Date(), "Must less than current date"),
  });

  const {
    watch,
    register,
    handleSubmit,
    getValues,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      ...pick(user, ["name", "sex", "birthday", "address", "email"]),
    },
  });
  const onSubmit = (values: UpdateUserProfileBody & { email: string }) => {
    mutate(omit(values, "email"), {
      onSuccess: async (data) => {
        props.onClose?.({}, "escapeKeyDown");
      },
    });
  };

  return (
    <PCModal title="Update profile" {...props}>
      <>
        <PCTextField
          defaultValue={getValues("name")}
          inputProps={{ ...register("name") }}
          fullWidth
          label="Name"
          placeholder="Full name"
          helperText={errors.name?.message || ""}
        />
        <Box display="flex" gap={2} mt={2}>
          <PCSelect
            defaultValue={getValues("sex")}
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
            defaultValue={getValues("birthday")}
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
          defaultValue={getValues("address")}
          placeholder="Address"
          containerProps={{ sx: { mt: 2 } }}
          inputProps={{ ...register("address") }}
          helperText={errors.address?.message || ""}
        />
        <PCTextField
          type="email"
          defaultValue={getValues("email")}
          disabled
          fullWidth
          InputProps={{
            startAdornment: <MailIcon sx={{ mr: 1 }} />,
          }}
          label="Email"
          placeholder="Email"
          inputProps={{ ...register("email") }}
          containerProps={{ sx: { mt: 2 } }}
        />

        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={!isDirty || isLoading}
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Update
        </Button>
      </>
    </PCModal>
  );
};

export default EditProfileModal;
