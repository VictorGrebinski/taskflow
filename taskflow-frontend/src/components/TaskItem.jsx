function TaskItem({ task, onDelete, onToggle }) {
  return (
    <li style={{ marginBottom: "10px" }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task)}
      />

      <span
        style={{
          marginLeft: "10px",
          textDecoration: task.completed ? "line-through" : "none",
        }}
      >
        {task.title}
      </span>

      <button
        style={{ marginLeft: "10px" }}
        onClick={() => onDelete(task.id)}
      >
        Deletar
      </button>
    </li>
  );
}

export default TaskItem;
