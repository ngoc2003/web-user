"use client";
import Loading from "@/app/components/loading";
import PCNotFoundData from "@/app/components/notFoundData";
import Post from "@/app/components/post";
import { useGetPostById } from "@/app/services/post";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import React from "react";

const PostDetail = () => {
  const { id } = useParams();

  const { data, isFetching } = useGetPostById(+id);

  if (isFetching) return <Loading />;

  return (
    <Box sx={{ overflowY: "scroll" }} flex={1} maxWidth={800}>
      {!data ? <></> : <Post {...data} />}
    </Box>
  );
};

export default PostDetail;
