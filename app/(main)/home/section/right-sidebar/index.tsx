import { useUser } from "@/app/hooks/useUser";
import { theme } from "@/app/theme";
import {
  Avatar,
  Box,
  BoxProps,
  Button,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import { omit } from "lodash";
import React, { useMemo } from "react";
import Invitation from "../../../_components/invitation";
import SuggestedUser from "@/app/components/suggested-user";

const MOCK_CHIPS = [
  "park for dogs",
  "happy cat",
  "meo meo",
  "how to train your cat",
];

interface RightSidebarProps extends BoxProps {}

const RightSidebar = (props: RightSidebarProps) => {
  const { user } = useUser();
  if (!user) return;
  return (
    <Box
      p={2}
      sx={{ overflowY: "scroll", bgcolor: "transparent", ...props?.sx }}
      maxHeight="100%"
      {...omit(props, ["sx"])}
    >
      <Invitation />

      <Divider />

      <Box my={3}>
        <Typography variant="title2">Top trending tags</Typography>

        <Box mt={3} display="flex" gap={1.5} sx={{ flexWrap: "wrap" }}>
          {MOCK_CHIPS.map((chip) => (
            <Chip label={chip} key={chip} />
          ))}
        </Box>
      </Box>

      <Divider />

      {/* <Box my={3}>
        <Typography variant="title2">Suggested user</Typography>

        <Box mt={3}>
          {Array.from({ length: 3 }).map((_, index) => (
            <SuggestedUser key={1 * index} />
          ))}
        </Box>
      </Box> */}
    </Box>
  );
};

export default RightSidebar;
