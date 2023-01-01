import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import SendOutLinedIcon from "@mui/icons-material/SendOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import reviewApi from "../../api/modules/review.api";
import Container from "./Container";
import TextAvatar from "./TextAvatar";
import { redirect } from "react-router-dom";

const ReviewItem = ({ review, onRemoved }) => {
  const { user } = useSelector((state) => state.user);
  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {
    if (onRequest) return;
    setOnRequest(true);

    const { response, err } = await reviewApi.remove({ reviewId: review.id });

    if (err) toast.error(err.message);
    if (response) onRemoved(review.id);
   
  };

  return (
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
        <TextAvatar text={review.user.displayName} />
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
  );
};

export default ReviewItem;
