import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";

const PCNotFoundData = () => {
  return (
    <Box width="100%" textAlign="center" mt={5}>
      <Image
        src="/notFound.jpg"
        width={0}
        height={0}
        sizes="100vw"
        alt="Not found"
        style={{
          width: 120,
          height: "auto",
        }}
      />
    </Box>
  );
};

export default PCNotFoundData;
