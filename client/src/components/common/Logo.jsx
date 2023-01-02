import React from "react";
import { Typography } from "@mui/material";

const Logo = ({ theme }) => {
  return (
    <Typography
      variant="caption"
      component="div"
      fontWeight={"700"}
      fontSize="1.7rem"
      href="/"
      underline="none"
    >
      <a
        href="/"
        style={{
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Movies
        <span
          style={{
            color: theme.palette.primary.main,
          }}
        >
          +
        </span>
      </a>
    </Typography>
  );
};

export default Logo;
