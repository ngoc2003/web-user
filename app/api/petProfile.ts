import { AxiosResponse } from "axios";
import { PCConnectionInstance } from ".";
import { ExtendedPetType, SEX_TYPE } from "../types/user";

export interface AddPetBody {
  name: string;
  birthday: Date;
  sex: SEX_TYPE;
  description: string;
  image: string;
  pet_type_id: number;
  favoriteFood: string;
  isFriendlyWithDog: boolean;
  isFriendlyWithCat: boolean;
  isCleanProperly: boolean;
  isHyperactive: boolean;
  isFriendlyWithKid: boolean;
  isShy: boolean;
}

export const addPet = async (body: AddPetBody) => {
  return PCConnectionInstance.post<any, AxiosResponse<boolean>>(
    `/pet_profile`,
    body
  );
};

export const getPetById = async (id: string) => {
  return PCConnectionInstance.get<void, AxiosResponse<ExtendedPetType>>("/pet_profile/" + id);
};
