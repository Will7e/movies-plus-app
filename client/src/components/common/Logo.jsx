import React from "react";
import { Typography, useTheme, Box } from "@mui/material";
import CircularProgress from "./CustomCircularProgress";

function Logo() {
  const theme = useTheme();
  return (
    <>
      <CircularProgress  />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          fontWeight={"700"}
          fontSize="1.7rem"
        >
          <div>
            Next
            <span
              style={{
                color: theme.palette.primary.main,
              }}
            >
              Flix
            </span>
          </div>
        </Typography>
      </Box>
    </>
  );
}

export default Logo;
