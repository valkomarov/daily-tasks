import styles from './TaskCard.module.css';

const TYPE_CLASSES = {
  sudden_bug_fix: styles.typeBug,
  planned_feature: styles.typeFeature,
  background_task: styles.typeBackground
};

export function TaskCard({ task, onToggleStatus }) {
  const typeLabel = {
    sudden_bug_fix: 'Bug Fix',
    planned_feature: 'Feature',
    background_task: 'Background'
  }[task.type];

  return (
    <article className={`${styles.card} ${task.status === 'closed' ? styles.closed : ''}`}>
      <div className={TYPE_CLASSES[task.type]}>{typeLabel}</div>
      <h3 className={styles.title}>{task.title}</h3>
      {task.description && <p className={styles.description}>{task.description}</p>}
      <div className={styles.meta}>
        <span className={styles.status}>
          {task.status === 'open' ? 'Open' : 'Closed'}
        </span>
        <span>{new Date(task.created_at).toLocaleDateString()}</span>
      </div>
    </article>
  );
}
