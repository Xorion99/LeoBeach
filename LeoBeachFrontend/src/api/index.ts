import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7134/api", // aggiorna con la porta del tuo backend
});

export default api;

// --- Players ---
export const getPlayers = () => api.get("/players").then(res => res.data);
export const createPlayer = (data: any) => api.post("/players", data).then(res => res.data);
export const updatePlayer = (id: string, data: any) => api.put(`/players/${id}`, data).then(res => res.data);
export const deletePlayer = (id: string) => api.delete(`/players/${id}`).then(res => res.data);
export const getPlayerStats = (playerId: string) =>
  api.get(`/players/${playerId}/stats`).then(res => res.data);

// --- Pairs ---
export const getPairs = () => api.get("/pairs").then(res => res.data);
export const createPair = (data: any) => api.post("/pairs", data).then(res => res.data);
export const updatePair = (id: string, data: any) => api.put(`/pairs/${id}`, data).then(res => res.data);
export const deletePair = (id: string) => api.delete(`/pairs/${id}`).then(res => res.data);
export const getPairStats = (pairId: string) =>
  api.get(`/scouts/${pairId}/pair-stats`).then(res => res.data);

// --- Scouts ---
export const createScout = (data: any) =>
  api.post("/scouts", data).then(res => res.data);
export const getScout = (scoutId: string) =>
  api.get(`/scouts/${scoutId}`).then(res => res.data);
export const updateScoutEvent = (scoutId: string, skillId: string, value: number) =>
  api.put(`/scouts/${scoutId}/events/${skillId}`, { value }).then(res => res.data);
