import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getPairs, getPlayerStats, updateScoutEvent } from "../api";

interface Player {
  id: string;
  firstName: string;
  lastName: string;
}

interface Skill {
  id: string;
  code: string;
  description: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  scoutId: string;
  pairId: string; // 🔹 ora obbligatorio
}

interface Pairs {
  id: string;
  name: string;
  players: Player[];
}


export const ScoutingBoardDialog: React.FC<Props> = ({ open, onClose, scoutId, pairId }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);

  // Carica giocatori e skills della coppia
  useEffect(() => {
    if (!open) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const pairsData = await getPairs();
        const pair = pairsData.find((p: { id: string; }) => p.id === pairId);
        if (!pair) throw new Error("Coppia non trovata");
        setPlayers(pair.players);

        // Skills: prendiamo le skills del primo giocatore (possiamo fare fetch separato se vuoi)
        if (pair.players.length > 0) {
          const stats = await getPlayerStats(pair.players[0].id);
          setSkills(stats.skills ?? []);
        }
      } catch (err) {
        console.error(err);
        setPlayers([]);
        setSkills([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [open, pairId]);

  const handleUpdateSkill = async (playerId: string, skillId: string, value: number) => {
    try {
      await updateScoutEvent(scoutId, skillId, value);
      // aggiorniamo lo stato locale (facoltativo, ottimizza UI)
      setSkills(skills.map(s => s.id === skillId ? { ...s, value } : s));
    } catch (err) {
      console.error(err);
      alert("Errore nell'aggiornamento della skill");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        Scouting Board
        <IconButton onClick={onClose}><CloseIcon /></IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {loading && <Typography>Caricamento...</Typography>}

        {!loading && players.length === 0 && (
          <Typography>Nessun giocatore trovato per questa coppia</Typography>
        )}

        {!loading && players.map(player => (
          <Box key={player.id} sx={{ mb: 3 }}>
            <Typography variant="h6">{player.firstName} {player.lastName}</Typography>

            {skills.length === 0 ? (
              <Typography>Caricamento skills...</Typography>
            ) : (
              skills.map(skill => (
                <Box key={skill.id} sx={{ display: "flex", justifyContent: "space-between", mb: 1, p: 1, borderRadius: 1, backgroundColor: "rgba(0,0,0,0.03)" }}>
                  <Typography>{skill.description}</Typography>
                  <Box>
                    <Button onClick={() => handleUpdateSkill(player.id, skill.id, 1)}>👍</Button>
                    <Button onClick={() => handleUpdateSkill(player.id, skill.id, 0)}>😐</Button>
                    <Button onClick={() => handleUpdateSkill(player.id, skill.id, -1)}>👎</Button>
                  </Box>
                </Box>
              ))
            )}
          </Box>
        ))}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Chiudi</Button>
      </DialogActions>
    </Dialog>
  );
};
