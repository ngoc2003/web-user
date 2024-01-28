import { Button, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const OathBox = () => {
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
