"use client";

import { theme } from "@/app/theme";
import { ExtendedPetType } from "@/app/types/user";
import { Box, BoxProps, Button, Typography } from "@mui/material";
import Image from "next/image";
import React, { memo } from "react";

const RANDOM_QUOTES_FACT = [
  "Dogs have owners, cats have staff.",
  "A purr is a cat's way of smiling with its whole body.",
  "Fish: the pets that clean their own rooms.",
  "Life is short. Hug your dog.",
  "Chickens: the pets that breakfast with you.",
  "Every dog’s a therapist in a fur coat.",
  "Cats operate on their own terms, not yours.",
  "Fish: masters of zen in your living room.",
  "Paws and reflect—life is better with pets.",
  "Why do dogs always race to the door? They’re on the 'bark'et!",
  "Cluck it up—chickens make everything better!",
  "Cats are not our whole life, but they make our lives whole.",
  "Dogs leave paw prints on your heart, and mud on your floor.",
  "Fish tanks: underwater worlds in a glass.",
  "In a perfect world, every chicken would have a home and every home would have a chicken.",
  "Nine lives, one heart—cats truly captivate.",
  "Every dog should have a home—not every home deserves a dog.",
  "Swim against the current. Be more like a fish.",
  "A dog's wagging tail and a cat's purring heart are the best medicines.",
  "Ruffle some feathers; keep a chicken.",
];

interface SideContentProps extends BoxProps {
  pets: ExtendedPetType[];
}

const SideContent = ({ pets, ...props }: SideContentProps) => {
  return (
    <Box px={2} {...props}>
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

        <Button size="small" variant="text" color="primary">
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
        {!!pets?.length &&
          pets.map((pet) => (
            <Box key={pet.id} mr={2} width={110}>
              <Box borderRadius={3} overflow="hidden">
                <Image
                  src={pet.image}
                  width={110}
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
          ))}
      </Box>

      {/* Follow */}

      <Box >

      </Box>
    </Box>
  );
};

export default memo(SideContent);
