import { PCConnectionInstance } from "@/app/api";
import { Button, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const OathBox = () => {
  const router = useRouter();

  return (
    <>
      <Button
        startIcon={
          <Image
            src="/facebook.png"
            width={22}
            height={22}
            alt="Facebook Icon"
            style={{ marginRight: 8 }}
          />
        }
        sx={{ mt: 4 }}
        fullWidth
        variant="text"
      >
        <Typography>Continue with facebook</Typography>
      </Button>
      <Button
        onClick={() => {
          signIn("google").then(() => {
            router.push("/home");
            toast.success("Login successfully. Welcome back.");
          });
        }}
        startIcon={
          <Image
            src="/google.png"
            width={22}
            height={22}
            alt="Google Icon"
            style={{ marginRight: 8 }}
          />
        }
        sx={{ mt: 4 }}
        fullWidth
        variant="text"
      >
        <Typography>Continue with Google</Typography>
      </Button>
    </>
  );
};

export default OathBox;
