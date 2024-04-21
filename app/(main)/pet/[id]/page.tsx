"use client";

import { useGetPetById } from "@/app/services/petProfile";
import { theme } from "@/app/theme";
import { Box, Button, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import MaleIcon from "@mui/icons-material/Male";
import PetsIcon from "@mui/icons-material/Pets";
import FemaleIcon from "@mui/icons-material/Female";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";
import { capitalize, snakeCase } from "lodash";
import { format } from "date-fns";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import WbIncandescentIcon from "@mui/icons-material/WbIncandescent";
import PCNotFoundData from "@/app/components/notFoundData";
import CreateAllergyModal from "@/app/components/modal/CreateAllergyModal";
import { Close } from "@mui/icons-material";
import ConfirmModal from "@/app/components/modal/ConfirmModal";
import { useDeleteAllergy } from "@/app/services/allergy";
import toast from "react-hot-toast";

const PetProfilePage = () => {
  const { id } = useParams();

  const { data, refetch } = useGetPetById(id + "");

  const { mutate: deleteAllergy, isLoading: deleteAllergyLoading } =
    useDeleteAllergy();

  const [idToDelete, setIdToDelete] = useState<number | null>(null);

  const [modalState, setModalState] = useState({
    createAllergies: false,
    deleteAllergies: false,
  });

  const handleDeleteAllergy = () => {
    if (!idToDelete) return;
    deleteAllergy(idToDelete, {
      onSuccess: () => {
        toast.success("Allergy delete successfully.");
        refetch();
        setModalState((prev) => ({ ...prev, deleteAllergies: false }));
      },
    });
  };

  if (!data) return;

  const basicInformation = [
    {
      label: "Name",
      value: data.name,
      icon: <LoyaltyIcon />,
    },
    {
      label: "Gender",
      value: data.sex,
      icon: data.sex === "male" ? <MaleIcon /> : <FemaleIcon />,
    },
    {
      label: "Date of birth",
      value: format(new Date(data.birthday), "dd/MM/yyyy"),
      icon: <CalendarMonthIcon />,
    },
    {
      label: "Favorite food",
      value: data.med.favoriteFood.replaceAll(",", ", "),
      icon: <FavoriteBorderIcon />,
    },
    {
      label: "Type of pet",
      value: data.pet_type.type,
      icon: <PetsIcon />,
    },
    {
      label: "Breed",
      value: data.pet_type.name,
      icon: <EmojiNatureIcon />,
    },
  ];

  const characteristic = Object.keys(data.med as { [key: string]: any}).filter(
    (key) => key.startsWith("is") && (data as any).med[key]
  );

  return (
    <>
      <Box width="100%">
        <Typography variant="h4" color="primary" m={2} mt={0}>
          {data.name}&apos;s profile
        </Typography>
        <Box
          p={2}
          bgcolor={theme.palette.common.white}
          width="100%"
          display="flex"
        >
          <Box
            borderRadius={2}
            position="relative"
            width={300}
            height={200}
            bgcolor={theme.palette.grey[200]}
            mr={2}
          >
            <Image
              src={data.image}
              alt="Pet profile"
              fill
              objectFit="contain"
            />
          </Box>
          <Box flex={1}>
            <Box display="grid" gridTemplateColumns="repeat(3, 1fr)">
              {basicInformation.map((in4) => (
                <Box mb={1} display="flex" key={in4.label}>
                  <Box
                    borderRadius={2}
                    sx={{
                      mr: 2,
                      bgcolor: theme.palette.grey[200],
                      width: 44,
                      height: 44,
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    {in4.icon}
                  </Box>
                  <Box>
                    <Typography>{in4.label}</Typography>
                    <Typography color={theme.palette.grey[600]}>
                      {capitalize(in4.value)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box mb={1} display="flex">
              <Box
                borderRadius={2}
                sx={{
                  mr: 2,
                  bgcolor: theme.palette.grey[200],
                  width: 44,
                  height: 44,
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <WbIncandescentIcon />
              </Box>
              <Box>
                <Typography>Description</Typography>
                <Typography color={theme.palette.grey[600]}>
                  {data.description}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Typography variant="h6" m={2}>
          Characteristic
        </Typography>

        <Box
          display="flex"
          flexWrap="wrap"
          bgcolor={theme.palette.common.white}
          p={2}
        >
          {characteristic?.length ? (
            characteristic.map((item: string) => (
              <Box mr={2} bgcolor="#FCF0E6" p={1} borderRadius={3} key={item}>
                {capitalize(snakeCase(item.replace("is", ""))).replaceAll(
                  "_",
                  " "
                )}
              </Box>
            ))
          ) : (
            <PCNotFoundData />
          )}
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" m={2}>
            Allergy
          </Typography>
          <Button
            onClick={() =>
              setModalState((prev) => ({ ...prev, createAllergies: true }))
            }
            sx={{ color: theme.palette.primary.main }}
          >
            Add
          </Button>
        </Box>

        <Box
          display="flex"
          flexWrap="wrap"
          bgcolor={theme.palette.common.white}
          p={2}
        >
          {data.med.allergies?.length ? (
            data.med.allergies.map((item) => (
              <Box
                mr={2}
                bgcolor="#EBF0FF"
                p={1}
                borderRadius={3}
                key={item.id}
              >
                {capitalize(
                  snakeCase(item.description.replace("is", ""))
                ).replaceAll("_", " ")}
                <IconButton
                  onClick={() => {
                    setIdToDelete(item.id);
                    setModalState((prev) => ({
                      ...prev,
                      deleteAllergies: true,
                    }));
                  }}
                  sx={{ fontSize: 12, ml: 1 }}
                >
                  <Close />
                </IconButton>
              </Box>
            ))
          ) : (
            <PCNotFoundData />
          )}
        </Box>
      </Box>

      <CreateAllergyModal
        refetch={refetch}
        medical_record_id={data.med.id}
        open={modalState.createAllergies}
        onClose={() =>
          setModalState((prev) => ({ ...prev, createAllergies: false }))
        }
      />

      <ConfirmModal
        isLoading={deleteAllergyLoading}
        open={modalState.deleteAllergies}
        handleSubmit={handleDeleteAllergy}
        title="Are you sure want to delete this allergy?"
        onClose={() => {
          setModalState((prev) => ({ ...prev, deleteAllergies: false }));
        }}
      />
    </>
  );
};

export default PetProfilePage;
