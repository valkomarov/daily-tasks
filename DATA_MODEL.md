# Data Model Specification

**Database**: PostgreSQL (via Supabase)

## Task

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key, generated on creation |
| `title` | string | Task title (max 200 chars) |
| `description` | string | Optional detailed description |
| `type` | enum | `sudden_bug_fix`, `planned_feature`, `background_task` |
| `status` | enum | `open`, `closed` |
| `created_at` | ISO8601 timestamp | When task was created |
| `closed_at` | ISO8601 timestamp | When task was closed (null if open) |
| `user_id` | UUID | Reference to authenticated user |

### Type Ordering (display priority)

1. `sudden_bug_fix` (highest)
2. `planned_feature`
3. `background_task` (lowest)

## User (Auth-Only)

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `provider` | enum | `google`, `internal` |
| `external_id` | string | Provider-specific user identifier |
| `email` | string | User email (from provider) |
| `created_at` | ISO8601 timestamp |

**Note**: No cross-user collaboration in v1. Each user sees only their own tasks.

## Views / Time Ranges

### "Today"
- All `open` tasks
- All `closed` tasks where `closed_at` date == today

### "Yesterday"
- All `closed` tasks where `closed_at` date == yesterday

### "Current Week"
- Monday 00:00 → Sunday 23:59 (user's timezone)
- All tasks created OR closed within this range

## API Response Patterns

### Task List Response
```json
{
  "tasks": [
    {
      "id": "uuid",
      "title": "string",
      "description": "string|null",
      "type": "sudden_bug_fix|planned_feature|background_task",
      "status": "open|closed",
      "created_at": "ISO8601",
      "closed_at": "ISO8601|null"
    }
  ],
  "view": "today|yesterday|week"
}
```

### Single Task Response
```json
{
  "task": { /* Task object */ }
}
```

## WebSocket Events

### Outbound (Server → E-Ink Device)
| Event | Payload |
|-------|---------|
| `task_created` | `{ task: Task }` |
| `task_updated` | `{ task: Task }` |
| `tasks_synced` | `{ tasks: Task[], view: string }` |

### Inbound (Device → Server)
| Event | Payload |
|-------|---------|
| `request_sync` | `{ view: "today" \| "week" }` |

## Administrative Commands

### Weekly Cleanup
```
Command: archive_completed
Action: Move all tasks with status=closed and closed_at < start_of_current_week to archive table
```
