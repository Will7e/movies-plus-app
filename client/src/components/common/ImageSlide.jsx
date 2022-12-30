import { Box } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import tmdbConfigs from "../../api/configs/tmdb.config";
import NavigationSwiper from "./NavigationSwiper";

import React from "react";
import AutoSwiper from "./AutoSwiper";

const ImageSlide = ({ images, mode }) => {
  return mode ? (
    <NavigationSwiper>
      {images.splice(0, 10).map((item, index) => (
        <SwiperSlide key={index}>
          <Box
            sx={{
              paddingTop: "60%",
              backgroundPosition: "top",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(${tmdbConfigs.backdropPath(
                item.file_path
              )})`,
            }}
          />
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  ) : (
    <AutoSwiper>
      {images.splice(0, 15).map((item, index) => (
        <SwiperSlide key={index}>
          <Box
            sx={{
              margin:"0.3rem",
              paddingTop: "160%",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundImage: `url(${tmdbConfigs.posterPath(item.file_path)})`,
            }}
          />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default ImageSlide;
