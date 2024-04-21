"use client";

import PCNotFoundData from "@/app/components/notFoundData";
import { theme } from "@/app/theme";
import { ExtendedPetType, FollowerType, FollowingType } from "@/app/types/user";
import { Box, BoxProps, Button, Typography } from "@mui/material";
import Image from "next/image";
import React, { memo } from "react";
import FolowList from "../follow-list";
import { useCreatePetModal } from "@/app/hooks/useCreatePetModal";

const RANDOM_QUOTES_FACT = [
  "Cats need regular vet checkups to keep purring.",
  "Cats love a good scratching post to save your furniture.",
  "Cats appreciate a clean and odor-free litter box.",
  "Cats enjoy toys that stimulate their hunting instincts.",
  "Cats require some safe outdoor time, like a catio or on a harness.",
  "Dogs are happier with daily walks to keep fit.",
  "Dogs benefit from training with positive reinforcement techniques.",
  "Dogs need early socialization with humans and other dogs.",
  "Dogs like their minds stimulated with puzzle toys.",
  "Dogs love having a comfy bed for restful sleep.",
  "Birds thrive in a safe and engaging cage environment.",
  "Birds benefit from a diet that mimics their natural foods.",
  "Birds need their cages cleaned regularly to prevent diseases.",
  "Birds enjoy out-of-cage time in a secure area daily.",
  "Birds need daily interaction to bond with their human.",
  "Fish require maintained water quality with regular testing and changes.",
  "Fish thrive on a balanced diet appropriate for their species.",
  "Fish need their tank kept away from direct sunlight to control algae growth.",
  "Fish enjoy tanks decorated with plants for shelter and stress relief.",
  "Fish health can be monitored by watching for signs of stress or illness.",
  "Chickens need a predator-proof coop for safety.",
  "Chickens lay more eggs when collected regularly.",
  "Chickens enjoy a varied diet of grains and vegetables.",
  "Chickens require enough space to roam and peck.",
  "Chickens need regular checks for pests like mites or lice.",
  "All pets need fresh water available at all times.",
  "All pets should keep up with routine vaccinations and pest prevention.",
  "All pets benefit from spaying or neutering to prevent unwanted litters.",
  "All pets have specific needs and behaviors to learn about.",
  "All pets deserve patience and love; they’re part of your family.",
];

interface SideContentProps extends BoxProps {
  pets: ExtendedPetType[];
  followers: FollowerType[];
  followings: FollowingType[];
  showQuotes?: boolean;
}

const SideContent = ({
  followers,
  followings,
  pets,
  showQuotes = true,
  ...props
}: SideContentProps) => {
  const { onToggle } = useCreatePetModal();

  return (
    <Box px={2} pb={5} overflow="scroll" {...props}>
      {showQuotes && (
        <Box position="relative">
          <Image
            width={0}
            height={0}
            alt="Quotes"
            src="/quote.png"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            objectFit="cover"
          />
          <Typography
            sx={{
              position: "absolute",
              top: "50%",
              width: "100%",
              p: 2,
              color: theme.palette.common.white,
              fontWeight: 600,
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            {
              RANDOM_QUOTES_FACT[
                Math.floor(Math.random() * RANDOM_QUOTES_FACT.length)
              ]
            }
          </Typography>
        </Box>
      )}

      {/* Pet */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={1}
      >
        <Typography fontWeight={600}>
          Pet{" "}
          {pets.length > 0 && (
            <Typography
              fontWeight={700}
              display="inline"
              color={theme.palette.primary.main}
            >
              ({pets.length})
            </Typography>
          )}
        </Typography>

        <Button
          onClick={onToggle}
          size="small"
          variant="text"
          color="primary"
          sx={{ color: theme.palette.primary.main }}
        >
          Add new pet
        </Button>
      </Box>
      <Box
        bgcolor={theme.palette.common.white}
        px={0.5}
        py={2}
        borderRadius={2}
        display="flex"
        overflow="scroll"
      >
        {!!pets?.length ? (
          pets.map((pet) => (
            <Box key={pet.id} mr={2} width={110}>
              <Box borderRadius={3} overflow="hidden">
                <Image
                  src={pet.image}
                  width={120}
                  objectFit="cover"
                  height={160}
                  alt="Pet profile"
                />
              </Box>
              <Typography textAlign="center" fontWeight={600}>
                {pet.name}
              </Typography>
              <Typography
                variant="body2"
                mt={0.25}
                textAlign="center"
                fontWeight={200}
              >
                {pet.pet_type.name}
              </Typography>
            </Box>
          ))
        ) : (
          <PCNotFoundData />
        )}
      </Box>

      {/* Follow */}

      <FolowList followers={followers} followings={followings} />
    </Box>
  );
};

export default memo(SideContent);
