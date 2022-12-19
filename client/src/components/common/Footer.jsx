import React from "react";
import Container from "./Container";
import { Paper, Stack, Box, Button } from "@mui/material";
import menuConfigs from "../../configs/menu.configs";
import Logo from "./Logo";

const Footer = ({theme}) => {
  return (
    <Container>
      <Paper square={true} sx={{ backgroundImage: "unset", padding: "2rem" }}>
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction={{ xs: "column", md: "row" }}
          sx={{ height: "max-content" }}
        >
          <Logo theme={theme} />

          <Box>
            {menuConfigs.main.map((item, index) => (
              <Button key={index}>{item.display}</Button>
            ))}
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Footer;
