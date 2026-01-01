import React, { useEffect, useState } from "react";
import { getPlayers, deletePlayer } from "../api";
import { PlayerCard } from "../components/PlayerCard";

export const Players: React.FC = () => {
  const [players, setPlayers] = useState<any[]>([]);

  const fetchPlayers = async () => {
    const res = await getPlayers();
    setPlayers(res.data);
  };

  const handleDelete = async (id: string) => {
    await deletePlayer(id);
    fetchPlayers();
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <div>
      <h2>Players</h2>
      {players.map(p => (
        <PlayerCard key={p.id} {...p} onDelete={handleDelete} />
      ))}
    </div>
  );
};
