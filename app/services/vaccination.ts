import { useMutation } from "react-query";
import {
  addVaccinationHistory,
  deleteVaccinationHistory,
} from "../api/vaccination";

export const useAddVaccinationHistory = () =>
  useMutation({
    mutationKey: ["VaccinationHistory/create"],
    mutationFn: addVaccinationHistory,
  });

export const useDeleteVaccinationHistory = () =>
  useMutation({
    mutationKey: ["VaccinationHistory/delete"],
    mutationFn: deleteVaccinationHistory,
  });
