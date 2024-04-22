"use client";

import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import PCModal, { PCModalProps } from ".";
import PCTextField from "../textfield";
import toast from "react-hot-toast";
import { useAddDewormHistory } from "@/app/services/deworm";

interface CreateDewormHistoryModalProps extends Omit<PCModalProps, "children"> {
  medical_record_id: number;
  refetch: () => {};
}

const CreateDewormHistoryModal = ({
  medical_record_id,
  refetch,
  ...props
}: CreateDewormHistoryModalProps) => {
  const { mutate, isLoading } = useAddDewormHistory();
  const [data, setData] = useState<{
    description: string;
    time: string | null;
  }>({
    description: "",
    time: null,
  });
  const handleAdd = () => {
    if (!data.time || !medical_record_id) {
      return toast.error("You need to fill all values.");
    }
    const { description, time } = data;
    mutate(
      {
        medical_record_id,
        description,
        time,
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
    <PCModal title="Create new Deworm History" {...props}>
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
          label="Description"
          fullWidth
          containerProps={{
            sx: { mt: 1 },
          }}
          placeholder="Deworm description"
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

export default CreateDewormHistoryModal;
