import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import { Paper, Box, Toolbar } from "@mui/material";
import Logo from "./LoadingLogo";

export default function GlobalLoading({ theme }) {
  const { globalLoading } = useSelector((state) => state.globalLoading);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (globalLoading) {
      setIsLoading(true);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [globalLoading]);

  if (isLoading)
    return (
      <Paper
        sx={{
          opactity: isLoading ? 1 : 0,
          pointerEvents: "none",
          transition: "all .3s ease",
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 999,
        }}
      >
        <Toolbar />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <Logo theme={theme} />
        </Box>
      </Paper>
    );
}
