"use client";

import {  Button } from "@mui/material";
import React, { useState } from "react";
import PCModal, { PCModalProps } from ".";
import PCTextField from "../textfield";
import toast from "react-hot-toast";
import { useAddWeightHistory } from "@/app/services/weight";

interface CreateWeightHistoryModalProps extends Omit<PCModalProps, "children"> {
  medical_record_id: number;
  refetch: () => {};
}

const CreateWeightHistoryModal = ({
  medical_record_id,
  refetch,
  ...props
}: CreateWeightHistoryModalProps) => {
  const { mutate, isLoading } = useAddWeightHistory();
  const [data, setData] = useState<{
    description: string;
    time: string | null;
    weight: number;
  }>({
    description: "",
    time: null,
    weight: 0,
  });
  const handleAdd = () => {
    if (!data.time || !medical_record_id) {
      return toast.error("You need to fill all values.");
    }
    const { description, time, weight } = data;
    mutate(
      {
        medical_record_id,
        description,
        time,
        weight,
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
    <PCModal title="Create new Weight History" {...props}>
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
          label="Weight"
          type="number"
          fullWidth
          containerProps={{
            sx: { mt: 1 },
          }}
          placeholder="Weight"
          onChange={(e) =>
            setData((prev) => ({ ...prev, weight: +e.target.value }))
          }
        />
        <PCTextField
          label="Description"
          fullWidth
          containerProps={{
            sx: { mt: 1 },
          }}
          placeholder="Weight description"
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

export default CreateWeightHistoryModal;
