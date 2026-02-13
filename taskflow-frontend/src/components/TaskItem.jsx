import { useState } from "react";

function TaskItem({ task, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleSave = () => {
    if (!newTitle.trim()) return;

    onEdit(task.id, newTitle);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewTitle(task.title);
    setIsEditing(false);
  };

  return (
    <li
      style={{
        marginBottom: "10px",
        textDecoration: task.completed ? "line-through" : "none",
      }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task)}
      />

      {isEditing ? (
        <>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
          <button onClick={handleSave} style={{ marginLeft: "5px" }}>
            Salvar
          </button>
          <button onClick={handleCancel} style={{ marginLeft: "5px" }}>
            Cancelar
          </button>
        </>
      ) : (
        <>
          <span style={{ marginLeft: "10px" }}>{task.title}</span>
          <button
  onClick={() => setIsEditing(true)}
  disabled={task.completed}
  style={{
    marginLeft: "10px",
    opacity: task.completed ? 0.5 : 1,
    cursor: task.completed ? "not-allowed" : "pointer",
  }}
>
  Editar
  </button>
        </>
      )}

      <button
        onClick={() => onDelete(task.id)}
        style={{ marginLeft: "10px" }}
      >
        Deletar
      </button>
    </li>
  );
}

export default TaskItem;
