"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import NameWithAvatar from "@/app/components/name-with-avatar";
import PCNotFoundData from "@/app/components/notFoundData";
import PCTextField from "@/app/components/textfield";
import { theme } from "@/app/theme";
import { debounce } from "lodash";
import { FollowerType, FollowingType } from "@/app/types/user";

interface FollowListProps {
  followers: FollowerType[];
  followings: FollowingType[];
}

const FollowList = ({ followers, followings }: FollowListProps) => {
  const router = useRouter();
  const [value, setValue] = useState("Follower");
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = debounce((value) => {
    setSearchValue(value.toLowerCase());
  }, 300);

  const filteredFollowers = useMemo(() => {
    return followers.filter((item) =>
      item.user.name.toLowerCase().includes(searchValue)
    );
  }, [followers, searchValue]);

  const filteredFollowings = useMemo(() => {
    return followings.filter((item) =>
      item.following.name.toLowerCase().includes(searchValue)
    );
  }, [followings, searchValue]);

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={1}
      >
        <Typography fontWeight={600}>Follow</Typography>
        <PCTextField
          autoFocus
          onChange={(e) => handleSearchChange(e.target.value)}
          InputProps={{
            endAdornment: (
              <Image
                alt="search"
                src="/icons/search.svg"
                width={24}
                height={24}
              />
            ),
          }}
          placeholder="Search for users..."
          containerProps={{ sx: { width: 300 } }}
          sx={{ bgcolor: "#E9EAF1" }}
          size="small"
        />
      </Box>
      <Box
        bgcolor={theme.palette.common.white}
        px={0.5}
        py={2}
        borderRadius={2}
        overflow="scroll"
      >
        <Tabs
          value={value}
          onChange={(_, newValue) => setValue(newValue)}
          aria-label="Follow tabs"
        >
          <Tab label="Follower" value="Follower" />
          <Tab label="Following" value="Following" />
        </Tabs>
        <Box>
          {value === "Follower" ? (
            filteredFollowers.length > 0 ? (
              filteredFollowers.map((item) => (
                <NameWithAvatar
                  mt={2}
                  name={item.user.name}
                  key={item.id}
                  onClick={() => router.push("/user/" + item.user.id)}
                />
              ))
            ) : (
              <PCNotFoundData />
            )
          ) : filteredFollowings.length > 0 ? (
            filteredFollowings.map((item) => (
              <NameWithAvatar
                mt={2}
                name={item.following.name}
                key={item.id}
                onClick={() => router.push("/user/" + item.following.id)}
              />
            ))
          ) : (
            <PCNotFoundData />
          )}
        </Box>
      </Box>
    </>
  );
};

export default FollowList;
