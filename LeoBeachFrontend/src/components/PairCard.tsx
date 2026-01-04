import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Stack,
  Avatar,
  Box,
  Chip
} from "@mui/material";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupIcon from "@mui/icons-material/Group";
import { PlayerStatsDialog } from "./PlayerStatsDialog";

interface Player { id: string; firstName: string; lastName: string; }
interface Props { id: string; name: string; players?: Player[]; onDelete: (id: string) => void; }

const gradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
];

export const PairCard: React.FC<Props> = ({ id, name, players = [], onDelete }) => {
  const gradient = gradients[Array.from(id).reduce((sum, c) => sum + c.charCodeAt(0), 0) % gradients.length];

  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [statsDialogOpen, setStatsDialogOpen] = useState(false);

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player);
    setStatsDialogOpen(true);
  };

  const handleCloseStats = () => { setSelectedPlayer(null); setStatsDialogOpen(false); };

  return (
    <>
      <Card sx={{ borderRadius: 4, overflow: "hidden", background: "rgba(255,255,255,0.95)", position: "relative" }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box sx={{ background: gradient, borderRadius: 2, p: 1 }}><SportsVolleyballIcon sx={{ color: "white" }} /></Box>
              <Typography sx={{ fontWeight: 700, background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{name}</Typography>
            </Stack>
            <Chip icon={<GroupIcon />} label={players.length} size="small" sx={{ background: gradient, color: "white" }} />
          </Stack>

          <Stack spacing={2}>
            {players.length === 0 && <Box sx={{ py: 3, textAlign: "center", border: "2px dashed rgba(102,126,234,0.3)", borderRadius: 3 }}>Nessun giocatore assegnato</Box>}
            {players.map(p => (
              <Box key={p.id} onClick={() => handlePlayerClick(p)} sx={{ display: "flex", alignItems: "center", gap: 2, p: 2, borderRadius: 3, cursor: "pointer" }}>
                <Avatar sx={{ background: gradient }}>{p.firstName[0]}{p.lastName[0]}</Avatar>
                <Typography>{p.firstName} {p.lastName}</Typography>
              </Box>
            ))}
          </Stack>
        </CardContent>

        <CardActions>
          <IconButton onClick={() => onDelete(id)}><DeleteIcon /></IconButton>
        </CardActions>
      </Card>

      {selectedPlayer && (
        <PlayerStatsDialog player={selectedPlayer} open={statsDialogOpen} onClose={handleCloseStats} />
      )}
    </>
  );
};
