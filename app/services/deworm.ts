import { useMutation } from "react-query";
import { addDewormHistory, deleteDewormHistory } from "../api/deworm";

export const useAddDewormHistory = () =>
  useMutation({
    mutationKey: ["dewormHistory/create"],
    mutationFn: addDewormHistory,
  });

export const useDeleteDewormHistory = () =>
  useMutation({
    mutationKey: ["dewormHistory/delete"],
    mutationFn: deleteDewormHistory,
  });
