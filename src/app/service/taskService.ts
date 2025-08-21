// services/userService.ts
import api from "@/app/lib/axios";

export const getTasks = async () => {
  const response = await api.get("/task");
  return response.data;
};

export const createTask = async (data: any) => {
  const response = await api.post("/task", data);
  return response.data;
};

export const deleteTasks = async (taskId: number) => {
  const response = await api.delete(`/task/${taskId}`);
  return response.data;
};

// New method to update a task
export const updateTask = async (taskId: number, data: any) => {
  const response = await api.put(`/task/${taskId}`, data);
  return response.data;
};
