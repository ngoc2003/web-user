import { Box, BoxProps, CircularProgress } from "@mui/material";
import React from "react";
import CreatePostBox from "../create-post-box";
import Post from "@/app/components/post";
import { useListPost } from "@/app/services/post";
import { ExtendedPostType } from "@/app/api/post";
import Loading from "@/app/components/loading";

interface MainContentProps extends BoxProps {}

const MainContent = (props: MainContentProps) => {
  const { data, isFetching, isError } = useListPost({
    limit: 20,
    offset: 0,
  });

  if (isError) return <>Error</>;

  return (
    <Box sx={{ px: 3, overflowY: "scroll", pb: 3, ...props?.sx }}>
      <CreatePostBox />

      {isFetching && <Loading />}

      {!isFetching && !data.length && (
        <Box display="grid" sx={{ placeItems: "center" }} minHeight={320}>
          No posts founded!
        </Box>
      )}

      {!isFetching &&
        !!data.length &&
        data.map((post: ExtendedPostType) => <Post key={post.id} {...post} />)}
    </Box>
  );
};

export default MainContent;
