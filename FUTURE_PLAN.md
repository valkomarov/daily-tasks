# Future Development Plan

## Phase 1: Database & Authentication (Next)

### 1.1 Supabase Setup
- [ ] Create Supabase project
- [ ] Run SQL migrations for Task and User tables
- [ ] Configure Row Level Security (RLS) policies

### 1.2 Authentication
- [ ] Set up Supabase Auth provider
- [ ] Create Google OAuth credentials
- [ ] Implement auth hooks (`useAuth`, `useSession`)
- [ ] Protect routes behind authentication

### 1.3 API Integration
- [ ] Create Supabase client utility
- [ ] Replace local state with Supabase queries
- [ ] Implement optimistic updates for better UX

## Phase 2: E-Ink Device Sync (After Auth)

### 2.1 WebSocket Connection
- [ ] Set up Supabase Realtime subscription
- [ ] Implement reconnection logic with exponential backoff
- [ ] Create e-ink sync service

### 2.2 E-Ink Client
- [ ] Create lightweight e-ink display page
- [ ] Implement view selector (today/week)
- [ ] Add automatic reconnection and sync on reconnect

## Phase 3: Polish & Production

### 3.1 Internationalization
- [ ] Add Czech translations (`cs.json`)
- [ ] Implement locale detection
- [ ] Add language switcher

### 3.2 PWA Enhancements
- [ ] Add service worker for offline support
- [ ] Create app icons and splash screens
- [ ] Configure manifest.json properly

### 3.3 Testing
- [ ] Add unit tests for TaskList component
- [ ] Add integration tests for API calls
- [ ] Set up CI/CD pipeline

### 3.4 Production Deployment
- [ ] Deploy to Vercel
- [ ] Configure environment variables in Vercel
- [ ] Set up custom domain (optional)

## Quick Wins (Any Time)

- [ ] Add task editing
- [ ] Add task deletion
- [ ] Add task search/filtering
- [ ] Add keyboard shortcuts
- [ ] Add dark mode toggle
- [ ] Add task ordering within type groups

## Future Enhancements (v2+)

- [ ] Cross-user collaboration
- [ ] Task categories/tags
- [ ] Recurring tasks
- [ ] Task templates
- [ ] Analytics and reporting
- [ ] Mobile app (React Native)
