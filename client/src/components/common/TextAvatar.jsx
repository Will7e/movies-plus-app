import { Avatar } from "@mui/material";

import React from "react";

const TextAvatar = ({ text, w, h }) => {
  const stringToColor = (str) => {
    let hash = 0;
    let i;

    for (i = 0; i < str?.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  };

  return (
    <Avatar
      sx={{
        backgroundColor: stringToColor(text),
        width: w,
        height: h,
      }}
      children={`${text.split(" ")[0][0]}${
        text.split(" ")[1] ? text.split(" ")[1][0] : ""
      }`}
    />
  );
};

export default TextAvatar;
