import { PCConnectionInstance } from ".";
import { SEX_TYPE, UserType } from "../types/user";

interface LoginBody {
  email: string;
  password: string;
}

export interface SignUpBody {
  name: string;
  sex: SEX_TYPE;
  birthday: Date;
  address: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginResponse {
  user: UserType & { email: string; role: string };
  token: string;
}

export interface VerifyUserEmailBody {
  token: string;
  email: string;
}

export interface ResendVerifyTokenBody {
  email: string;
}

export const logIn = async (body: LoginBody) => {
  return PCConnectionInstance.post<any, LoginResponse>("/auth/login", body);
};

export const logOut = async () => {
  return PCConnectionInstance.post("/auth/logout");
};

export const signUp = async (body: SignUpBody) => {
  return PCConnectionInstance.post("/auth/sign-up", body);
};

export const verifyUserEmail = async (body: VerifyUserEmailBody) => {
  return PCConnectionInstance.post("/auth/verify_user_email", body);
};

export const resendVerifyToken = async (body: ResendVerifyTokenBody) => {
  return PCConnectionInstance.post("/auth/resend_verification_code", body);
};
