🚀 LeoBeach - Beach Volleyball Manager
LeoBeach è l'app cross-platform definitiva per gestire: giocatori, coppie, scouting e statistiche in tempo reale!

La mission finale è raccogliere dati su coppie e singoli giocatori, da dare in pasto a modelli AI, per poter
migliorare e creare strategie di gioco personalizzate. 







Il progetto è completamente open source, e ogni segnalazione bug, possibile integrazione, o miglioramento è ben accetto.



| Componente | Tecnologia     | Versione          |
| ---------- | -------------- | ----------------- |
| Backend    | .NET 8 Web API | 8.0+              |
| Database   | PostgreSQL     | 15+               |
| Frontend   | React          | 18+               |
| Hosting    | Cross-platform | Windows/Linux/Mac |



🎯 Setup Completo - Passo per Passo
1. Prerequisiti (Installa prima di tutto)
# .NET 8 SDK
winget install Microsoft.DotNet.SDK.8  # Windows
# O scarica da: https://dotnet.microsoft.com/download/dotnet/8.0

# Node.js 18+
winget install OpenJS.NodeJS  # Windows

# PostgreSQL 15+
# Scarica da: https://www.postgresql.org/download/
# Ricorda user: postgres | password: (sceglila tu)


2. Clona il Repository
git clone https://github.com/Xorion99/LeoBeach.git
cd LeoBeach

3. Backend (.NET API)
LeoBeach/
├── Api/           # Backend .NET
├── ClientApp/     # Frontend React
└── Database/      # Script SQL

# Vai nella cartella API
cd Api

# Ripristina pacchetti
dotnet restore

# Configura appsettings.json

📝 appsettings.json esempio:
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=LeoBeach;Username=postgres;Password=TUA_PASSWORD"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  },
  "AllowedHosts": "*"
}


# Migrazioni DB
dotnet ef database update

# Avvia API 
dotnet run

4. Database PostgreSQL
-- Crea database
CREATE DATABASE LeoBeach;

-- Importa script (se presenti, allo stato attuale in progress)
-- Database/Schema.sql


# Connessione tipica:

Server: localhost:5432
Database: LeoBeach
User: postgres
Password: la_tua_password

5. Frontend (React)

# Nuova terminale
cd ClientApp

# Installa dipendenze
npm install

# Avvia React (porta 3000)
npm start

✅ Frontend running su: http://localhost:3000

🚀 Comandi Utili
| Azione           | Comando                                             |
| ---------------- | --------------------------------------------------- |
| Avvia tutto      | dotnet run (API) + npm start (Frontend)             |
| Build produzione | Ancora da definire                      |
| Test API         | curl https://localhost:7001/api/health              |
| Reset DB         | dotnet ef database drop + dotnet ef database update |

📱 Struttura File
LeoBeach/
├── Api/
│   ├── Controllers/     # API endpoints
│   ├── Models/          # Entity POCO
│   ├── Data/            # DbContext
│   └── Program.cs       # Configurazione
├── ClientApp/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Pagine app
│   │   └── services/    # API calls
└── README.md

🎮 Features Principali
  
  👥 Gestione Giocatori - Profili completi
  
  👫 Formazione Coppie - Algoritmo matching
  
  📊 Statistiche Live - Dashboard realtime
  
  🔍 Scouting Partite - Tracking avanzato
  
  📱 Responsive Design - Mobile/Desktop



🔧 Risoluzione Problemi Comuni

| Problema                    | Soluzione                                 |
| --------------------------- | ----------------------------------------- |
| "dotnet: command not found" | Installa .NET 8 SDK                       |
| "npm: command not found"    | Installa Node.js 18+                      |
| Connessione DB fallita      | Verifica PostgreSQL running + credenziali |
| CORS error                  | Configura CORS in Program.cs              |
| Porte occupate              | Cambia launchSettings.json                |



