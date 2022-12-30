import React from "react";
import { Box } from "@mui/material";
import { Navigation, Pagination } from "swiper";
import { Swiper } from "swiper/react";
import { red } from "@mui/material/colors";

const NavigationSwiper = ({ children }) => {
  return (
    <Box
      sx={{
        "& .swiper-slide": {
          width: "100%",
          opacity: "0.6",
          paddingBottom: "3rem",
        },
        "& .swiper-slide-active": { opacity: 1 },
        "& .swiper-pagination-bullet": { backgroundColor: "white" },
        "& .swiper-button-next, & .swiper-button-prev": {
          color: "text.primary",
        },
        "&::after": {
          fontSize: { xs: "1rem", md: "4rem" },
        },
        "& .swiper": {
          paddingX: { xs: "1rem", md: "4rem" },
        },
      }}
    >
      <Swiper
        style={{
          width: "100%",
          height: "max-content",
        }}
        modules={[Navigation, Pagination]}
        navigation={true}
        pagination={{ clickable: true }}
        grabCursor={true}
        spaceBetween={10}
      >
        {children}
      </Swiper>
    </Box>
  );
};

export default NavigationSwiper;
