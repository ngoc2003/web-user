"use client";
import { Box } from "@mui/material";
import React, { memo } from "react";
import Loading from "../loading";
import Post from "../post";
import { ExtendedPostType } from "@/app/types/user";

interface PostListProps {
  isFetching: boolean;
  data: ExtendedPostType[];
}

const PostList = ({ isFetching, data }: PostListProps) => {
  return (
    <Box>
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

export default memo(PostList);
