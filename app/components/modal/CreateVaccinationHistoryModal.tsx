"use client";

import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import PCModal, { PCModalProps } from ".";
import PCTextField from "../textfield";
import toast from "react-hot-toast";
import { useAddVaccinationHistory } from "@/app/services/vaccination";

interface CreateVaccinationHistoryModalProps
  extends Omit<PCModalProps, "children"> {
  medical_record_id: number;
  refetch: () => {};
}

const CreateVaccinationHistoryModal = ({
  medical_record_id,
  refetch,
  ...props
}: CreateVaccinationHistoryModalProps) => {
  const { mutate, isLoading } = useAddVaccinationHistory();
  const [data, setData] = useState<{
    description: string;
    time: string | null;
    name: string;
  }>({
    description: "",
    time: null,
    name: "",
  });
  const handleAdd = () => {
    if (!data.time || !medical_record_id || !data.name) {
      return toast.error("You need to fill all values.");
    }
    const { description, time, name } = data;
    mutate(
      {
        medical_record_id,
        description,
        time,
        name,
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
    <PCModal title="Create new Vaccination History" {...props}>
      <>
        <PCTextField
          label="Time"
          type="date"
          fullWidth
          placeholder="Time"
          onChange={(e) =>
            setData((prev) => ({ ...prev, time: e.target.value }))
          }
        />
        <PCTextField
          label="Vaccination name"
          fullWidth
          containerProps={{
            sx: { mt: 1 },
          }}
          placeholder="Name"
          onChange={(e) =>
            setData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <PCTextField
          label="Description"
          fullWidth
          containerProps={{
            sx: { mt: 1 },
          }}
          placeholder="Vaccination description"
          onChange={(e) =>
            setData((prev) => ({ ...prev, description: e.target.value }))
          }
        />

        <Button
          disabled={!data.time || isLoading}
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

export default CreateVaccinationHistoryModal;
