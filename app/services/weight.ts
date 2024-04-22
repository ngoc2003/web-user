import { useMutation } from "react-query";
import { addWeightHistory, deleteWeightHistory } from "../api/weight";

export const useAddWeightHistory = () =>
  useMutation({
    mutationKey: ["WeightHistory/create"],
    mutationFn: addWeightHistory,
  });

export const useDeleteWeightHistory = () =>
  useMutation({
    mutationKey: ["WeightHistory/delete"],
    mutationFn: deleteWeightHistory,
  });
