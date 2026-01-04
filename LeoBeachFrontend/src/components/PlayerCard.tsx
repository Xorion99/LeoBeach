import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
  Avatar,
  Box
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

interface Props {
  id: string;
  firstName: string;
  lastName: string;
  onDelete: (id: string) => void;
}

const gradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
];

export const PlayerCard: React.FC<Props> = ({
  id,
  firstName,
  lastName,
  onDelete
}) => {
  const gradient = gradients[parseInt(id) % gradients.length];

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
        overflow: "hidden",
        position: "relative",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 16px 48px rgba(0, 0, 0, 0.2)"
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "5px",
          background: gradient
        }
      }}
    >
      <CardContent sx={{ pt: 3 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              background: gradient,
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
              fontSize: "1.25rem",
              fontWeight: 700
            }}
          >
            <PersonOutlineIcon sx={{ fontSize: 28 }} />
          </Avatar>

          <Box sx={{ flexGrow: 1 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                color: "#333",
                mb: 0.5
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: "#666",
                fontWeight: 500,
                fontSize: "0.813rem"
              }}
            >
              Disponibile
            </Typography>
          </Box>

          <IconButton
            onClick={() => onDelete(id)}
            aria-label="delete player"
            sx={{
              width: 40,
              height: 40,
              background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
              color: "white",
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
            <DeleteOutlineIcon />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};