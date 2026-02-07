# AGENTS.md

This document provides guidelines for AI agents working on the Task Tracker PWA project.

## Project Overview

A Progressive Web App for tracking tasks with real-time status displayed on black & white e-ink devices via HTTP/WebSocket communication with a Node.js backend. Tasks are primarily managed via desktop browser; e-ink device serves as a read-only display only.

**Stack**:
- **Frontend**: Next.js (App Router) - React SSR with PWA support
- **Database**: PostgreSQL (via Supabase) - relational storage for users and tasks
- **Auth**: Supabase Auth (Google OAuth + fallback)
- **Hosting**: Vercel (frontend/API) + Supabase (database)
- **WebSocket**: Supabase Realtime for e-ink device sync

## Build Commands

```bash
# Install dependencies
npm install

# Start development server (client + dev mode)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run unit tests
npm test

# Run a single test file
npm test -- src/components/TaskList.test.js

# Run tests with coverage
npm run test:coverage

# Lint project
npm run lint

# Fix auto-fixable lint issues
npm run lint:fix
```

## Code Style Guidelines

### General Principles

- Keep components small and focused (single responsibility)
- Use functional components with hooks over class components
- Prefer composition over inheritance
- Write self-documenting code with clear naming

### Naming Conventions

- **Components**: PascalCase (e.g., `TaskList`, `EinkDisplay`)
- **Files**: camelCase for utilities, PascalCase for components (e.g., `taskUtils.js`, `TaskCard.jsx`)
- **Props**: camelCase (e.g., `onTaskComplete`, `taskStatus`)
- **State**: camelCase (e.g., `isLoading`, `taskList`)
- **Constants**: SCREAMING_SNAKE_CASE (e.g., `MAX_TASKS`, `WS_URL`)
- **Custom hooks**: camelCase with "use" prefix (e.g., `useTasks`, `useWebSocket`)

### Formatting & Imports

- Use 2 spaces for indentation
- Use single quotes for strings
- No semicolons at end of statements
- Maximum line length: 100 characters

**Import order:**
```javascript
import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { taskApi } from '../api/taskApi';
import { useWebSocket } from '../hooks/useWebSocket';

import styles from './TaskList.module.css';
```

### Component Structure

```jsx
// 1. Imports
// 2. Constants (if any)
// 3. Helper functions (if any)
// 4. Main component
// 5. PropTypes
// 6. Default props (if needed)
```

### Error Handling

- Use try/catch for async operations
- Create custom error boundaries for React components
- Log errors with context using `console.error` with descriptive messages
- Handle WebSocket connection failures gracefully with reconnection logic
- Never expose sensitive data in error messages

### State Management

- Use `useState` for simple local state
- Use `useReducer` for complex state logic
- Use custom hooks to share stateful logic
- Avoid prop drilling; use composition or Context API

### Testing

- Place tests alongside source files (e.g., `TaskList.jsx` → `TaskList.test.jsx`)
- Use meaningful test descriptions: "should render tasks in correct order"
- Test component behavior, not implementation details
- Mock external dependencies (API, WebSocket)
- Aim for meaningful coverage, not just high numbers

### Styling (CSS Modules + CSS Variables)

- Use CSS Modules for component-scoped styles (`Component.module.css`)
- Use CSS variables for theming (colors, fonts, spacing)
- Organize styles directory: `variables.css`, `global.css`, theme files
- No Tailwind CSS, no styled-components

**Component styling pattern:**
```jsx
import styles from './TaskCard.module.css';

export function TaskCard({ task }) {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{task.title}</h3>
    </article>
  );
}
```

**Theme files:**
- `src/styles/variables.css` - CSS custom properties (colors, fonts)
- `src/styles/global.css` - Reset and base styles
- `src/styles/theme-bw.css` - E-ink: black/white only, max contrast
- `src/styles/theme-color.css` - Full color theme for desktop UI

**E-ink detection:**
```css
@media (forced-colors: active) {
  :root {
    --bg-color: white;
    --text-color: black;
    --border-color: black;
  }
}
```

### Authentication

- Implement Google OAuth via Firebase Auth or NextAuth.js
- Support internal username/password auth as fallback
- Store tokens securely (HTTP-only cookies preferred)
- Provide auth hooks: `useAuth`, `useSession`

### PWA Specific

- All assets must be cached via service worker for offline use
- Manifest file must be complete with icons and theme colors
- Handle network transitions gracefully (online/offline)
- Use semantic HTML for accessibility

### API & WebSocket

- Use REST API for CRUD operations (POST, GET, PUT, DELETE)
- Use WebSocket for real-time task status updates to e-ink device
- Implement reconnection logic for WebSocket with exponential backoff
- Store API/WebSocket URLs in environment variables (`VITE_API_URL`, `VITE_WS_URL`)

### Internationalization

- Detect user locale from `navigator.language` or `Accept-Language` header
- Store translations in `messages/` directory: `en.json`, `cs.json`, etc.
- Use Next.js built-in i18n routing or a lightweight library (next-intl)
- Keep UI strings in translation files, never hardcode display text

## Project Structure

```
src/
├── app/             # Next.js App Router pages
├── components/      # React components
├── hooks/           # Custom React hooks
├── lib/             # Utility libraries (auth, api clients)
├── messages/        # i18n translations (en.json, cs.json, etc.)
├── services/        # WebSocket, notification services
├── styles/          # Global styles and themes
│   ├── variables.css    # CSS custom properties
│   ├── global.css       # Reset and base styles
│   ├── theme-bw.css     # E-ink minimal theme
│   └── theme-color.css  # Full color theme
└── utils/           # Helper functions
```

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (server-only)
- `NEXT_PUBLIC_APP_NAME` - Application name for PWA manifest
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
