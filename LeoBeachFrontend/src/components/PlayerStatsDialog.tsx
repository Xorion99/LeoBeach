import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, Typography, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getPlayerStats } from "../api";

export interface SkillStatsDto { skillCode: string; skillDescription: string; good: number; neutral: number; bad: number; }
export interface PlayerStatsDto { playerId: string; skills?: SkillStatsDto[]; }

interface Player { id: string; firstName: string; lastName: string; }
interface Props { player: Player; open: boolean; onClose: () => void; }

export const PlayerStatsDialog: React.FC<Props> = ({ player, open, onClose }) => {
  const [stats, setStats] = useState<SkillStatsDto[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res: PlayerStatsDto = await getPlayerStats(player.id);
        setStats(res.skills ?? []);
      } catch (err) {
        console.error(err);
        setStats([]);
      } finally { setLoading(false); }
    };
    fetchStats();
  }, [open, player.id]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        Statistiche di {player.firstName} {player.lastName}
        <IconButton onClick={onClose}><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {loading && <Typography>Caricamento...</Typography>}
        {!loading && stats.length === 0 && <Typography>Nessuna statistica disponibile</Typography>}
        {!loading && stats.length > 0 && stats.map(s => (
          <Box key={s.skillCode} sx={{ display: "flex", justifyContent: "space-between", mb: 1, p: 1, borderRadius: 1, backgroundColor: "rgba(0,0,0,0.03)" }}>
            <Typography sx={{ fontWeight: 600 }}>{s.skillDescription}</Typography>
            <Typography>👍 {s.good} | 😐 {s.neutral} | 👎 {s.bad}</Typography>
          </Box>
        ))}
      </DialogContent>
    </Dialog>
  );
};
