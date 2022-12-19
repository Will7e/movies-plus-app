import React, { useState } from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs";
import { setUser } from "../../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";

const UserMenu = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleMenu = (e) => setAnchorEl(e.currentTaget);

  return (
    <>
      {user && (
        <>
          <Typography
            onClick={toggleMenu}
            variant="h6"
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            {user.displayName}
          </Typography>
        </>
      )}
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
                <Typography textTransform={"uppercase"}>
                  {item.display}
                </Typography>
              }
            ></ListItemText>
          </ListItemButton>
        ))}
      </Menu>
    </>
  );
};

export default UserMenu;
