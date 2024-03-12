"use client";

import { Box, Button, Typography } from "@mui/material";
import { theme } from "@/app/theme";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PCVerificationInput from "../_component/verification-input";
import Image from "next/image";
import PCCountDown from "@/app/components/count-down";
import {
  useResendVerificationCode,
  useVerifyUserEmail,
} from "@/app/services/auth";
import toast from "react-hot-toast";

const OTP_LENGTH = 6;

export default function OtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState<string>("");
  const [canResendOtp, setCanResendOtp] = useState(false);
  const { mutate, isLoading } = useVerifyUserEmail();
  const { mutate: resendVerificationCode } = useResendVerificationCode();

  const email = searchParams.get("email");

  const onSubmit = () => {
    if (!email || !otp) return;

    mutate(
      { email, token: otp },
      {
        onSuccess: () => {
          router.push("/auth");
          toast.success("Sign up successfully.");
        },
        onError: () => {
          toast.error("Wrong Otp. Please try again.");
        },
      }
    );
  };

  if (!email) return;

  return (
    <Box display="grid" sx={{ placeItems: "center" }} textAlign="center">
      <Typography variant="title3" fontWeight={600}>
        Verify your account
      </Typography>
      <Typography mt={2} mb={3} color={theme.palette.tertiary.main}>
        Please enter the 6-digit verification code that was sent to your email
        at <b>{email}</b>
      </Typography>
      <PCVerificationInput onChange={(val) => setOtp(val)} />
      <Typography mt={2} mb={0.5} color={theme.palette.tertiary.main}>
        Haven&apos;t received the code yet?
      </Typography>
      <Typography
        onClick={() =>
          canResendOtp
            ? resendVerificationCode(
                { email },
                { onSuccess: () => setCanResendOtp(false) }
              )
            : undefined
        }
        fontWeight={600}
        sx={{ textDecoration: "underline" }}
        color={
          !canResendOtp ? theme.palette.grey[600] : theme.palette.primary.main
        }
        {...(canResendOtp && { sx: { cursor: "pointer" } })}
        ml={3}
      >
        Resend Otp{" "}
        {!canResendOtp && (
          <PCCountDown time={15} onFinish={() => setCanResendOtp(true)} />
        )}
      </Typography>
      <Button
        disabled={isLoading || !canResendOtp || otp.length !== OTP_LENGTH}
        sx={{ mt: 2 }}
        fullWidth
        variant="contained"
        onClick={onSubmit}
      >
        <Image src="/footprint.png" width={20} height={20} alt="Footprint" />
        <Typography ml={1}>Submit</Typography>
      </Button>
    </Box>
  );
}
