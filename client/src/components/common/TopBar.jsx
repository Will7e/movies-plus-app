import React, { cloneElement, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import menuConfigs from "../../configs/menu.configs";
import { Link } from "react-router-dom";
import { themeModes } from "../../configs/theme.configs";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { setThemeMode } from "../../redux/features/themeModeSlice";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import Sidebar from "./Sidebar";

const ScrollAppBar = ({ children, window }) => {
  const { themeMode } = useSelector((state) => state.themeMode);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    sx: {
      color: trigger
        ? "text.primary"
        : themeMode === themeModes.dark
        ? "primary.contrastText"
        : "text.primary",
      backgroundColor: trigger
        ? "background.paper"
        : themeMode === themeModes.dark
        ? "transparent"
        : "background.paper",
    },
  });
};

const TopBar = () => {
  const { user } = useSelector((state) => state.user);
  const { appState } = useSelector((state) => state.appState);
  const { themeMode } = useSelector((state) => state.themeMode);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const onSwitchTheme = () => {
    const theme =
      themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme));
  };

  const toggleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };
  return (
    <>
      <Sidebar open={sideBarOpen} theme={theme} toggleSideBar={toggleSideBar} />
      <ScrollAppBar>
        <AppBar elevation={0} sx={{ zIndex: 9999 }}>
          <Toolbar
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                color="inherit"
                sx={{ mr: 2, display: { md: "none" } }}
                onClick={toggleSideBar}
              >
                <MenuIcon />
              </IconButton>

              <Box sx={{ display: { xs: "inline-block", md: "none" } }}>
                <Logo theme={theme} />
              </Box>
            </Stack>

            <Box
              flexGrow={1}
              alignItems="center"
              display={{ xs: "none", md: "flex" }}
            >
              <Box sx={{ marginRight: "30px" }}>
                <Logo theme={theme} />
              </Box>

              {menuConfigs.main.map((item, index) => (
                <Button
                  key={index}
                  sx={{
                    color: appState.includes(item.state)
                      ? "primary.contrastText"
                      : "inherit",
                    mr: 2,
                  }}
                  component={Link}
                  to={item.path}
                  variant={appState.includes(item.state) ? "contained" : "text"}
                >
                  {item.display}
                </Button>
              ))}
              {user && (
                <Button
                  key={menuConfigs.user[0]}
                  sx={{
                    color: appState.includes(menuConfigs.user[0].state)
                      ? "primary.contrastText"
                      : "inherit",
                    mr: 2,
                  }}
                  component={Link}
                  to={menuConfigs.user[0].path}
                  variant={appState.includes(menuConfigs.user[0].state) ? "contained" : "text"}
                >
                  {menuConfigs.user[0].display}
                </Button>
              )}

              <IconButton sx={{ color: "inherit" }} onClick={onSwitchTheme}>
                {themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
                {themeMode === themeModes.light && <WbSunnyOutlinedIcon />}
              </IconButton>
            </Box>

            <Stack spacing={3} direction="row" alignItems="center">
              {!user && (
                <Button
                  variant="contained"
                  onClick={() => dispatch(setAuthModalOpen(true))}
                >
                  Sign in
                </Button>
              )}
            </Stack>

            {user && <UserMenu />}
          </Toolbar>
        </AppBar>
      </ScrollAppBar>
    </>
  );
};

export default TopBar;
