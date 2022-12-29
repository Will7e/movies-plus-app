import React, { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  Box,
  useTheme,
  Chip,
  Divider,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { toast } from "react-toastify";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import { routesGen } from "../../routes/routes";
import uiConfigs from "../../configs/ui.configs";
import tmdbConfigs from "../../api/configs/tmdb.config";
import genreApi from "../../api/modules/genre.api";
import mediaApi from "../../api/modules/media.api";
import CircularRate from "./CircularRate";

const HeroSlide = ({ mediaType, mediaCategory }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMedias = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });
      if (response) return setMovies(response.results);
      if (error) toast.error(error.message);
      dispatch(setGlobalLoading(false));
    };

    const getGenres = async () => {
      dispatch(setGlobalLoading(true));

      const { response, error } = await genreApi.getList({
        mediaType,
      });
      if (response) {
        setGenres(response.genres);
        getMedias();
        dispatch(setGlobalLoading(false));
      }
      if (error) {
        toast.error(error.message);
        dispatch(setGlobalLoading(true));
      }
    };
    getGenres();
  }, [mediaType, mediaCategory, dispatch]);

  return (
    <Box
      sx={{
        position: "relative",
        color: "primary.contrastText",
        "&::before": {
          content: '""',
          width: "100%",
          height: "30%",
          position: "absolute",
          bottom: 0,
          left: 0,
          pointerEvent: "none",
          ...uiConfigs.style.gradienBgImage[theme.palette.mode],
        },
      }}
    >
      <Swiper
        grabCursor={true}
        loop={true}
        /* modules={[Autoplay]} */
        style={{ width: "100%", height: "max-content" }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                paddingTop: {
                  xs: "130%",
                  sm: "80%",
                  md: "60%",
                  lg: "45%",
                },
                backgroundPosition: "top",
                backgroundSize: "cover",
                backgroundImage: `url(${tmdbConfigs.backdropPath(
                  movie.backdrop_path || movie.poster_path
                )})`,
              }}
            />
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                ...uiConfigs.style.horizontailGradientBgImage[
                  theme.palette.mode
                ],
              }}
            />
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                paddingX: {
                  sm: "10px",
                  md: "5rem",
                  lg: "10rem",
                },
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  paddingX: "30px",
                  color: "text.primary",
                  width: { sm: "unset", md: "30%", lg: "40%" },
                }}
              >
                <Stack spacing={4} direction="column">
                  <Typography
                    variant="h4"
                    fontSize={{
                      xs: "2rem",
                      md: "2rem",
                      lg: "4rem",
                    }}
                    fontWeight="700"
                    sx={{
                      ...uiConfigs.style.typoLines(2, "left"),
                    }}
                  >
                    {movie.title || movie.original_title}
                  </Typography>

                  <Stack spacing={1} direction="row" alignItems="center">
                    <CircularRate value={movie.vote_average} />
                    <Divider orientation="vertical" />
                    {[...movie.genre_ids].slice(0, 3).map((genreId, index) => (
                      <Chip
                        label={genres.find((e) => e.id === genreId).name}
                        variant="filled"
                        color="primary"
                        key={index}
                      ></Chip>
                    ))}
                  </Stack>

                  <Typography
                    variant="body1"
                    sx={{
                      ...uiConfigs.style.typoLines(3),
                    }}
                  >
                    {movie.overview}
                  </Typography>

                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    component={Link}
                    to={routesGen.mediaDetail(mediaType, movie.id)}
                    sx={{
                      width: "max-content",
                    }}
                  >
                    Watch now
                  </Button>
                </Stack>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HeroSlide;
