const API_URL = "https://taskflow-ld3e.onrender.com/tasks";

export async function getTasks() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Erro ao buscar tarefas");
  return response.json();
}

export async function createTask(title) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) throw new Error("Erro ao criar tarefa");
  return response.json();
}

export async function updateTask(id, data) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Erro ao atualizar tarefa");
  return response.json();
}

export async function deleteTask(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Erro ao deletar tarefa");
}
