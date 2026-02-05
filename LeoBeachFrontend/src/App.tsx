import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Scouts } from "./pages/Scouts";
import { AppBar, Toolbar, Typography, Container, Box, Button } from "@mui/material";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* HEADER */}
      <AppBar position="static">
        <Toolbar>
          <SportsVolleyballIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div">
            LeoBeach
          </Typography>
          <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
            <Button color="inherit" component={Link} to="/" sx={{ textTransform: "none" }}>
              Home
            </Button>
            <Button color="inherit" component={Link} to="/scouts" sx={{ textTransform: "none" }}>
              Scout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scouts" element={<Scouts />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
