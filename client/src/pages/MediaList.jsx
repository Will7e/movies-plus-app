import React, { useEffect, useMemo, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import tmdbConfigs from "../api/configs/tmdb.config";
import mediaApi from "../api/modules/media.api";
import uiConfigs from "../configs/ui.configs";
import usePrevious from "../hooks/usePrevious";
import HeroSlide from "../components/common/HeroSlide";
import MediaGrid from "../components/common/MediaGrid";
import { setAppState } from "../redux/features/appStateSlice";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { toast } from "react-toastify";

function MediaList() {
  const { mediaType } = useParams();
  const [medias, setMedias] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [currCategory, setCurrCategory] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const prevMediaType = usePrevious(mediaType);
  const dispatch = useDispatch();
  const mediaCategories = useMemo(() => ["popular", "top_rated"], []);
  const category = ["popular", "top rated"];
  const { themeMode } = useSelector((state) => state.themeMode);

  useEffect(() => {
    dispatch(setAppState(mediaType));
    window.scrollTo(0, 0);
  }, [dispatch, mediaType]);

  useEffect(() => {
    const getMedias = async () => {
      if (currPage === 1) dispatch(setGlobalLoading(true));
      setMediaLoading(true);

      const { response, error } = await mediaApi.getList({
        mediaType,
        mediaCategory: mediaCategories[currCategory],
        page: currPage,
      });

      setMediaLoading(false);
      dispatch(setGlobalLoading(false));

      if (error) toast.error(error.message);
      if (response) {
        if (currPage !== 1) setMedias((m) => [...m, ...response.results]);
        else setMedias([...response.results]);
      }
      if (mediaType !== prevMediaType) {
        setCurrCategory(0);
        setCurrPage(1);
      }
    };
    getMedias();
  }, [
    mediaType,
    currCategory,
    prevMediaType,
    currPage,
    mediaCategories,
    dispatch,
  ]);

  const onCategoryChange = (categoryIndex) => {
    if (currCategory === categoryIndex) return;
    setMedias([]);
    setCurrPage(1);
    setCurrCategory(categoryIndex);
  };

  const onLoadMore = () => setCurrPage(currPage + 1);

  return (
    <>
      <HeroSlide
        mediaType={mediaType}
        mediaCategory={mediaCategories[currCategory]}
      />

      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
          sx={{ marginBottom: 3 }}
        >
          <Typography fontWeight={"700"} variant="h5">
            {mediaType === tmdbConfigs.mediaType.movie ? "Movies" : "TV Series"}
          </Typography>

          <Stack spacing={2} direction="row">
            {category.map((category, index) => (
              <Button
                onClick={() => onCategoryChange(index)}
                key={index}
                size="large"
                variant={currCategory === index ? "contained" : "text"}
                sx={{
                  color:
                    currCategory === index
                      ? "primary.contrastText "
                      : "text.primary",
                }}
              >
                {category}
              </Button>
            ))}
          </Stack>
        </Stack>

        <MediaGrid mediaType={mediaType} medias={medias} />
        <LoadingButton
          onClick={onLoadMore}
          loading={mediaLoading}
          color={"primary"}
          variant={themeMode === "dark" ? "text" : "contained"}
          fullWidth
          sx={{ marginTop: 8 }}
        >
          Load more
        </LoadingButton>
      </Box>
    </>
  );
}

export default MediaList;
