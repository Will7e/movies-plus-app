import React, { useRef, useEffect } from "react";
import { Box } from "@mui/material";
import tmdbConfigs from "../../api/configs/tmdb.config";

const MediaVideo = ({ video }) => {
  const iframeRef = useRef();
  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
    iframeRef.current.setAttribute("height", height);
  }, [iframeRef, video]);

  return (
    <Box sx={{ height: "max-content" }}>
      <iframe
        width={"100%"}
        style={{
          border: 0,
        }}
        title={video.id}
        ref={iframeRef}
        src={tmdbConfigs.youtubePath(video.key)}
        key={video.key}
      ></iframe>
    </Box>
  );
};

export default MediaVideo;
