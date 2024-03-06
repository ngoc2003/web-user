import { Box, BoxProps } from "@mui/material";
import React from "react";
import CreatePostBox from "../create-post-box";
import Post from "@/app/components/post";
import { useListPost } from "@/app/services/post";
import { PostWithUserType } from "@/app/api/post";
import UpdatePostModal from "@/app/components/modal/UpdatePostModal";

interface MainContentProps extends BoxProps {}

const MainContent = (props: MainContentProps) => {
  const { data } = useListPost({
    limit: 20,
    offset: 0,
  });

  return (
    <Box sx={{ px: 3, overflowY: "scroll", pb: 3, ...props?.sx }}>
      <CreatePostBox />
      {data?.length &&
        data.map((post: PostWithUserType) => <Post key={post.id} {...post} />)}
    </Box>
  );
};

export default MainContent;
