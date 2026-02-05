import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  CircularProgress,
  useMediaQuery
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { createScout, getPairs, getPlayers } from "../api";

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

export interface PairView extends Pair {
  players: Player[];
}

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: (scoutId: string, pair: PairView) => void;
}

export const CreateScoutDialog: React.FC<Props> = ({ open, onClose, onCreated }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [pairs, setPairs] = useState<Pair[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [creatingPairId, setCreatingPairId] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const [pairsRes, playersRes] = await Promise.all([getPairs(), getPlayers()]);
        setPairs(Array.isArray(pairsRes) ? pairsRes : pairsRes?.data || []);
        setPlayers(Array.isArray(playersRes) ? playersRes : playersRes?.data || []);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [open]);

  const playerMap = useMemo(() => {
    const map = new Map<string, Player>();
    players.forEach((p) => map.set(p.id, p));
    return map;
  }, [players]);

  const pairViews: PairView[] = useMemo(
    () =>
      pairs.map((p) => ({
        ...p,
        players: (p.playerIds || [])
          .map((id) => playerMap.get(id))
          .filter(Boolean) as Player[]
      })),
    [pairs, playerMap]
  );

  const handleCreate = async (pair: PairView) => {
    setCreatingPairId(pair.id);
    try {
      const res = await createScout({ pairId: pair.id, events: [] });
      const scoutId = res?.id || res?.Id;
      if (!scoutId) throw new Error("ScoutId non valido");
      onCreated(scoutId, pair);
    } catch (err) {
      console.error(err);
      alert("Errore nella creazione dello scout");
    } finally {
      setCreatingPairId(null);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" fullScreen={fullScreen}>
      <DialogTitle
        sx={{
          background: "linear-gradient(120deg, #0f2b5b 0%, #1b5e7a 50%, #268e8b 100%)",
          color: "white"
        }}
      >
        Scegli la coppia per lo scouting
        <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
          Seleziona una coppia per aprire il tabellone e registrare le skill
        </Typography>
      </DialogTitle>

      <DialogContent
        sx={{
          background: "radial-gradient(circle at top, rgba(38,142,139,0.08), transparent 60%)",
          minHeight: 280
        }}
      >
        {loading && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 3 }}>
            <CircularProgress size={24} />
            <Typography>Caricamento coppie...</Typography>
          </Box>
        )}

        {!loading && pairViews.length === 0 && (
          <Typography>Nessuna coppia disponibile</Typography>
        )}

        <Grid container spacing={2} sx={{ mt: 1 }}>
          {pairViews.map((pair) => (
            <Grid item xs={12} sm={6} md={4} key={pair.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  height: "100%",
                  borderRadius: 3,
                  border: "1px solid rgba(15, 43, 91, 0.12)",
                  background:
                    "linear-gradient(160deg, rgba(255,255,255,1) 0%, rgba(15,43,91,0.03) 100%)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2
                }}
              >
                <Box>
                  <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                    Coppia
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {pair.name || "Senza nome"}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {pair.players.map((p) => (
                    <Chip
                      key={p.id}
                      label={`${p.firstName} ${p.lastName}`}
                      sx={{
                        backgroundColor: "rgba(38,142,139,0.12)",
                        color: "#0f2b5b",
                        fontWeight: 600
                      }}
                    />
                  ))}
                  {pair.players.length === 0 && (
                    <Chip label="Giocatori non trovati" variant="outlined" />
                  )}
                </Box>

                <Box sx={{ mt: "auto" }}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleCreate(pair)}
                    disabled={creatingPairId === pair.id}
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 700,
                      background: "linear-gradient(120deg, #0f2b5b 0%, #268e8b 100%)"
                    }}
                  >
                    {creatingPairId === pair.id ? "Creazione..." : "Apri tabellone"}
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} sx={{ textTransform: "none" }}>
          Chiudi
        </Button>
      </DialogActions>
    </Dialog>
  );
};
