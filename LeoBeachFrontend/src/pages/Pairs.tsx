import React, { useEffect, useState } from "react";
import { getPairs, deletePair, getPlayers, createPair } from "../api";
import { PairCard } from "../components/PairCard";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  Typography
} from "@mui/material";

interface Player {
  id: string;
  firstName: string;
  lastName: string;
}

interface Pair {
  id: string;
  name: string;
  playerIds: string[];
}

export const Pairs: React.FC = () => {
  const [pairs, setPairs] = useState<Pair[]>([]);
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newPairName, setNewPairName] = useState("");
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>([]);

  // Fetch coppie e giocatori
  useEffect(() => {
    fetchPairs();
    fetchAllPlayers();
  }, []);

  const fetchPairs = async () => {
    const res = await getPairs();
    setPairs(res.data);
  };

  const fetchAllPlayers = async () => {
    const res = await getPlayers();
    setAllPlayers(res.data);
  };

  const handleDelete = async (id: string) => {
    await deletePair(id);
    fetchPairs();
  };

  // Dialog open/close
  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setNewPairName("");
    setSelectedPlayerIds([]);
  };

  // Creazione coppia
  const handleCreatePair = async () => {
    if (!newPairName) {
      alert("Inserisci il nome della coppia!");
      return;
    }
    if (selectedPlayerIds.length !== 2) {
      alert("Seleziona esattamente 2 giocatori per la coppia!");
      return;
    }

    await createPair({
      name: newPairName,
      playerIds: selectedPlayerIds
    });

    handleCloseDialog();
    fetchPairs();
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
        Crea Coppia
      </Button>

      {/* Lista coppie */}
      {pairs.map((p) => {
        // Trasforma playerIds in array di oggetti Player
        const playersInPair = (p.playerIds || [])
          .map((id) => allPlayers.find((pl) => pl.id === id))
          .filter(Boolean);

        return (
          <PairCard
            key={p.id}
            id={p.id}
            name={p.name}
            players={playersInPair as Player[]}
            onDelete={handleDelete}
          />
        );
      })}

      {/* DIALOG per creare coppia */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Crea nuova coppia</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Nome coppia"
            value={newPairName}
            onChange={(e) => setNewPairName(e.target.value)}
          />

          <FormControl>
            <InputLabel>Giocatori (2)</InputLabel>
            <Select
              multiple
              value={selectedPlayerIds}
              onChange={(e) => {
                const value =
                  typeof e.target.value === "string"
                    ? e.target.value.split(",")
                    : e.target.value;
                // Limita a 2 giocatori
                if (value.length <= 2) setSelectedPlayerIds(value);
              }}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((id) => {
                    const player = allPlayers.find((p) => p.id === id);
                    return (
                      <Chip
                        key={id}
                        label={
                          player ? `${player.firstName} ${player.lastName}` : ""
                        }
                      />
                    );
                  })}
                </Box>
              )}
            >
              {allPlayers.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.firstName} {p.lastName}
                </MenuItem>
              ))}
            </Select>
            {selectedPlayerIds.length < 2 && (
              <Typography variant="caption" color="error">
                Seleziona esattamente 2 giocatori
              </Typography>
            )}
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog}>Annulla</Button>
          <Button variant="contained" onClick={handleCreatePair}>
            Salva
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
