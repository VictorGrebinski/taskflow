import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask(title.trim());
    setTitle("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form__input-wrapper">
        <input
          className="task-form__input"
          type="text"
          placeholder="Adicionar nova tarefa..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Titulo da nova tarefa"
        />
      </div>
      <button
        className="task-form__btn"
        type="submit"
        disabled={!title.trim()}
        aria-label="Adicionar tarefa"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Adicionar
      </button>
    </form>
  );
}

export default TaskForm;
