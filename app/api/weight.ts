import { PCConnectionInstance } from ".";
import { WeightHistoryType } from "../types/user";

export interface AddWeightHistoryBody {
  description: string;
  time: string;
  medical_record_id: number;
  weight: number;
}

export const addWeightHistory = async (body: AddWeightHistoryBody) => {
  return PCConnectionInstance.post<any, WeightHistoryType>(
    `/weight_history`,
    body
  );
};

export const deleteWeightHistory = async (id: number) => {
  return PCConnectionInstance.delete(`/weight_history/` + id);
};
