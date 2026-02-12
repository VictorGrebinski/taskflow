import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { getTasks, createTask, deleteTask, updateTask } from "./services/api";

function App() {
  const [tasks, setTasks] = useState([]);

  // 🔹 Carrega tarefas ao iniciar
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

  // 🔹 Recarregar tarefas
  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Adicionar
  const handleAddTask = async (title) => {
    try {
      await createTask(title);
      loadTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Deletar
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Marcar como concluída
  const handleToggle = async (task) => {
    try {
      await updateTask(task.id, {
        completed: !task.completed,
      });

      loadTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>TaskFlow</h1>

      <TaskForm onAddTask={handleAddTask} />

      <TaskList
        tasks={tasks}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />
    </div>
  );
}

export default App;
