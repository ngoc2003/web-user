import { theme } from "@/app/theme";
import { Box, BoxProps } from "@mui/material";
import React from "react";
import CreatePostBox from "../create-post-box";
import Post from "@/app/components/post";

interface MainContentProps extends BoxProps {}

const MainContent = (props: MainContentProps) => {
  return (
    <Box sx={{ px: 3, overflowY: "scroll", pb: 3, ...props?.sx }}>
      <CreatePostBox />
      <Post />
      <Post />
      <Post />
    </Box>
  );
};

export default MainContent;
