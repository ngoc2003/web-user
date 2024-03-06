export type SEX_TYPE = "male" | "female";

export interface UserType {
  id: number;
  sex: SEX_TYPE;
  name: string;
  address: string;
  birthday: Date;
}

export interface ExtendedUserType extends UserType {
  email: string;
  created_at: Date;
  updated_at: Date;
  account_id: number;
}
