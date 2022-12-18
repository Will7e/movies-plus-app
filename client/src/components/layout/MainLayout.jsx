import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../common/GlobalLoading.jsx"

function MainLayout() {
  return (
    <>
      <GlobalLoading />
      <Box display="flex" minHeight="100vh">
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
      </Box>
    </>
  );
}

export default MainLayout;
