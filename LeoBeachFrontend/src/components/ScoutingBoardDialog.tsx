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
  Stack,
  IconButton,
  Paper,
  Divider,
  CircularProgress,
  useMediaQuery
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { getScoutSkills, updateScoutEvent } from "../api";

interface Player {
  id: string;
  firstName: string;
  lastName: string;
}

export interface PairView {
  id: string;
  name: string;
  players: Player[];
}

interface ScoutSkill {
  skillId: string;
  skillCode: string;
  skillDescription: string;
  value: number;
}

interface Props {
  pair: PairView | null;
  scoutId: string;
  open: boolean;
  onClose: () => void;
  onSave?: () => void;
}

export const ScoutingBoardDialog: React.FC<Props> = ({ pair, scoutId, open, onClose, onSave }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>("");
  const [skills, setSkills] = useState<ScoutSkill[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingSkillId, setSavingSkillId] = useState<string | null>(null);

  const selectedPlayer = useMemo(
    () => pair?.players.find((p) => p.id === selectedPlayerId) || null,
    [pair, selectedPlayerId]
  );

  useEffect(() => {
    if (!open || !pair?.players.length) return;
    const stillValid = pair.players.some((p) => p.id === selectedPlayerId);
    if (!stillValid) setSelectedPlayerId(pair.players[0].id);
  }, [open, pair, selectedPlayerId]);

  useEffect(() => {
    if (!open || !scoutId || !selectedPlayerId) return;
    const fetchSkills = async () => {
      setLoading(true);
      try {
        const res = await getScoutSkills(scoutId, selectedPlayerId);
        setSkills(Array.isArray(res) ? res : res?.data || []);
      } catch (err) {
        console.error(err);
        setSkills([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, [open, scoutId, selectedPlayerId]);

  const handleDelta = async (skillId: string, delta: number) => {
    if (!scoutId || !selectedPlayerId) return;
    setSavingSkillId(skillId);
    try {
      await updateScoutEvent(scoutId, skillId, selectedPlayerId, delta);
      setSkills((prev) =>
        prev.map((s) => (s.skillId === skillId ? { ...s, value: s.value + delta } : s))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setSavingSkillId(null);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" fullScreen={fullScreen}>
      <DialogTitle
        sx={{
          background: "linear-gradient(120deg, #12233b 0%, #1f5f74 45%, #2b9c8f 100%)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Tabellone Scouting
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            {pair?.name || "Coppia selezionata"}
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          background:
            "radial-gradient(circle at top left, rgba(43,156,143,0.12), transparent 55%), radial-gradient(circle at bottom right, rgba(18,35,59,0.08), transparent 60%)"
        }}
      >
        {!pair && <Typography>Nessuna coppia selezionata</Typography>}

        {pair && (
          <>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 2,
                borderRadius: 3,
                background: "rgba(255,255,255,0.9)",
                border: "1px solid rgba(18,35,59,0.08)"
              }}
            >
              <Typography variant="subtitle2" sx={{ color: "text.secondary", mb: 1 }}>
                Giocatori
              </Typography>
              <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
                {pair.players.map((p) => (
                  <Chip
                    key={p.id}
                    label={`${p.firstName} ${p.lastName}`}
                    onClick={() => setSelectedPlayerId(p.id)}
                    sx={{
                      fontWeight: 600,
                      borderRadius: 2,
                      backgroundColor:
                        selectedPlayerId === p.id ? "rgba(43,156,143,0.2)" : "rgba(18,35,59,0.08)",
                      color: selectedPlayerId === p.id ? "#0f2b5b" : "text.primary"
                    }}
                  />
                ))}
              </Stack>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 3,
                background: "white",
                border: "1px solid rgba(18,35,59,0.08)"
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {selectedPlayer
                    ? `${selectedPlayer.firstName} ${selectedPlayer.lastName}`
                    : "Seleziona un giocatore"}
                </Typography>
                {loading && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CircularProgress size={18} />
                    <Typography variant="caption">Caricamento skills</Typography>
                  </Box>
                )}
              </Box>

              <Divider sx={{ my: 2 }} />

              {!loading && skills.length === 0 && (
                <Typography>Nessuna skill disponibile</Typography>
              )}

              <Stack spacing={1.5}>
                {skills.map((s) => (
                  <Paper
                    key={s.skillId}
                    elevation={0}
                    sx={{
                      p: 1.5,
                      borderRadius: 2.5,
                      background:
                        "linear-gradient(120deg, rgba(18,35,59,0.04), rgba(43,156,143,0.06))",
                      border: "1px solid rgba(18,35,59,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 2
                    }}
                  >
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 700 }}>{s.skillDescription}</Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        {s.skillCode}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <IconButton
                        onClick={() => handleDelta(s.skillId, -1)}
                        disabled={savingSkillId === s.skillId}
                        sx={{
                          border: "1px solid rgba(18,35,59,0.2)",
                          borderRadius: 2
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>

                      <Box
                        sx={{
                          minWidth: 48,
                          textAlign: "center",
                          fontWeight: 800,
                          fontSize: 18,
                          color: s.value >= 0 ? "#0f2b5b" : "#8b1e3f"
                        }}
                      >
                        {s.value}
                      </Box>

                      <IconButton
                        onClick={() => handleDelta(s.skillId, 1)}
                        disabled={savingSkillId === s.skillId}
                        sx={{
                          border: "1px solid rgba(18,35,59,0.2)",
                          borderRadius: 2
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </Paper>
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} sx={{ textTransform: "none" }}>
          Chiudi
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            onSave?.();
            onClose();
          }}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            fontWeight: 700,
            background: "linear-gradient(120deg, #12233b 0%, #2b9c8f 100%)"
          }}
        >
          Salva e chiudi
        </Button>
      </DialogActions>
    </Dialog>
  );
};
