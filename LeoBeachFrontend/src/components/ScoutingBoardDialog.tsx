import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Button,
  Stack,
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getPlayerStats, getPairStats, updateScoutEvent } from "../api";

export interface SkillStatsDto {
  skillCode: string;
  skillDescription: string;
  good: number;
  neutral: number;
  bad: number;
}

export interface PlayerStatsDto {
  playerId: string;
  skills?: SkillStatsDto[];
}

interface Player {
  id: string;
  firstName: string;
  lastName: string;
}

interface Pair {
  id: string;
  name: string;
  players?: Player[];
}

interface Props {
  pair: Pair;
  scoutId: string;
  open: boolean;
  onClose: () => void;
}

export const ScoutingBoardDialog: React.FC<Props> = ({ pair, scoutId, open, onClose }) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [skills, setSkills] = useState<SkillStatsDto[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStats = async (playerId?: string) => {
    setLoading(true);
    try {
      if (playerId) {
        const res: PlayerStatsDto = await getPlayerStats(playerId);
        setSkills(res.skills ?? []);
      } else {
        const res: PlayerStatsDto = await getPairStats(pair.id);
        setSkills(res.skills ?? []);
      }
    } catch (err) {
      console.error(err);
      setSkills([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) fetchStats();
  }, [open, pair.id]);

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player);
    fetchStats(player.id);
  };

  const handleSkillUpdate = async (skillId: string, value: number) => {
    if (!scoutId) return;
    try {
      await updateScoutEvent(scoutId, skillId, value);
      fetchStats(selectedPlayer?.id); // aggiorna
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        Scouting: {pair.name}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Stack direction="row" spacing={2} mb={2}>
          <Button variant="outlined" onClick={() => setSelectedPlayer(null)}>Stats Coppia</Button>
          {pair.players?.map(p => (
            <Button key={p.id} variant="outlined" onClick={() => handlePlayerClick(p)}>
              {p.firstName} {p.lastName}
            </Button>
          ))}
        </Stack>

        {loading && <Typography>Caricamento...</Typography>}
        {!loading && skills.length === 0 && <Typography>Nessuna skill disponibile</Typography>}

        {!loading && skills.map((s) => (
          <Box
            key={s.skillCode}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
              p: 1,
              borderRadius: 1,
              backgroundColor: "rgba(0,0,0,0.03)",
              cursor: "pointer"
            }}
            onClick={() => handleSkillUpdate(s.skillCode, 1)} // esempio: +1 alla skill
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
