import React from "react";
import Container from "./Container";
import { Paper, Stack, Box, Button, Typography } from "@mui/material";
import menuConfigs from "../../configs/menu.configs";
import Logo from "./Logo";

const Footer = ({ theme }) => {
  return (
    <Container>
      <Paper square={true} sx={{ backgroundImage: "unset", padding: "2rem" }}>
        <Stack
          alignItems="center"
          justifyContent={"center"}
          direction={{ xs: "column", md: "column" }}
          sx={{ height: "max-content" }}
        >
          <Logo theme={theme} />

          <Typography fontWeight={"400"} >TMDB API</Typography>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Footer;
