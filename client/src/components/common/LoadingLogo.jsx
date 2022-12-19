import React from "react";
import {Box} from "@mui/material";
import CircularProgress from "./CustomCircularProgress";
import Logo from "./Logo";

function LoadingLogo({theme}) {
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
       <Logo theme={theme}/>
      </Box>
    </>
  );
}

export default LoadingLogo;
