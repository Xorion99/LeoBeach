import React from "react";
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
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
];

export const PairCard: React.FC<Props> = ({
  id,
  name,
  players = [],
  onDelete
}) => {
  // Calcola gradient basato su GUID in modo deterministico
  const gradient =
    gradients[
      Array.from(id).reduce((sum, char) => sum + char.charCodeAt(0), 0) %
        gradients.length
    ];

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        position: "relative",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-12px)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.25)"
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "6px",
          background: gradient
        }
      }}
    >
      <CardContent sx={{ pt: 3, pb: 1 }}>
        {/* HEADER */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box
              sx={{
                background: gradient,
                borderRadius: 2,
                p: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
              }}
            >
              <SportsVolleyballIcon sx={{ color: "white", fontSize: 24 }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                background: gradient,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              {name}
            </Typography>
          </Stack>

          <Chip
            icon={<GroupIcon />}
            label={players.length}
            size="small"
            sx={{
              background: gradient,
              color: "white",
              fontWeight: 600,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              "& .MuiChip-icon": {
                color: "white"
              }
            }}
          />
        </Stack>

        {/* PLAYERS */}
        <Stack spacing={2}>
          {players.length === 0 && (
            <Box
              sx={{
                textAlign: "center",
                py: 3,
                px: 2,
                borderRadius: 3,
                background: "linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)",
                border: "2px dashed rgba(102, 126, 234, 0.3)"
              }}
            >
              <Typography variant="body2" sx={{ color: "#666", fontWeight: 500 }}>
                Nessun giocatore assegnato
              </Typography>
            </Box>
          )}

          {players.map((p) => (
            <Box
              key={p.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 2,
                borderRadius: 3,
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.5)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateX(8px)",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)"
                }
              }}
            >
              <Avatar
                sx={{
                  background: gradient,
                  fontWeight: 700,
                  fontSize: 16,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)"
                }}
              >
                {p.firstName[0]}
                {p.lastName[0]}
              </Avatar>
              <Typography sx={{ fontWeight: 600, flexGrow: 1, color: "#333" }}>
                {p.firstName} {p.lastName}
              </Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>

      {/* ACTIONS */}
      <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
        <IconButton
          onClick={() => onDelete(id)}
          sx={{
            background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
            color: "white",
            width: 44,
            height: 44,
            boxShadow: "0 4px 12px rgba(255, 107, 107, 0.3)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(135deg, #ee5a6f 0%, #ff6b6b 100%)",
              transform: "scale(1.1)",
              boxShadow: "0 6px 20px rgba(255, 107, 107, 0.5)"
            },
            "&:active": {
              transform: "scale(0.95)"
            }
          }}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
