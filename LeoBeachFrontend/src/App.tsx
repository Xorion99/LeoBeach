import React, { useState } from "react";
import { Players } from "./pages/Players";
import { Pairs } from "./pages/Pairs";
import { ScoutingBoardDialog } from "./components/CreateScoutDialog";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Divider,
  Button
} from "@mui/material";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";

const App: React.FC = () => {
  const [scoutDialogOpen, setScoutDialogOpen] = useState(false);
  return (
    <>
      {/* HEADER */}
      <AppBar position="static">
        <Toolbar>
          <SportsVolleyballIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div">
            LeoBeach
          </Typography>
         
        </Toolbar>
      </AppBar>

      {/* CONTENT */}
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
          <Button 
            variant="contained" 
            color="success"
            onClick={() => setScoutDialogOpen(true)}
          >
            Crea Scout
          </Button>
        </Box>

        <ScoutingBoardDialog 
          open={scoutDialogOpen} 
          onClose={() => setScoutDialogOpen(false)} 
          scoutId="" 
          pairId="" 
        />

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
    </>
  );
};

export default App;
