import { Box, BoxProps } from "@mui/material";
import React, { memo } from "react";
import CreatePostBox from "../../../_components/create-post-box";
import { useListPost } from "@/app/services/post";
import PostList from "@/app/components/post-list";

interface MainContentProps extends BoxProps {}

const MainContent = (props: MainContentProps) => {
  const { data, isFetching, isError } = useListPost({
    limit: 20,
    offset: 0,
  });

  return (
    <Box sx={{ px: 3, overflowY: "scroll", pb: 3, ...props?.sx }}>
      {isError ? (
        <>Error</>
      ) : (
        <>
          <CreatePostBox />
          <PostList data={data} isFetching={isFetching} />
        </>
      )}
    </Box>
  );
};

export default memo(MainContent);
