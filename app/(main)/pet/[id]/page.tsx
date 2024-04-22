"use client";

import { useGetPetById } from "@/app/services/petProfile";
import { theme } from "@/app/theme";
import { Box, Button, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useMemo, useState } from "react";
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
import RightSidebar from "../../home/section/right-sidebar";
import { useUser } from "@/app/hooks/useUser";
import CreateDewormHistoryModal from "@/app/components/modal/CreateWormHistoryModal";
import DewormHistoryBox from "../_component/deworm-history-box";
import VaccinationHistoryBox from "../_component/vaccination-history-box";
import CreateVaccinationHistoryModal from "@/app/components/modal/CreateVaccinationHistoryModal";
import CreateWeightHistoryModal from "@/app/components/modal/CreateWeightHistoryModal";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const PetProfilePage = () => {
  const { id } = useParams();

  const { data, refetch } = useGetPetById(id + "");
  const { user } = useUser();

  const isAuthor = useMemo(
    () => data?.user_id + "" === user?.id + "",
    [data?.user_id, user?.id]
  );

  const { mutate: deleteAllergy, isLoading: deleteAllergyLoading } =
    useDeleteAllergy();

  const [idToDelete, setIdToDelete] = useState<number | null>(null);

  const [modalState, setModalState] = useState({
    createAllergies: false,
    deleteAllergies: false,
    createDewormHistory: false,
    createVaccinationHistory: false,
    createWeightHistory: false,
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

  const characteristic = Object.keys(data.med as { [key: string]: any }).filter(
    (key) => key.startsWith("is") && (data as any).med[key]
  );

  return (
    <>
      <Box width="100%" sx={{ overflowY: "auto" }}>
        {/* <Typography variant="h4" color="primary" m={2} mt={0}>
          {data.name}&apos;s profile
        </Typography> */}
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
                <Box
                  sx={{
                    ":hover": {
                      ".basicIn4": {
                        color: theme.palette.primary.main,
                      },
                    },
                  }}
                  mb={1}
                  display="flex"
                  key={in4.label}
                >
                  <Box
                    className="basicIn4"
                    borderRadius={2}
                    sx={{
                      mr: 2,
                      bgcolor: theme.palette.grey[200],
                      width: 44,
                      height: 44,
                      display: "grid",
                      placeItems: "center",
                      transition: "0.2s",
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
            <Box
              sx={{
                ":hover": {
                  ".basicIn4": {
                    color: theme.palette.primary.main,
                  },
                },
              }}
              mb={1}
              display="flex"
            >
              <Box
                className="basicIn4"
                borderRadius={2}
                sx={{
                  transition: "0.2s",

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
          {isAuthor && (
            <Button
              onClick={() =>
                setModalState((prev) => ({ ...prev, createAllergies: true }))
              }
              sx={{ color: theme.palette.primary.main }}
            >
              Add
            </Button>
          )}
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
                {isAuthor && (
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
                )}
              </Box>
            ))
          ) : (
            <PCNotFoundData />
          )}
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" m={2}>
            Worm history
          </Typography>
          {isAuthor && (
            <Button
              onClick={() =>
                setModalState((prev) => ({
                  ...prev,
                  createDewormHistory: true,
                }))
              }
              sx={{ color: theme.palette.primary.main }}
            >
              Add
            </Button>
          )}
        </Box>
        <Box bgcolor={theme.palette.common.white} p={2}>
          {data.med.deworms.length ? (
            <DewormHistoryBox
              data={data.med.deworms.map((d) => ({
                id: d.id,
                created_at: d.created_at,
                description: d.description,
                time: d.time,
              }))}
            />
          ) : (
            <PCNotFoundData />
          )}
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" m={2}>
            Vaccination history
          </Typography>
          {isAuthor && (
            <Button
              onClick={() =>
                setModalState((prev) => ({
                  ...prev,
                  createVaccinationHistory: true,
                }))
              }
              sx={{ color: theme.palette.primary.main }}
            >
              Add
            </Button>
          )}
        </Box>
        <Box bgcolor={theme.palette.common.white} p={2}>
          {data.med.vaccinations.length ? (
            <VaccinationHistoryBox
              data={data.med.vaccinations.map((d) => ({
                id: d.id,
                created_at: d.created_at,
                description: d.description,
                time: d.time,
                name: d.name,
              }))}
            />
          ) : (
            <PCNotFoundData />
          )}
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" m={2}>
            Weight history
          </Typography>
          {isAuthor && (
            <Button
              onClick={() =>
                setModalState((prev) => ({
                  ...prev,
                  createWeightHistory: true,
                }))
              }
              sx={{ color: theme.palette.primary.main }}
            >
              Add
            </Button>
          )}
        </Box>

        <Box bgcolor={theme.palette.common.white} p={2}>
          {data.med.weights.length ? (
            <>
              <Line
                width="100%"
                height={30}
                data={{
                  labels: data.med.weights.map((w) =>
                    format(new Date(w.time), "dd/MM/yyyy")
                  ),
                  datasets: [
                    {
                      data: data.med.weights.map((w) => w.weight),
                      label: "Mi mi",
                      borderColor: theme.palette.primary.main,
                      fill: false,
                    },
                  ],
                }}
              />
            </>
          ) : (
            <PCNotFoundData />
          )}
        </Box>
      </Box>

      <RightSidebar />

      <CreateAllergyModal
        refetch={refetch}
        medical_record_id={data.med.id}
        open={modalState.createAllergies}
        onClose={() =>
          setModalState((prev) => ({ ...prev, createAllergies: false }))
        }
      />
      <CreateWeightHistoryModal
        refetch={refetch}
        medical_record_id={data.med.id}
        open={modalState.createWeightHistory}
        onClose={() =>
          setModalState((prev) => ({ ...prev, createWeightHistory: false }))
        }
      />

      <CreateDewormHistoryModal
        refetch={refetch}
        medical_record_id={data.med.id}
        open={modalState.createDewormHistory}
        onClose={() =>
          setModalState((prev) => ({ ...prev, createDewormHistory: false }))
        }
      />
      <CreateVaccinationHistoryModal
        refetch={refetch}
        medical_record_id={data.med.id}
        open={modalState.createVaccinationHistory}
        onClose={() =>
          setModalState((prev) => ({
            ...prev,
            createVaccinationHistory: false,
          }))
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
