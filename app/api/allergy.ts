import { AxiosResponse } from "axios";
import { PCConnectionInstance } from ".";
import { AllergyType } from "../types/user";

export interface AddAllergyBody {
  description: string;
  medical_record_id: number;
}

export const addAllergy = async (body: AddAllergyBody) => {
  return PCConnectionInstance.post<any, AllergyType>(`/allergies`, body);
};

export const deleteAllergy = async (id: number) => {
  return PCConnectionInstance.delete(`/allergies/` + id);
};
