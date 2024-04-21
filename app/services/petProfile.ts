import { useMutation, useQuery } from "react-query";
import { addPet } from "../api/petProfile";
export const useAddPet = () =>
  useMutation({
    mutationKey: ["petProfile/create"],
    mutationFn: addPet,
  });
