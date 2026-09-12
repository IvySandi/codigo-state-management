# Team Manager

A JavaScript-only Next.js team manager using Redux, React Redux, Tailwind CSS, local storage, and the BALLDONTLIE players API.

## Setup

Create `.env.local` with:

```text
BALLDONTLIE_API_KEY=your_api_key
BALLDONTLIE_BASE_URL=https://api.balldontlie.io
```

Run:

```bash
npm run dev
```

## Structure

```text
app/
├── api/players/route.js        # Server-side API 
├── components/
│   ├── auth/                   # Login UI
│   ├── players/                # Player directory
│   ├── teams/                  # Team CRUD and player-selection modals
│   └── ui/                     # Reusable UI components
├── hooks/use-players.js        # Cursor pagination logic
├── lib/                        # Storage, validation, and data helpers
├── store/                      # Redux store and provider
├── layout.js
└── page.js
```

Authentication and teams are stored in browser local storage. Players are fetched 10 data at a time, using cursor-based pagination and a player can belong to only one team. API results and error states are kept only during the current session.
