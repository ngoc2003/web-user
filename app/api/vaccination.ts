import { AxiosResponse } from "axios";
import { PCConnectionInstance } from ".";
import { VaccinationType } from "../types/user";

export interface AddVaccinationHistoryBody {
  description: string;
  time: string;
  name: string;
  medical_record_id: number;
}

export const addVaccinationHistory = async (
  body: AddVaccinationHistoryBody
) => {
  return PCConnectionInstance.post<any, VaccinationType>(
    `/vaccination_history`,
    body
  );
};

export const deleteVaccinationHistory = async (id: number) => {
  return PCConnectionInstance.delete(`/vaccination_history/` + id);
};
