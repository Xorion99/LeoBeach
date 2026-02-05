import React from "react";
import { Players } from "./Players";
import { Pairs } from "./Pairs";
import { Container, Box, Divider, Typography } from "@mui/material";

export const Home: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, pb: 6 }}>
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Giocatori
        </Typography>
        <Players />
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Coppie
        </Typography>
        <Pairs />
      </Box>
    </Container>
  );
};
