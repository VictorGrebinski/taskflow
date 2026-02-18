import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { getTasks, createTask, deleteTask, updateTask } from "./services/api";
import "./App.css";
import LoadingBar from "./components/LoadingBar";
import LoadingOverlay from "./components/LoadingOverlay";


function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1500)); // ⬅ FORÇA 1.5s
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (title) => {
    try {
      const newTask = await createTask(title);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = async (task) => {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      await updateTask(task.id, { completed: updatedTask.completed });
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? updatedTask : t)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id, newTitle) => {
    try {
      await updateTask(id, { title: newTitle });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, title: newTitle } : task,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const totalCount = tasks.length;
  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  const filterCounts = {
    all: totalCount,
    pending: pendingCount,
    completed: completedCount,
  };

  return (
    <div className="app">
      <LoadingOverlay isLoading={isLoading} />
    <LoadingBar isLoading={isLoading} />
      <header className="app-header">
        <div className="app-header__brand">
          <div className="app-header__logo" aria-hidden="true">
            T
          </div>
          <h1 className="app-header__title">TaskFlow</h1>
        </div>
        <p className="app-header__subtitle">
          Organize suas tarefas de forma simples e eficiente.
        </p>
      </header>

      {!isLoading && totalCount > 0 && (
        <div
          className="stats-bar"
          role="status"
          aria-label="Estatisticas das tarefas"
        >
          <div className="stats-bar__item">
            <span
              className="stats-bar__dot stats-bar__dot--total"
              aria-hidden="true"
            />
            <span>
              <span className="stats-bar__number">{totalCount}</span>{" "}
              {totalCount === 1 ? "tarefa" : "tarefas"}
            </span>
          </div>
          <div className="stats-bar__item">
            <span
              className="stats-bar__dot stats-bar__dot--pending"
              aria-hidden="true"
            />
            <span>
              <span className="stats-bar__number">{pendingCount}</span>{" "}
              {pendingCount === 1 ? "pendente" : "pendentes"}
            </span>
          </div>
          <div className="stats-bar__item">
            <span
              className="stats-bar__dot stats-bar__dot--done"
              aria-hidden="true"
            />
            <span>
              <span className="stats-bar__number">{completedCount}</span>{" "}
              {completedCount === 1 ? "concluida" : "concluidas"}
            </span>
          </div>
        </div>
      )}

      <TaskForm onAddTask={handleAddTask} />

      <nav className="filter-tabs" aria-label="Filtrar tarefas">
        {[
          { key: "all", label: "Todas" },
          { key: "pending", label: "Pendentes" },
          { key: "completed", label: "Concluidas" },
        ].map(({ key, label }) => (
          <button
            key={key}
            className={`filter-tabs__btn ${
              filter === key ? "filter-tabs__btn--active" : ""
            }`}
            onClick={() => setFilter(key)}
            aria-pressed={filter === key}
          >
            {label}
            <span className="filter-tabs__count">{filterCounts[key]}</span>
          </button>
        ))}
      </nav>

      <TaskList
        tasks={filteredTasks}
        onDelete={handleDelete}
        onToggle={handleToggle}
        onEdit={handleEdit}
        filter={filter}
        isLoading={isLoading}
      />

      <footer className="app-footer">
        <p>
          TaskFlow &mdash; Desenvolvido por{" "}
          <a
            href="https://github.com/VictorGrebinski"
            target="_blank"
            rel="noopener noreferrer"
          >
            Victor Grebinski
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
