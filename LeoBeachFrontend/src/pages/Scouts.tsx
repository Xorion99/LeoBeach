import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { CreateScoutDialog } from "../components/CreateScoutDialog";
import type { PairView } from "../components/CreateScoutDialog";
import { ScoutingBoardDialog } from "../components/ScoutingBoardDialog";
import { deleteScout, getPairs, getPlayers, getScouts } from "../api";

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

interface ScoutListItem {
  id: string;
  pairId: string;
  pairName?: string;
  createdAt: string;
}

export const Scouts: React.FC = () => {
  const [scouts, setScouts] = useState<ScoutListItem[]>([]);
  const [pairs, setPairs] = useState<Pair[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [startScoutOpen, setStartScoutOpen] = useState(false);
  const [boardOpen, setBoardOpen] = useState(false);
  const [activeScoutId, setActiveScoutId] = useState("");
  const [activePair, setActivePair] = useState<PairView | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ScoutListItem | null>(null);

  const fetchData = async () => {
    const [scoutsRes, pairsRes, playersRes] = await Promise.all([
      getScouts(),
      getPairs(),
      getPlayers()
    ]);
    setScouts(Array.isArray(scoutsRes) ? scoutsRes : scoutsRes?.data || []);
    setPairs(Array.isArray(pairsRes) ? pairsRes : pairsRes?.data || []);
    setPlayers(Array.isArray(playersRes) ? playersRes : playersRes?.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleScoutCreated = (scoutId: string, pair: PairView) => {
    setActiveScoutId(scoutId);
    setActivePair(pair);
    setStartScoutOpen(false);
    setBoardOpen(true);
    fetchData();
  };

  const openScoutBoard = (scout: ScoutListItem) => {
    const pair = pairViews.find((p) => p.id === scout.pairId) || null;
    setActiveScoutId(scout.id);
    setActivePair(pair);
    setBoardOpen(true);
  };

  const handleDeleteScout = async (scoutId: string) => {
    await deleteScout(scoutId);
    fetchData();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, pb: 6 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Scout
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Registro completo delle sessioni di scouting
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="success"
          onClick={() => setStartScoutOpen(true)}
          sx={{ borderRadius: 2, fontWeight: 700 }}
        >
          Crea Scout
        </Button>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 3,
          border: "1px solid rgba(18,35,59,0.1)",
          background:
            "linear-gradient(140deg, rgba(255,255,255,1) 0%, rgba(18,35,59,0.03) 100%)"
        }}
      >
        {scouts.length === 0 && (
          <Typography>Nessuno scout registrato.</Typography>
        )}

        <Grid container spacing={2}>
          {scouts.map((s) => {
            const pair = pairViews.find((p) => p.id === s.pairId);
            return (
              <Grid item xs={12} md={6} key={s.id}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2.5,
                    border: "1px solid rgba(18,35,59,0.08)",
                    background: "white",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Coppia
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {s.pairName || pair?.name || "Senza nome"}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {pair?.players.map((p) => (
                      <Chip
                        key={p.id}
                        label={`${p.firstName} ${p.lastName}`}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(43,156,143,0.15)",
                          fontWeight: 600
                        }}
                      />
                    ))}
                  </Box>

                  <Divider />

                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(s.createdAt).toLocaleString()}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="outlined"
                        onClick={() => openScoutBoard(s)}
                        sx={{ borderRadius: 2, textTransform: "none" }}
                      >
                        Apri
                      </Button>
                      <Button
                        color="error"
                        variant="outlined"
                        onClick={() => setDeleteTarget(s)}
                        sx={{ borderRadius: 2, textTransform: "none" }}
                      >
                        Elimina
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Paper>

      <CreateScoutDialog
        open={startScoutOpen}
        onClose={() => setStartScoutOpen(false)}
        onCreated={handleScoutCreated}
      />

      <ScoutingBoardDialog
        open={boardOpen}
        onClose={() => setBoardOpen(false)}
        onSave={fetchData}
        scoutId={activeScoutId}
        pair={activePair}
      />

      <Dialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Conferma eliminazione</DialogTitle>
        <DialogContent>
          <Typography>
            Vuoi eliminare lo scout{" "}
            <strong>
              {deleteTarget?.pairName || "Senza nome"}
            </strong>
            ? L'operazione è una cancellazione logica.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDeleteTarget(null)} sx={{ textTransform: "none" }}>
            Annulla
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={async () => {
              if (!deleteTarget) return;
              await handleDeleteScout(deleteTarget.id);
              setDeleteTarget(null);
            }}
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            Elimina
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
