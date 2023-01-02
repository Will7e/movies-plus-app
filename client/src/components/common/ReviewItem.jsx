import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Box, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import reviewApi from "../../api/modules/review.api";
import TextAvatar from "./TextAvatar";
import { Link } from "react-router-dom";
import tmdbConfigs from "../../api/configs/tmdb.config";
import { routesGen } from "../../routes/routes";
import uiConfigs from "../../configs/ui.configs";

const ReviewItem = ({ review, onRemoved, reviewItemFor }) => {
  const { user } = useSelector((state) => state.user);
  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {
    if (onRequest) return;
    setOnRequest(true);

    const { response, err } = await reviewApi.remove({ reviewId: review.id });
    setOnRequest(false);
    if (err) toast.error(err.message);
    if (response) {
      toast.success(`${review.mediaTitle}: " ${review.content} " has been removed. `);
      onRemoved(review.id);
    }
  };


  return reviewItemFor === "mediaDetail" ? (
    <Box
      sx={{
        padding: 2,
        borderRadius: "5px",
        position: "relative",
        opacity: onRequest ? 0.6 : 1,
        "&:hover": { backgroundColor: "background.paper" },
      }}
    >
      <Stack spacing={2} direction={"row"}>
        <TextAvatar w={40} h={40} text={review.user.displayName} />
        <Stack spacing={2} flexGrow={1}>
          <Stack spacing={1}>
            <Typography>{review.user.displayName}</Typography>

            <Typography variant="caption">
              {dayjs(review.createdAt).format("DD-MM-YY HH:mm:ss")}
            </Typography>
          </Stack>
          <Typography variant="body1">{review.content}</Typography>
        </Stack>

        {user && user.id === review.user.id && (
          <LoadingButton
            sx={{
              position: { xs: "relative", md: "absolute" },
              right: { xs: 0, md: "10px" },
              marginTop: { xs: 2, md: 0 },
              width: "max-content",
            }}
            onClick={onRemove}
            loading={onRequest}
            loadingPosition="start"
            startIcon={<DeleteIcon />}
            variant="contained"
          >
            Remove
          </LoadingButton>
        )}
      </Stack>
    </Box>
  ) : reviewItemFor === "reviewList" ? (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        padding: 1,
        opacity: onRequest ? 0.6 : 1,
        "&:hover": { backgroundColor: "background.paper" },
      }}
    >
      <Box sx={{ width: { xs: 0, md: "10%" } }}>
        <Link
          to={routesGen.mediaDetail(review.mediaType, review.mediaid)}
          style={{ color: "unset", textDecoration: "none" }}
        >
          <Box
            sx={{
              paddingTop: "160%",
              ...uiConfigs.style.backgroundImage(
                tmdbConfigs.posterPath(review.mediaPoster)
              ),
            }}
          />
        </Link>
      </Box>

      <Box
        sx={{
          width: { xs: "100%", md: "80%" },
          padding: { xs: 0, md: "0 2rem" },
        }}
      >
        <Stack spacing={1}>
          <Link
            to={routesGen.mediaDetail(review.mediaType, review.mediaid)}
            style={{ color: "unset", textDecoration: "none" }}
          >
            <Typography
              variant="h6"
              sx={{ ...uiConfigs.style.typoLines(1, "left") }}
            >
              {review.mediaTitle}
            </Typography>
          </Link>
          <Typography variant="caption">
            {dayjs(review.createdAt).format("DD-MM-YYYY HH:mm:ss")}
          </Typography>
          <Typography>{review.content}</Typography>
        </Stack>
      </Box>

      <LoadingButton
        variant="contained"
        sx={{
          position: { xs: "relative", md: "absolute" },
          right: { xs: 0, md: "10px" },
          marginTop: { xs: 2, md: 0 },
          width: "max-content",
        }}
        startIcon={<DeleteIcon />}
        loadingPosition="start"
        loading={onRequest}
        onClick={onRemove}
      >
        remove
      </LoadingButton>
    </Box>
  ) : null;
};

export default ReviewItem;
