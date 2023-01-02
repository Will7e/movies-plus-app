import React, { useState } from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs";
import { setUser } from "../../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import { toast } from "react-toastify";
import TextAvatar from "./TextAvatar";

const UserMenu = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const signOut = () => {
    dispatch(setGlobalLoading(true));
    dispatch(setUser(null));
    toast.success("Logged out");
    setTimeout(() => {
      dispatch(setGlobalLoading(false));
    }, 1);
    navigate("/");
  };

  return (
    <>
      {user && (
        <>
          <Box
            onClick={toggleMenu}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{
              display: "flex",
              gap: 1,
              backgroundColor: "in",
              cursor: "pointer",
            }}
          >
            <TextAvatar w={35} h={35} text={user.displayName} />
            <Typography
              variant="h6"
              sx={{ cursor: "pointer", userSelect: "none" }}
            >
              {user.displayName}
            </Typography>{" "}
          </Box>

          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            PaperProps={{ sx: { padding: 0 } }}
          >
            {menuConfigs.user.map((item, index) => (
              <ListItemButton
                component={Link}
                to={item.path}
                key={index}
                onClick={() => setAnchorEl(null)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography textTransform="uppercase">
                      {item.display}
                    </Typography>
                  }
                />
              </ListItemButton>
            ))}
            <ListItemButton sx={{ borderRadius: "10px" }} onClick={signOut}>
              <ListItemIcon>
                <LogoutOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography textTransform="uppercase">sign out</Typography>
                }
              />
            </ListItemButton>
          </Menu>
        </>
      )}
    </>
  );
};

export default UserMenu;
