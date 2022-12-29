import React, { useState, useEffect, useRef } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CircularRate from "../components/common/CircularRate";
import Container from "../components/common/Container";
import tmdbConfigs from "../api/configs/tmdb.config";
import mediaApi from "../api/modules/media.api";
import favoriteApi from "../api/modules/favorite.api";
function MediaDetail() {
  const { mediaType, mediaId } = useParams();
  const { user, listFavorites } = useSelector((state) => state.user);
  
  const [media, setMedia] = useState()
  const [isFavorite, setFavorite] = useState(false)
  const [onRequest, setOnRequest] = useState(false)
  const [genres, setGenres] = useState([0])

  
  
  
  return <div>MediaDetail</div>;
}

export default MediaDetail;
