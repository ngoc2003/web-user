"use client";
import { theme } from "@/app/theme";
import {
  Avatar,
  Box,
  Divider,
  Icon,
  IconButton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import TextsmsRoundedIcon from "@mui/icons-material/TextsmsRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import PCTextField from "../textfield";
import { useUser } from "@/app/hooks/useUser";
import Comment from "../comment";

const POST_ACTIONS = [
  {
    label: "Like",
    icon: PetsOutlinedIcon,
  },
  {
    label: "Comment",
    icon: TextsmsRoundedIcon,
  },
  {
    label: "Share",
    icon: ShareRoundedIcon,
  },
];

const Post = () => {
  const { user } = useUser();

  if (!user) return;

  return (
    <Box
      p={3}
      mt={5}
      boxShadow="0 1px 1px 0 rgba(0,0,0,0.25)"
      borderRadius={1.2}
      bgcolor={theme.palette.common.white}
    >
      <Box display="flex" alignItems="center">
        <Avatar sx={{ bgcolor: theme.palette.primary.light }}>N</Avatar>
        <Box ml={2} flex={1}>
          <Typography fontWeight={600}>Harry James</Typography>
          <Typography color={theme.palette.grey[600]}>1h ago</Typography>
        </Box>
        <IconButton>
          <MoreHorizRoundedIcon />
        </IconButton>
      </Box>
      <Typography mt={1}>I have something useful want to share </Typography>
      <Box position="relative" height={400} mt={1.5}>
        <Image
          src="/demoPost.png"
          fill
          alt="Post"
          style={{
            objectFit: "cover",
          }}
        />
      </Box>

      <Box
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
      </Box>

      <Divider sx={{ my: 1.5 }} />

      <Box display="flex">
        {POST_ACTIONS.map((action) => (
          <Box
            key={action.label}
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton>
              <Icon component={action.icon} />
            </IconButton>
            <Typography
              ml={1}
              variant="footnote"
              color={theme.palette.grey[500]}
            >
              {action.label}
            </Typography>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 1.5 }} />

      <Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="footnote" color={theme.palette.grey[600]}>
            See all comments
          </Typography>
          <IconButton>
            <TuneRoundedIcon />
          </IconButton>
        </Box>
        <Box>
          <Comment
            id={user.id}
            data={{
              user: {
                id: "2",
                name: "Bùi Thúy Anh",
                address: "Hà Đông",
                birthday: "2005-12-02",
                email: "buithuyngoc2k3@gmail.com",
                sex: "female",
              },
              comment: `Wonderful! Thank you so muchhh ❤ Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim`,
            }}
          />
          <Comment
            id={user.id}
            data={{
              user: {
                id: "2",
                name: "Bùi Thúy Anh",
                address: "Hà Đông",
                birthday: "2005-12-02",
                email: "buithuyngoc2k3@gmail.com",
                sex: "female",
              },
              comment: `Wonderful! Thank you so muchhh ❤ Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim`,
            }}
          />
          <Typography
            sx={{ textDecoration: "underline" }}
            textAlign="right"
            color={theme.palette.grey[600]}
            fontWeight={600}
            mt={1}
          >
            See 28 more
          </Typography>
        </Box>
      </Box>

      <Box display="flex" alignItems="center" mt={2}>
        <Avatar sx={{ bgcolor: theme.palette.primary.light, mr: 3 }}>
          {user.name.charAt(0)}
        </Avatar>
        <PCTextField
          fullWidth
          placeholder={`Hey ${user.name.split(" ")[0]}, put your comment here.`}
        />
      </Box>
    </Box>
  );
};

export default Post;
