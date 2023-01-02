import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import MediaItem from "../common/MediaItem";
import favoriteApi from "../../api/modules/favorite.api";
import { removeFavorite } from "../../redux/features/userSlice";

const FavoriteItem = ({ media, onRemoved, themeMode }) => {
  const dispatch = useDispatch();
  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {
    if (onRequest) return;
    setOnRequest(true);

    const { response, error } = await favoriteApi.remove({
      favoriteId: media.id,
    });
    setOnRequest(false);

    if (error) toast.error(error.message);

    if (response) {
      dispatch(removeFavorite({ mediaId: media.id }));
      onRemoved(media.id);
      toast.success(`${media.mediaTitle} removed from favorites`);
    }
  };

  return (
    <>
      <MediaItem media={media} mediaType={media.media_type} />
      <LoadingButton
        loading={onRequest}
        onClick={onRemove}
        loadingPosition="start"
        startIcon={<DeleteIcon />}
        sx={{
          marginTop: 2,
        }}
        fullWidth
        variant={themeMode === "dark" ? "text" : "contained"}
      >
        Delete
      </LoadingButton>
    </>
  );
};

export default FavoriteItem;
