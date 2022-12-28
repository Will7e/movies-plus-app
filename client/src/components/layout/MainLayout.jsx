import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../common/GlobalLoading.jsx";
import Footer from "../common/Footer.jsx";
import TopBar from "../common/TopBar.jsx";
import { AuthModal } from "../common/AuthModal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import userApi from "../../api/modules/user.api.js";
import favoriteApi from "../../api/modules/favorite.api";
import { setListFavorites, setUser } from "../../redux/features/userSlice";
import { display } from "@mui/system";

function MainLayout() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const authUser = async () => {
      const { response, err } = await userApi.getInfo();
      if (response) return dispatch(setUser(response));
      if (err) return dispatch(setUser(null));
    };
    authUser();
  }, [dispatch]);

  useEffect(() => {
    const getFavoriteList = async () => {
      const { response, err } = await favoriteApi.getList();
      if (response) return dispatch(setListFavorites(response));
      if (err) return toast.error(err.message);
    };
    if (user) getFavoriteList();
    if (!user) dispatch(setListFavorites([]));
  }, [user, dispatch]);

  const theme = useTheme();
  return (
    <>
      <AuthModal theme={theme} />
      <GlobalLoading theme={theme} />
      <Box display="flex" minHeight="100vh">
        <TopBar />
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
      </Box>
      <Footer theme={theme} />
    </>
  );
}

export default MainLayout;
