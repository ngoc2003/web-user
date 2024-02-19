import { useMutation } from "react-query";
import { resendVerifyToken, signUp, verifyUserEmail } from "../api/auth";

export const useRegister = () =>
  useMutation({
    mutationKey: ["register"],
    mutationFn: signUp,
  });

export const useVerifyUserEmail = () =>
  useMutation({
    mutationKey: ["verify"],
    mutationFn: verifyUserEmail,
  });

export const useResendVerificationCode = () =>
  useMutation({
    mutationKey: ["resend_verify_code"],
    mutationFn: resendVerifyToken,
  });
