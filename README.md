# Daily Tasks

A Progressive Web App for tracking tasks with real-time status displayed on black & white e-ink devices.

## Features

- **Task Management**: Create, view, and close tasks
- **Task Types**: Bug fixes, planned features, and background tasks
- **Views**: Today, Yesterday, and This Week task filtering
- **E-Ink Support**: Minimal high-contrast theme for e-ink devices
- **PWA**: Installable, works offline
- **Multi-language**: Internationalization support

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19
- **Database**: PostgreSQL (via Supabase)
- **Auth**: Supabase Auth (Google OAuth + fallback)
- **Styling**: CSS Modules + CSS Variables
- **Real-time**: WebSocket (Supabase Realtime)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
npm install
```

### Environment Setup

Copy the example environment file and fill in your values:

```bash
cp .env.example .env.local
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── TaskCard/    # Task display component
│   └── TaskList/    # Task list with filtering
├── messages/         # i18n translations
├── styles/          # Global styles and themes
│   ├── theme-bw.css     # E-ink minimal theme
│   └── theme-color.css  # Full color theme
└── utils/           # Helper functions
```

## Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Lint project
npm test             # Run unit tests
```

## License

MIT
