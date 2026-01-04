import React, { useEffect, useState } from "react";
import { getPairs, deletePair, getPlayers, createPair } from "../api";
import { PairCard } from "../components/PairCard";
import { CustomDialog } from "../components/CustomDialog";
import {
  Button,
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
    setPairs(Array.isArray(res) ? res : res?.data || []);
  };

  const fetchAllPlayers = async () => {
    const res = await getPlayers();
    setAllPlayers(Array.isArray(res) ? res : res?.data || []);
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

 {/* DIALOG per creare coppia usando CustomDialog */}
      <CustomDialog
        open={dialogOpen}
        title="Crea nuova coppia"
        onClose={handleCloseDialog}
        onConfirm={handleCreatePair}
        confirmText="Salva"
        cancelText="Annulla"
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
          {/* Nome coppia con icona */}
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
              ✨ Nome Coppia
            </Typography>
            <TextField
              fullWidth
              placeholder="Es: Team Rocket, Dream Team..."
              value={newPairName}
              onChange={(e) => setNewPairName(e.target.value)}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: 'rgba(0, 0, 0, 0.02)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'white',
                  }
                }
              }}
            />
          </Box>

          {/* Selezione giocatori moderna */}
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
              👥 Giocatori ({selectedPlayerIds.length}/2)
            </Typography>
            <FormControl fullWidth>
              <Select
                multiple
                displayEmpty
                value={selectedPlayerIds}
                onChange={(e) => {
                  const value = typeof e.target.value === "string" ? e.target.value.split(",") : e.target.value;
                  if (value.length <= 2) setSelectedPlayerIds(value);
                }}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <Typography color="text.secondary">Seleziona 2 giocatori...</Typography>;
                  }
                  return (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {selected.map((id) => {
                        const player = allPlayers.find((p) => p.id === id);
                        return (
                          <Chip 
                            key={id} 
                            label={player ? `${player.firstName} ${player.lastName}` : ""} 
                            size="medium"
                            sx={{
                              backgroundColor: 'primary.main',
                              color: 'white',
                              fontWeight: 500,
                              '& .MuiChip-deleteIcon': {
                                color: 'rgba(255, 255, 255, 0.7)',
                                '&:hover': {
                                  color: 'white'
                                }
                              }
                            }}
                          />
                        );
                      })}
                    </Box>
                  );
                }}
                sx={{
                  borderRadius: 2,
                  backgroundColor: 'rgba(0, 0, 0, 0.02)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'white',
                  }
                }}
              >
                {allPlayers.map((p) => (
                  <MenuItem 
                    key={p.id} 
                    value={p.id}
                    disabled={selectedPlayerIds.length >= 2 && !selectedPlayerIds.includes(p.id)}
                    sx={{
                      py: 1.5,
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(25, 118, 210, 0.08)',
                        '&:hover': {
                          backgroundColor: 'rgba(25, 118, 210, 0.12)',
                        }
                      }
                    }}
                  >
                    {p.firstName} {p.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedPlayerIds.length < 2 && (
              <Box 
                sx={{ 
                  mt: 1.5, 
                  p: 1.5, 
                  backgroundColor: 'rgba(211, 47, 47, 0.08)',
                  borderRadius: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Typography variant="caption" sx={{ color: 'error.main', fontWeight: 500 }}>
                  ⚠️ Seleziona esattamente 2 giocatori per formare una coppia
                </Typography>
              </Box>
            )}
            {selectedPlayerIds.length === 2 && (
              <Box 
                sx={{ 
                  mt: 1.5, 
                  p: 1.5, 
                  backgroundColor: 'rgba(46, 125, 50, 0.08)',
                  borderRadius: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 500 }}>
                  ✓ Coppia completa! Pronta per essere salvata
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </CustomDialog>
    </Box>
  );
};
