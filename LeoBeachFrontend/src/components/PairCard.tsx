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
  Chip,
} from "@mui/material";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupIcon from "@mui/icons-material/Group";
import { PlayerStatsDialog } from "./PlayerStatsDialog";

interface Player {
  id: string;
  firstName: string;
  lastName: string;
}

interface Props {
  id: string;
  name: string;
  players?: Player[];
  onDelete: (id: string) => void;
}

const gradients = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
];

export const PairCard: React.FC<Props> = ({ id, name, players = [], onDelete }) => {
  const gradient =
    gradients[
      Array.from(id).reduce((sum, char) => sum + char.charCodeAt(0), 0) % gradients.length
    ];

  // Stato dialog statistiche
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [statsDialogOpen, setStatsDialogOpen] = useState(false);

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player);
    setStatsDialogOpen(true);
  };

  const handleCloseStats = () => {
    setSelectedPlayer(null);
    setStatsDialogOpen(false);
  };

  return (
    <>
      <Card elevation={0} sx={{ borderRadius: 4, overflow: "hidden" }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" mb={2}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box sx={{ background: gradient, borderRadius: 2, p: 1 }}>
                <SportsVolleyballIcon sx={{ color: "white" }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {name}
              </Typography>
            </Stack>

            <Chip icon={<GroupIcon />} label={players.length} size="small" />
          </Stack>

          <Stack spacing={1}>
            {players.map((p) => (
              <Box
                key={p.id}
                onClick={() => handlePlayerClick(p)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 1,
                  borderRadius: 2,
                  background: "rgba(255,255,255,0.7)",
                  cursor: "pointer",
                  "&:hover": { transform: "translateX(4px)" },
                }}
              >
                <Avatar sx={{ background: gradient }}>
                  {p.firstName[0]}
                  {p.lastName[0]}
                </Avatar>
                <Typography>{p.firstName} {p.lastName}</Typography>
              </Box>
            ))}
          </Stack>
        </CardContent>

        <CardActions sx={{ justifyContent: "flex-end" }}>
          <IconButton onClick={() => onDelete(id)}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>

      {selectedPlayer && (
        <PlayerStatsDialog
          player={selectedPlayer}
          open={statsDialogOpen}
          onClose={handleCloseStats}
        />
      )}
    </>
  );
};
