import React, { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, Stack, Tyrography } from "@mui/material";
import { Link } from "react-router-dom";
import tmdbConfigs from "../../api/configs/tmdb.config";
import uiConfigs from "../../configs/ui.configs";
import { routesGen } from "../../routes/routes";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CircularRate from "./CircularRate";
import { useSelector } from "react-redux";
import favoriteUtils from "../../utils/favorite.utils";

const MediaItem = ({ media, mediaType }) => {
  const { listFavorite } = useSelector((state) => state.user);
  const [title, setTitle] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [releaseDate, setReleaseDate] = useState(null);
  const [rate, setRate] = useState(null);

  useEffect(() => {
    setTitle(media.title || media.name || media.mediaTitle);
    setPosterPath(
      tmdbConfigs.posterPath(
        media.poster_path ||
          media.backdrop_path ||
          media.mediaPoster ||
          media.profile_path
      )
    );

    if (mediaType === tmdbConfigs.mediaType.movie) {
      setReleaseDate(media.release_date && media.release_date.split("-")[0]);
    } else {
      setReleaseDate(
        media.first_air_date && media.first_air_date.split("-")[0]
      );
    }
    setRate(media.vote_average || media.mediaRate);
  }, [media, mediaType]);

  return (
    <Link
      to={
        mediaType !== "people"
          ? routesGen.mediaDetail(mediaType, media.id || media.mediaId)
          : routesGen.person(media.id)
      }
    >
      <Box
        sx={{
          ...uiConfigs.style.backgroundImage(posterPath),
          paddingTop: "160%",
          "& :hover .media-info": { opacity: 1, bottom: 0 },
          "& :hover .media-back-drop, &:hover .media-play-btn": { opacity: 1 },
          color: "primary.contrastText",
        }}
      ></Box>
    </Link>
  );
};

export default MediaItem;
