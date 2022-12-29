import React, { useState, useEffect, useRef } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import { setListFavorites, removeFavorite } from "../redux/features/userSlice";
import CircularRate from "../components/common/CircularRate";
import Container from "../components/common/Container";
import tmdbConfigs from "../api/configs/tmdb.config";
import mediaApi from "../api/modules/media.api";
import favoriteApi from "../api/modules/favorite.api";
import ImageHeader from "../components/common/ImageHeader";
import uiConfigs from "../configs/ui.configs";
import { margin } from "@mui/system";
function MediaDetail() {
  const { mediaType, mediaId } = useParams();
  const { user, listFavorites } = useSelector((state) => state.user);

  const [media, setMedia] = useState();
  const [isFavorite, setFavorite] = useState(false);
  const [onRequest, setOnRequest] = useState(false);
  const [genres, setGenres] = useState([]);

  const dispatch = useDispatch();
  const videoRef = useRef(null);

  useEffect(() => {
    const getMedia = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await mediaApi.getDetail({
        mediaType,
        mediaId,
      });
      dispatch(setGlobalLoading(false));

      if (response) {
        setMedia(response);
        setFavorite(response.isFavorite);
        setGenres(response.genres.splice(0, 2));
      }

      if (error) return toast.error(error.message);
    };

    getMedia();
  }, [mediaType, mediaId, dispatch]);

  return media ? (
    <>
      <ImageHeader
        imgPath={tmdbConfigs.backdropPath(
          media.backdrop_path || media.posterPath
        )}
      />
      <Box
        sx={{
          color: "primary.contrastText",
          ...uiConfigs.style.mainContent,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
          }}
        >
          <Box
            sx={{
              width: { xs: "70%", sm: "50%", md: "35%" },
              margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" },
            }}
          >
            <Box
              sx={{
                paddingTop: "140%",
                ...uiConfigs.style.backgroundImage(
                  tmdbConfigs.posterPath(
                    media.poster_path || media.backdrop_path
                  )
                ),
              }}
            ></Box>

            <Box
              sx={{
                width: { xs: "100%", md: "60%" },
                color: "text.primary",
              }}
            >
              <Stack spacing={5}>
                {/* title*/}
                <Typography sx={{...uiConfigs.style.typoLines(2,"left")}} fontWeight="700" variant="h4" fontSize={{xs:"2rem", md:"2rem", lg:"4rem"}}>
                  {`${media.title || media.name} ${
                    mediaType === tmdbConfigs.mediaType.movie
                      ? media.release_date.split("-")[0]
                      : media.first_air_date.split("-")[0]
                  }`}
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  ) : null;
}

export default MediaDetail;
