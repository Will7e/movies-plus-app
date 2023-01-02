import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import MediaItem from "../components/common/MediaItem";
import Container from "../components/common/Container";
import uiConfigs from "../configs/ui.configs";
import favoriteApi from "../api/modules/favorite.api";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { removeFavorite } from "../redux/features/userSlice";
import FavoriteItem from "../components/common/FavoriteItem";

function FavoriteList() {
  const [medias, setmMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const { themeMode } = useSelector((state) => state.themeMode);

  const skip = 8;

  useEffect(() => {
    const getFavorites = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await favoriteApi.getList();
      dispatch(setGlobalLoading(false));

      if (error) toast.error(error.message);
      if (response) {
        setCount(response.length);
        setmMedias([...response]);
        setFilteredMedias([...response].splice(0, skip));
      }
    };

    getFavorites();
  }, [dispatch]);

  const onLoadMore = () => {
    setFilteredMedias([
      ...filteredMedias,
      ...[...medias].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  const onRemoved = (mediaId) => {
    const newMedias = [...medias].filter((e) => e.id !== mediaId);
    setmMedias(newMedias);
    setFilteredMedias([...newMedias].splice(0, page * skip));
    setCount(count - 1);
  };
  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={`Favorites list (${count})`}>
        <Grid
          container
          spacing={1}
          sx={{
            marginRight: "-8px !important",
          }}
        >
          {filteredMedias.map((media, index) => (
            <Grid key={index} item xs={6} sm={4} md={3}>
              <FavoriteItem
                themeMode={themeMode}
                media={media}
                onRemoved={onRemoved}
              />
            </Grid>
          ))}
        </Grid>

        {filteredMedias.length < medias.length && (
          <LoadingButton
            variant={themeMode === "dark" ? "text" : "contained"}
            onClick={onLoadMore}
          >
            load more
          </LoadingButton>
        )}
      </Container>
    </Box>
  );
}

export default FavoriteList;
