import React, { useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";

import { Box, Divider, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { setGlobalLoading } from "../redux/features/globalLoadingSlice";

import reviewApi from "../api/modules/review.api";
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Container";
import ReviewItem from "../components/common/ReviewItem";

function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const { themeMode } = useSelector((state) => state.themeMode);

  const skip = 6;

  useEffect(() => {
    const getReviews = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await reviewApi.getList();
      dispatch(setGlobalLoading(false));

      if (error) toast.error(error.message);
      if (response) {
        setCount(response.length);
        setReviews([...response]);
        setFilteredReviews([...response].splice(0, skip));
      }
    };

    getReviews();
  }, [dispatch]);

  const onLoadMore = () => {
    setFilteredReviews([
      ...filteredReviews,
      ...[...reviews].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  const onRemoved = (mediaId) => {
    const newMedias = [...reviews].filter((e) => e.id !== mediaId);
    setReviews(newMedias);
    setFilteredReviews([...newMedias].splice(0, page * skip));
    setCount(count - 1);
  };

  return (
    <Box
      sx={{
        ...uiConfigs.style.mainContent,
      }}
    >
      <Container header={`Review list (${count})`}>
        <Stack spacing={2}>
          {filteredReviews.map((review, index) => (
            <Box key={review.id}>
              <ReviewItem
                onRemoved={onRemoved}
                review={review}
                reviewItemFor={"reviewList"}
              />
              <Divider
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              />
            </Box>
          ))}

          {filteredReviews.length < reviews.length && (
            <LoadingButton
              variant={themeMode === "dark" ? "text" : "contained"}
              onClick={onLoadMore}
            >
              Load more
            </LoadingButton>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

export default ReviewList;
