import { useMutation, useQuery } from "react-query";
import { addPet, getPetById } from "../api/petProfile";
import { AxiosResponse } from "axios";

export const useAddPet = () =>
  useMutation({
    mutationKey: ["petProfile/create"],
    mutationFn: addPet,
  });

export const useGetPetById = (id: string) =>
  useQuery(["pet", id], () => getPetById(id), {
    select: ({ data }) => data,
  });
