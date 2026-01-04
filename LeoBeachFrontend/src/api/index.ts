import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7134/api", // aggiorna con la porta del tuo backend
});

export default api;

// Players
export const getPlayers = () => api.get("/players");
export const createPlayer = (data: any) => api.post("/players", data);
export const updatePlayer = (id: string, data: any) => api.put(`/players/${id}`, data);
export const deletePlayer = (id: string) => api.delete(`/players/${id}`);
export const getPlayerStats = (playerId: string) =>
  api.get(`/players/${playerId}/stats`).then((res) => res.data);

// Pairs
export const getPairs = () => api.get("/pairs");
export const createPair = (data: any) => api.post("/pairs", data);
export const updatePair = (id: string, data: any) => api.put(`/pairs/${id}`, data);
export const deletePair = (id: string) => api.delete(`/pairs/${id}`);
export const getPairStats = (pairId: string) =>
  api.get(`/pairs/${pairId}/stats`).then((res) => res.data);
