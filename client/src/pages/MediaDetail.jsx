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
import {
  listFavorites,
  removeFavorite,
  addFavorite,
} from "../redux/features/userSlice";
import CircularRate from "../components/common/CircularRate";
import Container from "../components/common/Container";
import tmdbConfigs from "../api/configs/tmdb.config";
import mediaApi from "../api/modules/media.api";
import favoriteApi from "../api/modules/favorite.api";
import ImageHeader from "../components/common/ImageHeader";
import uiConfigs from "../configs/ui.configs";
import CastSlide from "../components/common/CastSlide";
import MediaVideoSlide from "../components/common/MediaVideoSlide";
import ImageSlide from "../components/common/ImageSlide";
import RecommendSlide from "../components/common/RecommendSlide";
import MediaSlide from "../components/common/MediaSlide";
import MediaReview from "../components/common/MediaReview";

function MediaDetail() {
  const { mediaType, mediaId } = useParams();
  const { user, listFavorites } = useSelector((state) => state.user);
  const [media, setMedia] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
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
        setIsFavorite(response.favorite);
        setGenres(response.genres.splice(0, 2));
      }

      if (error) return toast.error(error.message);
    };

    getMedia();
  }, [mediaType, mediaId, dispatch]);

  const onFavoriteClick = async () => {
    if (!user) return dispatch(setAuthModalOpen(true));

    if (onRequest) return;

    if (isFavorite) {
      onRemoveFavorite();
      return;
    }

    setOnRequest(true);

    const body = {
      mediaId: media.id,
      mediaTitle: media.title || media.name,
      mediaType: mediaType,
      mediaPoster: media.poster_path,
      mediaRate: media.vote_average,
    };

    const { response, error } = await favoriteApi.add(body);

    setOnRequest(false);

    if (error) return toast.error(error.message);
    if (response) {
      dispatch(addFavorite(response));
      setIsFavorite(true);
      toast.success(`${media.title || media.name} added as favorite`);
    }
  };

  const onRemoveFavorite = async () => {
    if (onRequest) return setOnRequest(true);

    const favorite = listFavorites.find(
      (e) => Number(e.mediaId) === Number(media.id)
    );

    const { response, error } = await favoriteApi.remove({
      favoriteId: favorite.id,
    });

    setOnRequest(false);

    if (error) toast.error(error.message);
    if (response) {
      dispatch(removeFavorite(favorite));
      setIsFavorite(false);
      console.log("favorite", favorite);
      toast.success(`${favorite.mediaTitle} removed from favorites`);
    }
  };

  console.log("media", media);

  return media ? (
    <>
      <ImageHeader
        imgPath={tmdbConfigs.backdropPath(
          media.backdrop_path || media.poster_path
        )}
      />
      <Box
        sx={{
          color: "primary.contrastText",
          ...uiConfigs.style.mainContent,
        }}
      >
        {/* media content */}
        <Box
          sx={{
            marginTop: { xs: "-10rem", md: "-15rem", lg: "-20rem" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
            }}
          >
            {/* poster */}
            <Box
              sx={{
                width: { xs: "70%", sm: "50%", md: "40%" },
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
              />
            </Box>
            {/* poster */}

            {/* media info */}
            <Box
              sx={{
                width: { xs: "100%", md: "60%" },
                color: "text.primary",
              }}
            >
              <Stack spacing={5}>
                <Typography
                  variant="h4"
                  fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                  fontWeight="700"
                  sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                >
                  {`${media.title || media.name} ${
                    mediaType === tmdbConfigs.mediaType.movie
                      ? media.release_date.split("-")[0]
                      : media.first_air_date.split("-")[0]
                  }`}
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center">
                  <CircularRate value={media.vote_average} />

                  <Divider orientation="vertical" />

                  {genres.map((genre, index) => (
                    <Chip
                      label={genre.name}
                      variant="filled"
                      color="primary"
                      key={index}
                    />
                  ))}
                </Stack>

                <Typography
                  variant="body1"
                  sx={{ ...uiConfigs.style.typoLines(5) }}
                >
                  {media.overview}
                </Typography>

                {/* buttons */}
                <Stack direction="row" spacing={1}>
                  <LoadingButton
                    variant="text"
                    sx={{
                      width: "max-content",
                      "& .MuiButon-starIcon": { marginRight: "0" },
                    }}
                    size="large"
                    startIcon={
                      isFavorite ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderOutlinedIcon />
                      )
                    }
                    loadingPosition="start"
                    loading={onRequest}
                    onClick={onFavoriteClick}
                  />
                  <Button
                    variant="contained"
                    sx={{ width: "max-content" }}
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    onClick={() => videoRef.current.scrollIntoView()}
                  >
                    watch now
                  </Button>
                </Stack>
                <Container header={"Cast"}>
                  <CastSlide casts={media.credits.cast} />
                </Container>
              </Stack>
            </Box>
          </Box>
        </Box>

        <div ref={videoRef} style={{ paddingTop: "2rem  " }}>
          <Container header={"Videos"}>
            <MediaVideoSlide videos={media.videos.results} />
          </Container>
        </div>

        {media?.images.backdrops.length > 0 && (
          <Container header={"Images"}>
            <ImageSlide mode={true} images={media.images.backdrops} />
          </Container>
        )}

        {media?.images.posters.length > 0 && (
          <Container header={"Posters"}>
            <ImageSlide mode={false} images={media.images.posters} />
          </Container>
        )}

        <MediaReview
          mediaType={mediaType}
          media={media}
          reviews={media.reviews}
        />

        <Container header={"Recommend"}>
          {media.recommend.length > 0 && (
            <RecommendSlide medias={media.recommend} mediaType={mediaType} />
          )}
          {media.recommend.length === 0 && (
            <MediaSlide
              mediaType={mediaType}
              mediaCategory={tmdbConfigs.mediaCategory.top_rated}
            />
          )}
        </Container>
      </Box>
    </>
  ) : null;
}

export default MediaDetail;
