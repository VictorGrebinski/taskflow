import { useState, useRef, useEffect } from "react";

function TaskItem({ task, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (!newTitle.trim()) return;
    onEdit(task.id, newTitle.trim());
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewTitle(task.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancel();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });
  };

  return (
    <li
      className={`task-item ${task.completed ? "task-item--completed" : ""} ${
        isEditing ? "task-item--editing" : ""
      }`}
      role="listitem"
    >
      <input
        className="task-item__checkbox"
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task)}
        aria-label={`Marcar "${task.title}" como ${
          task.completed ? "pendente" : "concluida"
        }`}
      />

      {isEditing ? (
        <div className="task-item__edit-wrapper">
          <input
            ref={editInputRef}
            className="task-item__edit-input"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Editar titulo da tarefa"
          />
          <div className="task-item__edit-actions">
            <button
              className="task-item__edit-btn task-item__edit-btn--save"
              onClick={handleSave}
            >
              Salvar
            </button>
            <button
              className="task-item__edit-btn task-item__edit-btn--cancel"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="task-item__content">
          <span className="task-item__title">{task.title}</span>
          {task.createdAt && (
            <div className="task-item__date">{formatDate(task.createdAt)}</div>
          )}
        </div>
      )}

      {!isEditing && (
        <div className="task-item__actions">
          <button
            className="task-item__action-btn task-item__action-btn--edit"
            onClick={() => setIsEditing(true)}
            disabled={task.completed}
            aria-label={`Editar "${task.title}"`}
            title="Editar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
          </button>
          <button
            className="task-item__action-btn task-item__action-btn--delete"
            onClick={() => onDelete(task.id)}
            aria-label={`Deletar "${task.title}"`}
            title="Deletar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </button>
        </div>
      )}
    </li>
  );
}

export default TaskItem;
