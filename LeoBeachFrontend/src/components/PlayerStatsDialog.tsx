import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getPlayerStats, getPairStats } from "../api"; // ⚡ API separate per player e pair

export interface SkillStatsDto {
  skillCode: string;
  skillDescription: string;
  good: number;
  neutral: number;
  bad: number;
}

export interface PlayerStatsDto {
  playerId?: string; // opzionale se stat coppia
  pairId?: string;   // opzionale se stat coppia
  skills?: SkillStatsDto[];
}

interface Props {
  playerId?: string; // se singolo
  pairId?: string;   // se coppia
  open: boolean;
  onClose: () => void;
  title: string; // titolo dinamico (nome giocatore o coppia)
}

export const PlayerStatsDialog: React.FC<Props> = ({
  playerId,
  pairId,
  open,
  onClose,
  title,
}) => {
  const [stats, setStats] = useState<SkillStatsDto[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    if (!playerId && !pairId) return; // nulla da fare
    setLoading(true);
    try {
      let res: PlayerStatsDto;

      if (playerId) {
        res = await getPlayerStats(playerId); // stats singolo
      } else if (pairId) {
        res = await getPairStats(pairId); // stats coppia
      } else {
        res = { skills: [] };
      }

      setStats(res.skills ?? []);
    } catch (err) {
      console.error(err);
      setStats([]); // fallback se errore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) fetchStats();
  }, [open, playerId, pairId]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Statistiche di {title}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {loading && <Typography>Caricamento...</Typography>}

        {!loading && stats.length === 0 && (
          <Typography>Nessuna statistica disponibile</Typography>
        )}

        {!loading &&
          stats.length > 0 &&
          stats.map((s) => (
            <Box
              key={s.skillCode}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
                p: 1,
                borderRadius: 1,
                backgroundColor: "rgba(0,0,0,0.03)",
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>{s.skillDescription}</Typography>
              <Typography>
                👍 {s.good} | 😐 {s.neutral} | 👎 {s.bad}
              </Typography>
            </Box>
          ))}
      </DialogContent>
    </Dialog>
  );
};
