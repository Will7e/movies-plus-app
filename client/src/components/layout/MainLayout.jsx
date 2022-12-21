import React from "react";
import { Box,useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../common/GlobalLoading.jsx"
import Footer from "../common/Footer.jsx";
import TopBar from "../common/TopBar.jsx";
import { AuthModal } from "../common/AuthModal.jsx";

function MainLayout() {
  const theme = useTheme()
  return (
    <>
    <AuthModal theme={theme}/>
      <GlobalLoading theme={theme} />
      <Box display="flex"  minHeight="100vh">
        <TopBar/>
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>

          
      </Box>
      <Footer theme={theme}/>
    </>
  );
}

export default MainLayout;
