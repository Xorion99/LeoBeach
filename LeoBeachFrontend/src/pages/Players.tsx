import React, { useEffect, useState } from "react";
import { getPlayers, deletePlayer, createPlayer } from "../api";
import { PlayerCard } from "../components/PlayerCard";
import { CustomDialog } from "../components/CustomDialog";
import {
  Button,
  TextField,
  Box
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
  const [newPlayerFirstName, setNewPlayerFirstName] = useState("");
  const [newPlayerLastName, setNewPlayerLastName] = useState("");
  const [newPlayerBirthDate, setNewPlayerBirthDate] = useState<string>("");

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
    setNewPlayerFirstName("");
    setNewPlayerLastName("");
    setNewPlayerBirthDate("");
  };

  const handleCreatePlayer = async () => {
    if (!newPlayerFirstName || !newPlayerLastName) {
      alert("Nome e Cognome sono obbligatori!");
      return;
    }

    await createPlayer({
      firstName: newPlayerFirstName,
      lastName: newPlayerLastName,
      birthDate: newPlayerBirthDate ? newPlayerBirthDate : undefined
    });

    handleCloseDialog();
    fetchPlayers();
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
        Crea Giocatore
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

      {/* Dialog per creare giocatore */}
      <CustomDialog
        open={dialogOpen}
        title="Crea nuovo giocatore"
        onClose={handleCloseDialog}
        onConfirm={handleCreatePlayer}
        confirmText="Salva"
        cancelText="Annulla"
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Nome"
            value={newPlayerFirstName}
            onChange={(e) => setNewPlayerFirstName(e.target.value)}
          />
          <TextField
            label="Cognome"
            value={newPlayerLastName}
            onChange={(e) => setNewPlayerLastName(e.target.value)}
          />
          <TextField
            label="Data di nascita (facoltativa)"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={newPlayerBirthDate}
            onChange={(e) => setNewPlayerBirthDate(e.target.value)}
          />
        </Box>
      </CustomDialog>
    </Box>
  );
};
