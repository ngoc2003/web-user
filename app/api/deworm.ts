import { AxiosResponse } from "axios";
import { PCConnectionInstance } from ".";
import { DewormHistoryType } from "../types/user";

export interface AddDewormHistoryBody {
  description: string;
  time: string;
  medical_record_id: number;
}

export const addDewormHistory = async (body: AddDewormHistoryBody) => {
  return PCConnectionInstance.post<any, DewormHistoryType>(`/deworm_history`, body);
};

export const deleteDewormHistory = async (id: number) => {
  return PCConnectionInstance.delete(`/deworm_history/` + id);
};
