import { AxiosResponse } from "axios";
import { PCConnectionInstance } from ".";
import { PetTypeType } from "../types/user";

export const listPetType = async () =>
  PCConnectionInstance.get<any, { data: PetTypeType[]; message: string }>(
    `/pet_type`
  );
