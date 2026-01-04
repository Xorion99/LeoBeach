import React, { useEffect, useState } from "react";
import { getPlayers, createPlayer, deletePlayer } from "../api";
import { PlayerCard } from "../components/PlayerCard";
import { CustomDialog } from "../components/CustomDialog";
import {
  Button,
  TextField,
  Box,
  Typography
} from "@mui/material";

interface Player {
  id: string;
  firstName: string;
  lastName: string;
  birthDate?: string;
}

export const Players: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newBirthDate, setNewBirthDate] = useState<string | undefined>("");

  // Fetch giocatori
  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    const res = await getPlayers();
    setPlayers(res.data);
  };

  const handleDelete = async (id: string) => {
    await deletePlayer(id);
    fetchPlayers();
  };

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setNewFirstName("");
    setNewLastName("");
    setNewBirthDate("");
  };

  const handleCreatePlayer = async () => {
    if (!newFirstName || !newLastName) {
      alert("Inserisci nome e cognome!");
      return;
    }

    try {
      await createPlayer({
        firstName: newFirstName,
        lastName: newLastName,
        birthDate: newBirthDate || null
      });
      handleCloseDialog();
      fetchPlayers();
    } catch (err) {
      console.error(err);
      alert("Errore durante la creazione del giocatore!");
    }
  };

  return (
    <Box>
      {/* Bottone per aprire dialog */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenDialog}
        sx={{ mb: 3 }}
      >
        Aggiungi Giocatore
      </Button>

      {/* Lista giocatori */}
      {players.map((p) => (
        <PlayerCard
          key={p.id}
          id={p.id}
          firstName={p.firstName}
          lastName={p.lastName}
          onDelete={handleDelete}
        />
      ))}

      {/* Dialog per aggiungere giocatore */}
      <CustomDialog
        open={dialogOpen}
        title="Aggiungi nuovo giocatore"
        onClose={handleCloseDialog}
        onConfirm={handleCreatePlayer}
        confirmText="Salva"
        cancelText="Annulla"
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
          {/* Nome */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                mb: 1,
                fontWeight: 600,
                color: "text.secondary",
                display: "flex",
                alignItems: "center",
                gap: 1
              }}
            >
              ✨ Nome
            </Typography>
            <TextField
              fullWidth
              placeholder="Es: Mario"
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: 'rgba(0, 0, 0, 0.02)',
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                  '&.Mui-focused': { backgroundColor: 'white' }
                }
              }}
            />
          </Box>

          {/* Cognome */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                mb: 1,
                fontWeight: 600,
                color: "text.secondary",
                display: "flex",
                alignItems: "center",
                gap: 1
              }}
            >
              📝 Cognome
            </Typography>
            <TextField
              fullWidth
              placeholder="Es: Rossi"
              value={newLastName}
              onChange={(e) => setNewLastName(e.target.value)}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: 'rgba(0, 0, 0, 0.02)',
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                  '&.Mui-focused': { backgroundColor: 'white' }
                }
              }}
            />
          </Box>

          {/* Data di nascita opzionale */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                mb: 1,
                fontWeight: 600,
                color: "text.secondary",
                display: "flex",
                alignItems: "center",
                gap: 1
              }}
            >
              🎂 Data di nascita (opzionale)
            </Typography>
            <TextField
              fullWidth
              type="date"
              value={newBirthDate || ""}
              onChange={(e) => setNewBirthDate(e.target.value)}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: 'rgba(0, 0, 0, 0.02)',
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                  '&.Mui-focused': { backgroundColor: 'white' }
                }
              }}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </Box>
      </CustomDialog>
    </Box>
  );
};
