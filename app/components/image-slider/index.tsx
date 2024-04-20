import React, { useEffect, useState } from "react";
import { Modal, ModalProps, IconButton, Box } from "@mui/material";
import Image from "next/image";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ImageType } from "@/app/types/user";
import CloseIcon from "@mui/icons-material/Close";
import { theme } from "@/app/theme";

export interface PCImageSliderProps extends Omit<ModalProps, "children"> {
  images: ImageType[];
  activeIndex: number;
}

const PCImageSlider = ({
  images,
  activeIndex,
  ...props
}: PCImageSliderProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(activeIndex);

  if (!images?.length) return null;

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleBack = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    setCurrentImageIndex(activeIndex);
  }, [activeIndex]);

  return (
    <Modal
      sx={{ display: "grid", placeItems: "center", outline: "none", p: 2 }}
      {...props}
    >
      <>
        <IconButton
          onClick={() => props.onClose?.({}, "backdropClick")}
          size="large"
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            zIndex: 10,
            color: theme.palette.common.white,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ position: "relative", width: "100%", maxWidth: 500 }}>
          <IconButton
            onClick={handleBack}
            sx={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <Image
            src={images[currentImageIndex].link}
            alt={`Image ${currentImageIndex + 1} of ${images.length}`}
            width={500}
            height={500}
            layout="intrinsic"
            sizes="100vw"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </>
    </Modal>
  );
};

export default PCImageSlider;
