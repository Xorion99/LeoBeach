import React from "react";

interface Props {
  id: string;
  firstName: string;
  lastName: string;
  onDelete: (id: string) => void;
}

export const PlayerCard: React.FC<Props> = ({ id, firstName, lastName, onDelete }) => (
  <div style={{ border: "1px solid gray", padding: 8, margin: 4 }}>
    <p>{firstName} {lastName}</p>
    <button onClick={() => onDelete(id)}>Delete</button>
  </div>
);
