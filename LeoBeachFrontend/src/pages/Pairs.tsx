import React, { useEffect, useState } from "react";
import { getPairs, deletePair } from "../api";
import { PairCard } from "../components/PairCard";

export const Pairs: React.FC = () => {
  const [pairs, setPairs] = useState<any[]>([]);

  const fetchPairs = async () => {
    const res = await getPairs();
    setPairs(res.data);
  };

  const handleDelete = async (id: string) => {
    await deletePair(id);
    fetchPairs();
  };

  useEffect(() => { fetchPairs(); }, []);

  return (
    <div>
      <h2>Pairs</h2>
      {pairs.map(p => <PairCard key={p.id} {...p} onDelete={handleDelete} />)}
    </div>
  );
};
