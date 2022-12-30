import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import tmdbConfigs from "../../api/configs/tmdb.config";
import uiConfigs from "../../configs/ui.configs";
import { routesGen } from "../../routes/routes";
const CastSlide = ({ casts }) => {
  return (
    <Box
      sx={{
        "& .swiper-slide": {
          width: { xs: "50%", md: "25%", lg: "20.5%" },
          color: "primary.contrastText",
        },
      }}
    >
      <Swiper
        style={{ width: "100%", height: "max-content" }}
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={"auto"}
      >
        {casts?.map((cast, index) => (
          <SwiperSlide key={cast.id}>
            <Link to={routesGen.person(cast.id)}>
              <Box
                sx={{
                  paddingTop: "120%",
                  color: "secondary.contrastText",
                  ...uiConfigs.style.backgroundImage(
                    tmdbConfigs.posterPath(cast.profile_path)
                  ),
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "max-content",
                    bottom: 0,
                    padding: "10px",
                    backgroundColor: "rgba(0,0,0,0.6)",
                  }}
                >
                  <Typography
                    sx={{
                      ...uiConfigs.style.typoLines(1, "left"),
                    }}
                  >
                    {cast.name}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default CastSlide;
