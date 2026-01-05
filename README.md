<div align="center">

# 🏐 LeoBeach

### *Il Futuro del Beach Volleyball Management*

[![.NET](https://img.shields.io/badge/.NET-8.0-512BD4?style=for-the-badge&logo=dotnet)](https://dotnet.microsoft.com/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-Open_Source-green?style=for-the-badge)](LICENSE)

**Una piattaforma completa per gestione giocatori, coppie, statistiche avanzate e analisi AI nel beach volley**

[🚀 Quick Start](#-installazione-rapida) • [📖 Documentazione](#-documentazione-tecnica) • [🤝 Contribuisci](#-contribuisci) • [🐛 Report Bug](#-segnala-un-bug)

---

</div>

## 🎯 Cos'è LeoBeach?

**LeoBeach** è un'applicazione cross-platform pensata per rivoluzionare il mondo del beach volleyball attraverso tecnologia e data analytics.

### 🌟 Vision del Progetto

L'obiettivo principale è **raccogliere e analizzare dati di gioco** su giocatori e coppie per:

- 📊 **Analisi Avanzate**: Dashboard interattive con statistiche in tempo reale
- 🤖 **Modelli AI**: Intelligenza artificiale per strategie personalizzate
- 📈 **Performance Tracking**: Monitoraggio continuo dei miglioramenti
- 🎯 **Ottimizzazione Tattica**: Suggerimenti basati su dati storici

### 🚀 Feature Attuali e Future

#### ✅ Già Implementate
- Gestione completa giocatori con profili dettagliati
- Sistema di formazione coppie
- Architettura backend scalabile con .NET 8
- Frontend responsive con React 18

#### 🔜 In Sviluppo
- **Gestione Tornei**: Crea e organizza competizioni personalizzate
- **Matchmaking "Tinder-Style"**: Trova il partner perfetto in base a skill e disponibilità
- **Statistiche Live**: Dashboard realtime durante le partite
- **Scouting Avanzato**: Analisi video e tracking movimenti
- **Mobile App**: Versioni iOS e Android native

---

## 📋 Stack Tecnologico

<table>
<tr>
<td align="center" width="33%">

### 🔧 Backend
![.NET](https://img.shields.io/badge/.NET_8_Web_API-512BD4?style=flat-square&logo=dotnet)

**Framework**: .NET 8.0+  
**Architettura**: REST API  
**ORM**: Entity Framework Core  
**Autenticazione**: JWT (in sviluppo)

</td>
<td align="center" width="33%">

### 💾 Database
![PostgreSQL](https://img.shields.io/badge/PostgreSQL_15+-4169E1?style=flat-square&logo=postgresql&logoColor=white)

**DBMS**: PostgreSQL 15+  
**Migrazioni**: EF Core Migrations  
**Connection Pooling**: Npgsql  
**Backup**: Automatizzato

</td>
<td align="center" width="33%">

### 🎨 Frontend
![React](https://img.shields.io/badge/React_18+-61DAFB?style=flat-square&logo=react&logoColor=black)

**Library**: React 18.x  
**Language**: TypeScript  
**Styling**: CSS Modules / Tailwind  
**State Management**: Context API

</td>
</tr>
</table>

---

## 🚀 Installazione Rapida

> **⚠️ Prerequisiti**: Assicurati di aver installato tutti i software necessari prima di procedere

```bash
# Verifica versioni
dotnet --version    # Deve essere >= 8.0
node --version      # Deve essere >= 18.0
psql --version      # Deve essere >= 15.0
```

### 📦 Setup in 3 Passi

```bash
# 1️⃣ Clona la repository
git clone https://github.com/Xorion99/LeoBeach.git
cd LeoBeach

# 2️⃣ Avvia il backend (in una finestra terminale)
cd Api
dotnet restore
dotnet ef database update
dotnet run

# 3️⃣ Avvia il frontend (in un'altra finestra terminale)
cd ClientApp
npm install
npm start
```

🎉 **L'app è ora raggiungibile su:**
- Frontend: `http://localhost:3000`
- Backend API: `https://localhost:7001`

---

## 📖 Documentazione Tecnica

### 🏗️ Struttura del Progetto

```
LeoBeach/
│
├── 🔧 LeoBeachBackend/
│   ├── Api/
│   │   ├── Controllers/         # Endpoints REST API
│   │   │   ├── PlayersController.cs
│   │   │   ├── TeamsController.cs
│   │   │   └── StatsController.cs
│   │   │
│   │   ├── Models/             # Entity e DTOs
│   │   │   ├── Entities/       # Database entities
│   │   │   └── DTOs/           # Data Transfer Objects
│   │   │
│   │   ├── Data/               # Database Context
│   │   │   ├── ApplicationDbContext.cs
│   │   │   └── Migrations/     # EF Core migrations
│   │   │
│   │   ├── Services/           # Business Logic
│   │   │   ├── IPlayerService.cs
│   │   │   └── PlayerService.cs
│   │   │
│   │   ├── Program.cs          # Configurazione app
│   │   └── appsettings.json    # Configurazioni
│   │
│   └── Database/               # Script SQL
│       └── Schema.sql
│
├── 🎨 LeoBeachFrontend/
│   └── ClientApp/
│       ├── src/
│       │   ├── components/     # Componenti React
│       │   │   ├── Player/
│       │   │   ├── Team/
│       │   │   └── Stats/
│       │   │
│       │   ├── pages/          # Pagine principali
│       │   │   ├── Home.tsx
│       │   │   ├── Players.tsx
│       │   │   └── Dashboard.tsx
│       │   │
│       │   ├── services/       # API clients
│       │   │   └── api.ts
│       │   │
│       │   ├── hooks/          # Custom React hooks
│       │   ├── utils/          # Utility functions
│       │   └── App.tsx         # Root component
│       │
│       ├── public/
│       └── package.json
│
└── README.md
```

---

## 🛠️ Setup Dettagliato

### 1️⃣ Installazione Prerequisiti

<details>
<summary><b>🪟 Windows</b></summary>

```powershell
# Installa .NET 8 SDK
winget install Microsoft.DotNet.SDK.8

# Installa Node.js 18+
winget install OpenJS.NodeJS.LTS

# Installa PostgreSQL 15+
winget install PostgreSQL.PostgreSQL

# Verifica installazioni
dotnet --version
node --version
npm --version
psql --version
```

</details>

<details>
<summary><b>🐧 Linux (Ubuntu/Debian)</b></summary>

```bash
# Installa .NET 8 SDK
wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
sudo apt-get update && sudo apt-get install -y dotnet-sdk-8.0

# Installa Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Installa PostgreSQL 15+
sudo apt-get install -y postgresql-15 postgresql-client-15

# Verifica installazioni
dotnet --version
node --version
psql --version
```

</details>

<details>
<summary><b>🍎 macOS</b></summary>

```bash
# Installa Homebrew se non presente
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Installa .NET 8 SDK
brew install dotnet@8

# Installa Node.js 18+
brew install node@18

# Installa PostgreSQL 15+
brew install postgresql@15

# Avvia PostgreSQL
brew services start postgresql@15

# Verifica installazioni
dotnet --version
node --version
psql --version
```

</details>

---

### 2️⃣ Configurazione Database

#### 📥 Setup PostgreSQL

```bash
# Avvia PostgreSQL (se non già avviato)
# Windows: Il servizio si avvia automaticamente
# Linux: sudo systemctl start postgresql
# macOS: brew services start postgresql@15

# Accedi a PostgreSQL
psql -U postgres

# All'interno della shell PostgreSQL:
CREATE DATABASE LeoBeach;
CREATE USER leobeach_user WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE LeoBeach TO leobeach_user;

# Esci
\q
```

#### ⚙️ Configurazione Connection String

Crea o modifica `Api/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=LeoBeach;Username=leobeach_user;Password=your_secure_password"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore": "Information"
    }
  },
  "AllowedHosts": "*",
  "Cors": {
    "AllowedOrigins": [
      "http://localhost:3000",
      "http://localhost:5173"
    ]
  }
}
```

> 🔒 **Sicurezza**: In produzione, usa **variabili d'ambiente** o **Azure Key Vault** per le password

#### 🗄️ Applica Migrazioni Database

```bash
cd Api

# Installa EF Core tools (se non già installato)
dotnet tool install --global dotnet-ef

# Crea prima migrazione (se non esiste)
dotnet ef migrations add InitialCreate

# Applica migrazioni al database
dotnet ef database update

# Verifica che il DB sia stato creato
psql -U leobeach_user -d LeoBeach -c "\dt"
```

---

### 3️⃣ Configurazione Backend (.NET)

```bash
cd LeoBeachBackend/Api

# Ripristina pacchetti NuGet
dotnet restore

# Compila il progetto
dotnet build

# Esegui test (quando disponibili)
dotnet test

# Avvia in modalità sviluppo (con hot reload)
dotnet watch run

# In alternativa, avvio normale
dotnet run
```

#### 🔍 Verifica Backend

Una volta avviato, testa l'API:

```bash
# Verifica health check
curl https://localhost:7001/api/health

# Test endpoint players (esempio)
curl https://localhost:7001/api/players
```

#### 📝 Porte di Default

| Servizio | Porta HTTPS | Porta HTTP |
|----------|------------|-----------|
| Backend API | `7001` | `5001` |
| PostgreSQL | - | `5432` |

> ⚙️ Per modificare le porte, edita `Api/Properties/launchSettings.json`

---

### 4️⃣ Configurazione Frontend (React)

```bash
cd LeoBeachFrontend/ClientApp

# Installa dipendenze npm
npm install

# Avvia development server
npm start

# Build per produzione (quando necessario)
npm run build
```

#### 🎨 Configurazione Variabili d'Ambiente

Crea `ClientApp/.env.local`:

```env
# Backend API URL
REACT_APP_API_URL=https://localhost:7001
REACT_APP_API_TIMEOUT=30000

# Feature flags
REACT_APP_ENABLE_AI_FEATURES=false
REACT_APP_ENABLE_TOURNAMENTS=false
```

#### 📦 Script Disponibili

```bash
npm start          # Avvia dev server (porta 3000)
npm test           # Esegui test con Jest
npm run build      # Build produzione
npm run lint       # Controlla codice con ESLint
npm run format     # Formatta con Prettier
```

---

## 🔥 Workflow di Sviluppo

### 🚀 Avvio Completo

Apri **3 terminali** separati:

**Terminale 1 - Database** (opzionale se già avviato)
```bash
# Solo se non è già in esecuzione
sudo systemctl start postgresql  # Linux
brew services start postgresql@15  # macOS
```

**Terminale 2 - Backend**
```bash
cd LeoBeachBackend/Api
dotnet watch run
```

**Terminale 3 - Frontend**
```bash
cd LeoBeachFrontend/ClientApp
npm start
```

### 🔄 Reset Database

```bash
cd Api

# Elimina database
dotnet ef database drop --force

# Ricrea e applica migrazioni
dotnet ef database update

# Opzionale: Seed dati di test
dotnet run --seed-data
```

---

## 🐛 Risoluzione Problemi

<details>
<summary><b>❌ Errore: "dotnet: command not found"</b></summary>

**Causa**: .NET SDK non installato o non nel PATH

**Soluzione**:
```bash
# Reinstalla .NET 8
# Windows
winget install Microsoft.DotNet.SDK.8

# Linux/macOS - segui guida ufficiale
https://dotnet.microsoft.com/download/dotnet/8.0
```

</details>

<details>
<summary><b>❌ Errore: "Unable to connect to PostgreSQL"</b></summary>

**Causa**: PostgreSQL non avviato o credenziali errate

**Soluzione**:
```bash
# 1. Verifica che PostgreSQL sia avviato
# Windows: Servizi > PostgreSQL
# Linux: sudo systemctl status postgresql
# macOS: brew services list

# 2. Testa connessione manuale
psql -U postgres -h localhost

# 3. Verifica appsettings.json
# Password corretta? Porta giusta (5432)?
```

</details>

<details>
<summary><b>❌ Errore: "CORS policy blocked"</b></summary>

**Causa**: Frontend su porta diversa non autorizzata

**Soluzione**: Aggiungi l'origine in `Api/Program.cs`:
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder => builder
            .WithOrigins("http://localhost:3000", "http://localhost:5173")
            .AllowAnyMethod()
            .AllowAnyHeader());
});
```

</details>

<details>
<summary><b>❌ Errore: "Port already in use"</b></summary>

**Causa**: Porta 3000 o 7001 già occupata

**Soluzione**:
```bash
# Trova processo che usa la porta
# Windows
netstat -ano | findstr :3000

# Linux/macOS
lsof -i :3000

# Termina il processo o cambia porta in launchSettings.json
```

</details>

<details>
<summary><b>❌ Errore: "Entity Framework migrations not found"</b></summary>

**Causa**: EF Core tools non installato

**Soluzione**:
```bash
# Installa globally
dotnet tool install --global dotnet-ef

# Verifica installazione
dotnet ef --version

# Aggiorna se necessario
dotnet tool update --global dotnet-ef
```

</details>

---

## 🎯 Roadmap

### ✅ Fase 1 - Foundation (Q1 2025) - COMPLETATA
- [x] Setup architettura backend .NET 8
- [x] Configurazione PostgreSQL
- [x] Base frontend React
- [x] CRUD giocatori e coppie

### 🔄 Fase 2 - Core Features (Q2 2025) - IN CORSO
- [ ] Sistema autenticazione JWT
- [ ] Dashboard statistiche realtime
- [ ] API per scouting partite
- [ ] Mobile responsive design

### 📋 Fase 3 - Advanced Features (Q3 2025)
- [ ] Gestione tornei completa
- [ ] Matchmaking "Tinder-style"
- [ ] Analisi AI predittive
- [ ] Export dati e report PDF

### 🚀 Fase 4 - Mobile & Scale (Q4 2025)
- [ ] App iOS nativa
- [ ] App Android nativa
- [ ] Cloud deployment (Azure/AWS)
- [ ] Multi-tenancy per club

---

## 🤝 Contribuisci

LeoBeach è **open source** e accoglie contributi di ogni tipo!

### 🔧 Come Contribuire

1. **Fork** il repository
2. Crea un **branch** per la feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** le modifiche (`git commit -m 'Add some AmazingFeature'`)
4. **Push** al branch (`git push origin feature/AmazingFeature`)
5. Apri una **Pull Request**

### 📝 Linee Guida

- Scrivi codice pulito e commentato
- Segui le convenzioni C# e TypeScript
- Aggiungi test per nuove feature
- Aggiorna la documentazione

### 🐛 Segnala un Bug

Apri una [Issue](https://github.com/Xorion99/LeoBeach/issues) descrivendo:
- Comportamento atteso vs reale
- Passi per riprodurre
- Screenshot se possibile
- Ambiente (OS, browser, versioni)

---

## 📞 Supporto e Contatti

### 💬 Hai Domande?

- 📧 **Email**: [LCARACCI99@LIBERO.IT]



### 📚 Risorse Utili

- [Documentazione .NET](https://docs.microsoft.com/dotnet/)
- [Documentazione React](https://react.dev/)
- [PostgreSQL Guide](https://www.postgresql.org/docs/)
- [Entity Framework Core](https://docs.microsoft.com/ef/core/)

---

## 📄 Licenza

Questo progetto è rilasciato sotto licenza **Open Source**.

---

<div align="center">

### ⭐ Se ti piace il progetto, lascia una stella!



[⬆️ Torna su](#-leobeach)

</div>
