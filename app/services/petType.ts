import { useQuery } from "react-query";
import { listPetType } from "../api/petType";

export const useListPetType = () =>
  useQuery(["petType"], () => listPetType(), {
    select: ({ data }) => data,
  });
