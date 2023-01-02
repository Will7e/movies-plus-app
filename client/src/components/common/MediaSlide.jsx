import React, { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import mediaApi from "../../api/modules/media.api";
import { toast } from "react-toastify";
import AutoSwiper from "./AutoSwiper";
import MediaItem from "./MediaItem";
import { Stack } from "@mui/material";

const MediaSlide = ({ mediaType, mediaCategory }) => {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    const getMedias = async () => {
      const { response, error } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });
      if (response) return setMedias(response.results);
      if (error) toast.error(error.message);
    };
    getMedias();
  }, [mediaType, mediaCategory]);

  return (
    <>
      <AutoSwiper>
        {medias.map((media, index) => (
          <SwiperSlide key={index}>
            <MediaItem media={media} mediaType={mediaType} />
          </SwiperSlide>
        ))}
      </AutoSwiper>
    </>
  );
};

export default MediaSlide;
