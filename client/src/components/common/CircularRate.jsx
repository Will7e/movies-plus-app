import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";

const CircularRate = ({ value,color }) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-block",
        width: "max-content",
      }}
    >
      <CircularProgress
        variant="determinate"
        value={value * 10}
        size={50}
        color="success"
      />

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems:"center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          fontWeight="700"
          color={color}
          sx={{
            marginTop: "-5px",
          }}
        >
          {((value * 10) / 10).toFixed(1)}
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularRate;
