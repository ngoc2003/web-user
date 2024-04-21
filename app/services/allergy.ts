import { useMutation } from "react-query";
import { addAllergy, deleteAllergy } from "../api/allergy";

export const useAddAllergy = () =>
  useMutation({
    mutationKey: ["allergy/create"],
    mutationFn: addAllergy,
  });

export const useDeleteAllergy = () =>
  useMutation({
    mutationKey: ["allergy/delete"],
    mutationFn: deleteAllergy,
  });
