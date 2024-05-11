"use client";
import { theme } from "@/app/theme";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { memo, useCallback, useRef, useState } from "react";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import { useUser } from "@/app/hooks/useUser";
import Comment from "../comment";
import { formatDistance } from "date-fns";
import EditIcon from "@mui/icons-material/Edit";
import { useUpdatePostModal } from "@/app/hooks/useUpdatePostModal";
import { useDeletePost } from "@/app/services/post";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";
import CommentInput from "./comment-input";
import Actions from "./actions";
import { useRouter } from "next/navigation";
import {
  CommentType,
  ExtendedCommentType,
  ExtendedPostType,
} from "@/app/types/user";
import Image from "next/image";
import PCImageSlider from "../image-slider";
import { useCountries } from "@/app/hooks/useCountries";

const NUMBER_OF_COMMENTS_WILL_LOAD_MORE = 5;

const Post = (props: ExtendedPostType) => {
  const inputCommentRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const { user } = useUser();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openImageSlider, setOpenImageSlider] = useState(false);
  const open = !!anchorEl;
  const updatePost = useUpdatePostModal();
  const { mutate: deletePost } = useDeletePost();
  const { getByLatAndLon } = useCountries();

  const [activeIndex, setActiveIndex] = useState(0);

  const numberOfComment = useRef<number>(4);

  const [comments, setComments] = useState<ExtendedCommentType[]>(
    props.comments?.slice(props.comments.length - numberOfComment.current)
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFocusInputComment = () => {
    inputCommentRef.current?.focus();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePost = useCallback(() => {
    deletePost(props.id, {
      onSuccess: () => {
        toast.success("Delete successfully.");
        window.location.reload();
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.id]);

  const handleRefreshCommentList = useCallback(
    (comment: CommentType) => {
      numberOfComment.current = numberOfComment.current + 1;
      setComments((prev) => [
        ...prev,
        {
          ...comment,
          user,
          likes: [],
        } as ExtendedCommentType,
      ]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user?.id]
  );

  const handleLoadMoreComment = useCallback(() => {
    if (
      !props.comments?.length ||
      numberOfComment.current >= props.comments?.length
    )
      return;
    const numberCommentCanIncrease =
      props.comments.length - numberOfComment.current;

    if (numberCommentCanIncrease <= 0) return;

    setComments(
      props.comments?.slice(
        props.comments.length -
          numberOfComment.current -
          (NUMBER_OF_COMMENTS_WILL_LOAD_MORE < numberCommentCanIncrease
            ? NUMBER_OF_COMMENTS_WILL_LOAD_MORE
            : numberCommentCanIncrease)
      )
    );
    numberOfComment.current =
      numberOfComment.current + NUMBER_OF_COMMENTS_WILL_LOAD_MORE;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.comments?.length]);

  if (!user || !props.user) return;

  const isAuthor = +user.id === +props.user?.id;

  return (
    <Box
      p={3}
      mt={5}
      boxShadow="0 1px 1px 0 rgba(0,0,0,0.25)"
      borderRadius={1.2}
      bgcolor={theme.palette.common.white}
    >
      <Box display="flex" alignItems="center">
        <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
          {props.user.name.charAt(0)}
        </Avatar>
        <Box
          sx={{ cursor: "pointer", overflow: "hidden" }}
          borderRadius={2}
          ml={2}
          flex={1}
          onClick={() => router.push("/user/" + props.user.id)}
        >
          <Typography fontWeight={600}>
            {props.user.name}
            {!!props.latitude &&
              !!props.longitude &&
              getByLatAndLon([props.latitude, props.longitude]) && (
                <Typography
                  sx={{ display: "inline" }}
                  color={theme.palette.grey[600]}
                  fontWeight={400}
                >
                  {" "}
                  is in{" "}
                  <Typography sx={{ display: "inline" }} fontWeight={600}>
                    {getByLatAndLon([props.latitude, props.longitude])?.label}
                  </Typography>
                </Typography>
              )}
          </Typography>
          <Typography color={theme.palette.grey[600]}>
            {formatDistance(new Date(props.created_at), new Date(), {
              addSuffix: true,
            })}
          </Typography>
        </Box>
        <Box>
          <IconButton onClick={handleClick}>
            <MoreHorizRoundedIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {isAuthor && (
              <Box>
                <MenuItem
                  onClick={() => {
                    updatePost.onOpen({ data: props });
                  }}
                >
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <Typography>Update</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleDeletePost();
                  }}
                >
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <Typography>Delete</Typography>
                </MenuItem>
              </Box>
            )}
          </Menu>
        </Box>
      </Box>
      <Typography my={1}>{props.content}</Typography>

      <Grid container spacing={1}>
        <RenderGridItems
          onClick={(index: number) => {
            setActiveIndex(index);
            setOpenImageSlider(true);
          }}
          data={
            !!props.images?.length
              ? props.images.map((item, index) => ({
                  index,
                  link: item.link,
                }))
              : []
          }
        />
      </Grid>

      <PCImageSlider
        open={openImageSlider}
        activeIndex={activeIndex}
        onClose={() => setOpenImageSlider(false)}
        images={props.images}
      />
      {/* <Box
        mt={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <PetsOutlinedIcon />
          <Typography ml={1} variant="footnote">
            7,2k likes
          </Typography>
        </Box>

        <Typography variant="footnote">4,2k comments</Typography>
      </Box> */}

      <Divider sx={{ my: 1.5 }} />

      <Actions
        id={props.id}
        userId={user.id}
        likes={props.likes}
        handleFocusInputComment={handleFocusInputComment}
      />

      <Divider sx={{ my: 1.5 }} />

      <Box>
        <Box display="flex" alignItems="center" justifyContent="end">
          {props.comments.length - numberOfComment.current > 0 && (
            <Box flex={1} onClick={handleLoadMoreComment}>
              <Typography
                variant="footnote"
                color={theme.palette.grey[600]}
                sx={{
                  transition: "0.2s",
                  cursor: "pointer",
                  ":hover": {
                    fontWeight: 600,
                    color: theme.palette.common.black,
                    textDecoration: "underline",
                  },
                }}
              >
                See more {NUMBER_OF_COMMENTS_WILL_LOAD_MORE} comments
              </Typography>
            </Box>
          )}
          <Box>
            <IconButton>
              <TuneRoundedIcon />
            </IconButton>
          </Box>
        </Box>
        <Box>
          {comments?.map((comment) => (
            <Comment
              key={comment.id}
              id={comment.id}
              data={comment}
              isLike={comment.likes.some((like) => +like.user_id === +user.id)}
            />
          ))}
        </Box>
      </Box>

      <CommentInput
        ref={inputCommentRef}
        handleRefreshCommentList={handleRefreshCommentList}
        name={user.name}
        postId={props.id}
      />
    </Box>
  );
};

export default memo(Post);

const RenderGridItems = ({
  data,
  onClick,
}: {
  data: { index: number; link: string }[];
  onClick: (index: number) => void;
}) => {
  if (data.length <= 3) {
    return data.map((item, index) => (
      <Grid item xs={12 / data.length} key={index}>
        <Box
          borderRadius={2}
          textAlign="center"
          bgcolor={theme.palette.grey[200]}
          height={500}
          maxHeight={500}
          sx={{
            cursor: "pointer",
            overflow: "hidden",
          }}
          position="relative"
          onClick={() => onClick(item.index)}
        >
          <Image
            fill
            src={item.link}
            alt="Image"
            objectFit={data.length !== 1 ? "cover" : "contain"}
          />
        </Box>
      </Grid>
    ));
  } else if (data.length > 3 && data.length < 6) {
    const firstRowItems = data.slice(0, 3);
    const secondRowItems = data.slice(3, 5);
    return (
      <>
        {firstRowItems.map((item, index) => (
          <Grid item xs={4} key={index}>
            <Box
              sx={{ cursor: "pointer", overflow: "hidden" }}
              borderRadius={2}
              textAlign="center"
              height={500}
              maxHeight={500}
              position="relative"
              bgcolor={theme.palette.grey[200]}
              onClick={() => onClick(item.index)}
            >
              <Image fill src={item.link} alt="Image" objectFit="cover" />
            </Box>
          </Grid>
        ))}
        <Grid item xs={5 - data.length === 0 ? 6 : 12}>
          {secondRowItems.map((item, index) => (
            <div key={index}>
              <Box
                sx={{ cursor: "pointer", overflow: "hidden" }}
                borderRadius={2}
                textAlign="center"
                height={500}
                maxHeight={500}
                position="relative"
                bgcolor={theme.palette.grey[200]}
                onClick={() => onClick(item.index)}
              >
                <Image fill src={item.link} alt="Image" objectFit="cover" />
              </Box>
            </div>
          ))}
        </Grid>
      </>
    );
  } else {
    const firstRowItems = data.slice(0, 3);
    const secondRowItems = data.slice(3);
    return (
      <>
        {firstRowItems.map((item, index) => (
          <Grid item xs={4} key={index}>
            <Box
              sx={{ cursor: "pointer", overflow: "hidden" }}
              borderRadius={2}
              textAlign="center"
              height={500}
              maxHeight={500}
              position="relative"
              bgcolor={theme.palette.grey[200]}
              onClick={() => onClick(item.index)}
            >
              <Image fill src={item.link} alt="Image" objectFit="cover" />
            </Box>
          </Grid>
        ))}
        <Grid item xs={6}>
          {secondRowItems.map((item, index) => (
            <div key={index}>
              <Box
                sx={{ cursor: "pointer", overflow: "hidden" }}
                borderRadius={2}
                textAlign="center"
                height={500}
                maxHeight={500}
                position="relative"
                bgcolor={theme.palette.grey[200]}
                onClick={() => onClick(item.index)}
              >
                <Image fill src={item.link} alt="Image" objectFit="cover" />
              </Box>
            </div>
          ))}
          <Button color="primary">See more</Button>
        </Grid>
      </>
    );
  }
};
