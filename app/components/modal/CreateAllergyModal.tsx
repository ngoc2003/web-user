"use client";

import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import PCModal, { PCModalProps } from ".";
import PCTextField from "../textfield";
import { useAddAllergy } from "@/app/services/allergy";
import toast from "react-hot-toast";

interface CreateAllergyModalProps extends Omit<PCModalProps, "children"> {
  medical_record_id: number;
  refetch: () => {};
}

const CreateAllergyModal = ({
  medical_record_id,
  refetch,
  ...props
}: CreateAllergyModalProps) => {
  const { mutate } = useAddAllergy();
  const [description, setDescription] = useState("");
  const handleAdd = () => {
    if (!description || !medical_record_id) {
      return toast.error("You need to fill all values.");
    }
    mutate(
      {
        medical_record_id,
        description,
      },
      {
        onSuccess: () => {
          toast.success("Add successfully.");
          refetch();
          props?.onClose?.({}, "escapeKeyDown");
        },
      }
    );
  };

  return (
    <PCModal title="Create new allergy" {...props}>
      <>
        <PCTextField
          fullWidth
          placeholder="Allergy"
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button
          onClick={handleAdd}
          sx={{ mt: 2 }}
          fullWidth
          variant="contained"
          color="primary"
        >
          Add
        </Button>
      </>
    </PCModal>
  );
};

export default CreateAllergyModal;
