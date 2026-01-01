interface Player {
  id: string;
  firstName: string;
  lastName: string;
}

interface Props {
  id: string;
  name: string;
  players?: Player[]; // <-- optional
  onDelete: (id: string) => void;
}

export const PairCard: React.FC<Props> = ({ id, name, players = [], onDelete }) => (
  <div style={{ border: "1px solid blue", padding: 8, margin: 4 }}>
    <h4>{name}</h4>
    {players.map(p => <p key={p.id}>{p.firstName} {p.lastName}</p>)}
    <button onClick={() => onDelete(id)}>Delete Pair</button>
  </div>
);
