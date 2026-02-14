import TaskItem from "./TaskItem";

function TaskList({ tasks, onDelete, onToggle, onEdit, filter, isLoading }) {
  if (isLoading) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon" aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v4" />
            <path d="m16.2 7.8 2.9-2.9" />
            <path d="M18 12h4" />
            <path d="m16.2 16.2 2.9 2.9" />
            <path d="M12 18v4" />
            <path d="m4.9 19.1 2.9-2.9" />
            <path d="M2 12h4" />
            <path d="m4.9 4.9 2.9 2.9" />
          </svg>
        </div>
        <p className="empty-state__title">Carregando tarefas...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    const messages = {
      all: {
        title: "Nenhuma tarefa ainda",
        description: "Comece adicionando sua primeira tarefa acima.",
      },
      pending: {
        title: "Nenhuma tarefa pendente",
        description: "Todas as tarefas foram concluidas.",
      },
      completed: {
        title: "Nenhuma tarefa concluida",
        description: "Conclua uma tarefa marcando o checkbox.",
      },
    };

    const { title, description } = messages[filter] || messages.all;

    return (
      <div className="empty-state" role="status">
        <div className="empty-state__icon" aria-hidden="true">
          {filter === "completed" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          ) : filter === "pending" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          )}
        </div>
        <p className="empty-state__title">{title}</p>
        <p className="empty-state__description">{description}</p>
      </div>
    );
  }

  return (
    <ul className="task-list" role="list" aria-label="Lista de tarefas">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default TaskList;
