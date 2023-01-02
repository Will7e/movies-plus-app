import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import tmdbConfigs from "../../api/configs/tmdb.config";
import NavigationSwiper from "./NavigationSwiper";
import MediaVideo from "./MediaVideo";

const MediaVideoSlide = ({ videos }) => {
  return (
    <>
      <NavigationSwiper>
        {videos.map((video, index) => (
          <SwiperSlide key={index}>
            <MediaVideo video={video} />
          </SwiperSlide>
        ))}
      </NavigationSwiper>
    </>
  );
};

export default MediaVideoSlide;
