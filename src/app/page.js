import { TaskList } from '../components/TaskList';

export default function HomePage() {
  return (
    <main className="app-container">
      <header className="app-header">
        <h1>Task Tracker</h1>
      </header>
      <TaskList />
    </main>
  );
}
