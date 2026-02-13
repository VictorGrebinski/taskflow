import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { getTasks, createTask, deleteTask, updateTask } from "./services/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  // 🔹 Carregar tarefas ao iniciar
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, []);

  // 🔹 Adicionar tarefa (sem reload geral)
  const handleAddTask = async (title) => {
    try {
      const newTask = await createTask(title);

      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Deletar tarefa (sem reload geral)
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);

      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Alternar concluído (sem reload geral)
  const handleToggle = async (task) => {
    try {
      const updatedTask = {
        ...task,
        completed: !task.completed,
      };

      await updateTask(task.id, {
        completed: updatedTask.completed,
      });

      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === task.id ? updatedTask : t
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Editar título (sem reload geral)
  const handleEdit = async (id, newTitle) => {
    try {
      await updateTask(id, { title: newTitle });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, title: newTitle } : task
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Filtro
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div style={{ padding: "40px" }}>
      <h1>TaskFlow</h1>

      <TaskForm onAddTask={handleAddTask} />

      <div style={{ margin: "20px 0" }}>
        <button onClick={() => setFilter("all")}>Todas</button>

        <button
          onClick={() => setFilter("pending")}
          style={{ marginLeft: "10px" }}
        >
          Pendentes
        </button>

        <button
          onClick={() => setFilter("completed")}
          style={{ marginLeft: "10px" }}
        >
          Concluídas
        </button>
      </div>

      <TaskList
        tasks={filteredTasks}
        onDelete={handleDelete}
        onToggle={handleToggle}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;
