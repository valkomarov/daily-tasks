'use client';

import { useState } from 'react';
import { TaskCard } from '../TaskCard';
import styles from './TaskList.module.css';

const TYPE_OPTIONS = [
  { value: 'sudden_bug_fix', label: 'Bug Fix' },
  { value: 'planned_feature', label: 'Feature' },
  { value: 'background_task', label: 'Background' }
];

export function TaskList({ locale }) {
  const [view, setView] = useState('today');
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Welcome to Task Tracker',
      description: 'This is a sample task. Create new tasks to get started!',
      type: 'planned_feature',
      status: 'open',
      created_at: new Date().toISOString(),
      closed_at: null
    }
  ]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    type: 'planned_feature'
  });

  const filteredTasks = tasks.filter(task => {
    const now = new Date();
    const created = new Date(task.created_at);
    const closed = task.closed_at ? new Date(task.closed_at) : null;

    const isSameDay = (d1, d2) =>
      d1.toDateString() === d2.toDateString();

    const getWeekRange = (date) => {
      const start = new Date(date);
      start.setDate(date.getDate() - date.getDay());
      start.setHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);
      return { start, end };
    };

    const week = getWeekRange(now);

    switch (view) {
      case 'today':
        return task.status === 'open' || (closed && isSameDay(closed, now));
      case 'yesterday':
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        return closed && isSameDay(closed, yesterday);
      case 'week':
        return (created >= week.start && created <= week.end) ||
               (closed && closed >= week.start && closed <= week.end);
      default:
        return true;
    }
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const order = { sudden_bug_fix: 0, planned_feature: 1, background_task: 2 };
    return order[a.type] - order[b.type];
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    const task = {
      id: crypto.randomUUID(),
      title: newTask.title,
      description: newTask.description,
      type: newTask.type,
      status: 'open',
      created_at: new Date().toISOString(),
      closed_at: null
    };

    setTasks([task, ...tasks]);
    setNewTask({ title: '', description: '', type: 'planned_feature' });
    setShowForm(false);
  };

  const toggleStatus = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          status: task.status === 'open' ? 'closed' : 'open',
          closed_at: task.status === 'open' ? new Date().toISOString() : null
        };
      }
      return task;
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${view === 'today' ? styles.active : ''}`}
          onClick={() => setView('today')}
        >
          Today
        </button>
        <button
          className={`${styles.tab} ${view === 'yesterday' ? styles.active : ''}`}
          onClick={() => setView('yesterday')}
        >
          Yesterday
        </button>
        <button
          className={`${styles.tab} ${view === 'week' ? styles.active : ''}`}
          onClick={() => setView('week')}
        >
          This Week
        </button>
      </div>

      <button className={styles.button} onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'New Task'}
      </button>

      {showForm && (
        <form className={styles.createForm} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            placeholder="Task title"
            value={newTask.title}
            onChange={e => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
          <textarea
            className={styles.textarea}
            placeholder="Description (optional)"
            value={newTask.description}
            onChange={e => setNewTask({ ...newTask, description: e.target.value })}
          />
          <select
            className={styles.select}
            value={newTask.type}
            onChange={e => setNewTask({ ...newTask, type: e.target.value })}
          >
            {TYPE_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <button className={styles.button} type="submit">Create Task</button>
        </form>
      )}

      <ul className={styles.list}>
        {sortedTasks.map(task => (
          <li key={task.id}>
            <TaskCard task={task} onToggleStatus={() => toggleStatus(task.id)} />
          </li>
        ))}
        {sortedTasks.length === 0 && (
          <li className={styles.empty}>No tasks found</li>
        )}
      </ul>
    </div>
  );
}
