"use client";
import { useUser } from "@/app/hooks/useUser";
import { theme } from "@/app/theme";
import {
  Avatar,
  Box,
  BoxProps,
  Button,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import React, { memo, useEffect, useMemo, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CreatePostBox from "@/app/(main)/_components/create-post-box";
import { ExtendedPostType, ExtendedUserType } from "@/app/types/user";
import Post from "@/app/components/post";
import SideContent from "../side-content";
import { useEditProfileModal } from "@/app/hooks/useEditProfileModal";
import EditProfileModal from "@/app/components/modal/EditProfileModal";
import CheckIcon from "@mui/icons-material/Check";
import { useFollow, useUnfollow } from "@/app/services/follow";
import toast from "react-hot-toast";
interface UserProfileMainContent extends BoxProps {
  user: ExtendedUserType;
}

const UserProfileMainContent = ({ user, ...props }: UserProfileMainContent) => {
  const isLaptop = useMediaQuery(theme.breakpoints.up("xl"));
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { user: currentUser } = useUser();
  const { isOpen, onClose, onToggle } = useEditProfileModal();
  const { mutate: follow, isLoading: isFollowLoading } = useFollow();
  const { mutate: unfollow, isLoading: isUnfollowLoading } = useUnfollow();

  const [isFollowing, setIsFollowing] = useState(
    user.followers?.length &&
      user.followers.some((f) => f?.user_id === currentUser?.id)
  );

  const handleFollow = () => {
    if (user.id) {
      if (!isFollowing) {
        follow(user.id, {
          onSuccess: () => {
            setIsFollowing(true);
            toast.success("Follow user");
          },
        });
      } else {
        unfollow(user.id, {
          onSuccess: () => {
            setIsFollowing(false);
            toast.success("Unfollow user");
          },
        });
      }
    }
  };

  const isAuthor = useMemo(() => {
    return user?.id + "" === currentUser?.id + "";
  }, [currentUser?.id, user?.id]);

  useEffect(() => {
    setIsFollowing(
      user.followers?.length &&
        user.followers.some((f) => f?.user_id === currentUser?.id)
    );
  }, [currentUser?.id, user.followers]);

  if (!user || !user.name || !currentUser) {
    return null;
  }

  return (
    <Box borderRadius={2} pb={4} sx={{ overflowY: "scroll" }} {...props}>
      <Box p={2} bgcolor={theme.palette.common.white} borderRadius={2} mb={2}>
        <Box borderRadius={2} overflow="hidden">
          <Image
            sizes="100vw"
            width={0}
            height={0}
            alt="cover"
            src={"/demo_cover.png"}
            objectFit="cover"
            style={{ width: "100%", height: isLaptop ? 350 : 250 }}
          />
        </Box>
        <Box
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          px={2}
          pt={1}
        >
          <Box
            p={0.5}
            display="inline-block"
            bgcolor={theme.palette.common.white}
            borderRadius={9999}
            position="absolute"
            top={-60}
          >
            <Avatar
              sx={{
                bgcolor: theme.palette.primary.light,
                width: 96,
                height: 96,
              }}
            >
              {user.name.charAt(0)}
            </Avatar>
          </Box>
          <Typography pl={12} ml={3} variant="title2">
            {user.name}
          </Typography>
          {isAuthor && (
            <Button
              startIcon={<EditIcon />}
              size="small"
              color="primary"
              variant="contained"
              onClick={onToggle}
            >
              Edit profile
            </Button>
          )}
          {!isAuthor && isFollowing && (
            <Button
              startIcon={<CheckIcon />}
              size="small"
              color="primary"
              variant="contained"
              disabled={isUnfollowLoading}
              onClick={handleFollow}
            >
              Following
            </Button>
          )}
          {!isAuthor && !isFollowing && (
            <Button
              size="small"
              color="primary"
              variant="contained"
              disabled={isFollowLoading}
              onClick={handleFollow}
            >
              Follow
            </Button>
          )}
        </Box>
      </Box>

      <CreatePostBox />

      {isMobile && (
        <SideContent
          showQuotes={false}
          followers={user.followers}
          followings={user.following}
          pets={user.pets}
        />
      )}

      <Box>
        {!!user.posts?.length &&
          user.posts.map((post: ExtendedPostType) => (
            <Post key={post.id} {...post} />
          ))}
      </Box>
    </Box>
  );
};

export default memo(UserProfileMainContent);
