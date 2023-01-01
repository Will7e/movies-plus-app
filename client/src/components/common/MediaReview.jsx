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
import { toast } from "react-toastify";
import SendOutLinedIcon from "@mui/icons-material/SendOutlined";
import { useSelector } from "react-redux";
import reviewApi from "../../api/modules/review.api";
import Container from "./Container";
import ReviewItem from "./ReviewItem";
import TextAvatar from "./TextAvatar";


const MediaReview = ({ reviews, media, mediaType }) => {
  const { user } = useSelector((state) => state.user);
  const [listReviews, setListReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);

  const [page, setPage] = useState(1);
  const [onRequest, setOnRequest] = useState(false);
  const [content, setContent] = useState("");
  const [reviewCount, setReviewCount] = useState(0);


  const skip = 4;

  useEffect(() => {
    setListReviews([...reviews]);
    setFilteredReviews([...reviews].splice(0, skip));
    setReviewCount(reviews.length);
  }, [reviews]);

  const onAddReview = async () => {
    if (onRequest) return;
    setOnRequest(true);

    const body = {
      mediaId: media.id,
      mediaType: mediaType,
      content,
      mediaTitle: media.title || media.name,
      mediaPoster: media.poster_path,
    };
    const { response, error } = await reviewApi.add(body);

    setOnRequest(false);

    if (error) return toast.error(error.message);
    if (response) {
      setFilteredReviews([...filteredReviews, response]);
      setReviewCount(reviewCount + 1);
      setContent("");
      toast.success("Review posted");
    }
  };

  const onLoadingMore = () => {
    setFilteredReviews([
      ...filteredReviews,
      ...[...listReviews].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  const onRemoved = (id) => {
    if (listReviews.findIndex((e) => e.id === id) !== -1) {
      const newListReviews = [...listReviews].filter((e) => e.id !== id);
      setListReviews(newListReviews);
      setFilteredReviews([...newListReviews].splice(0, page * skip));
    } else {
      setFilteredReviews([...filteredReviews].filter((e) => e.id !== id));
    }
    setReviewCount(reviewCount - 1);
    toast.success("Review has been removed");

    
  };

  console.log('listReviews', listReviews)
  console.log('filteredReviews', filteredReviews)

  return (
    <Container header={`REVIEWS (${reviewCount})`}>
      <Stack spacing={4} marginBottom={2}>
        {filteredReviews.map((item, index) => (
          <Box key={index}>
            <ReviewItem review={item}  onRemoved={onRemoved} />
            <Divider sx={{ display: { xs: "block", md: "none" } }} />
          </Box>
        ))}

        {filteredReviews.length < listReviews.length && (
          <Button onClick={onLoadingMore}>Load more</Button>
        )}
      </Stack>

      {user && (
        <>
          <Divider />

          <Stack direction={"row"} spacing={2}>
            <TextAvatar text={user.displayName} />
            <Stack flexGrow={1} spacing={2}>
              <Typography fontWeight={"700"} variant="h6">
                {user.displayName}
              </Typography>

              <TextField
                onChange={(e) => setContent(e.target.value)}
                multiline
                rows={4}
                placeholder={"Write your review"}
                variant="outlined"
                value={content}
              />

              <LoadingButton
                onClick={onAddReview}
                loading={onRequest}
                loadingPosition="start"
                startIcon={<SendOutLinedIcon />}
                sx={{ width: "max-content" }}
                variant="contained"
                size="large"
              >
                Post
              </LoadingButton>
            </Stack>
          </Stack>
        </>
      )}
    </Container>
  );
};

export default MediaReview;
