import { create } from "zustand";
import { Task } from "@domain/entities/Task";
import { CreateTaskUseCase } from "@application/use-cases/CreateTaskUseCase";
import { GetTasksUseCase } from "@application/use-cases/GetTasksUseCase";
import { ToggleTaskUseCase } from "@application/use-cases/ToggleTaskUseCase";
import { DeleteTaskUseCase } from "@application/use-cases/DeleteTaskUseCase";
import { LocalStorageTaskRepository } from "@infrastructure/repositories/LocalStorageTaskRepository";

interface TaskStore {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  loadTasks: () => Promise<void>;
  addTask: (title: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

const taskRepository = new LocalStorageTaskRepository();
const createTaskUseCase = new CreateTaskUseCase(taskRepository);
const getTasksUseCase = new GetTasksUseCase(taskRepository);
const toggleTaskUseCase = new ToggleTaskUseCase(taskRepository);
const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  loadTasks: async () => {
    set({ loading: true, error: null });
    try {
      const result = await getTasksUseCase.execute();
      const tasks = result.tasks.map((task) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt),
      }));
      set({ tasks, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to load tasks",
        loading: false,
      });
    }
  },

  addTask: async (title: string) => {
    set({ loading: true, error: null });
    try {
      await createTaskUseCase.execute({ title });
      await get().loadTasks();
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to add task",
        loading: false,
      });
    }
  },

  toggleTask: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await toggleTaskUseCase.execute(id);
      await get().loadTasks();
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to toggle task",
        loading: false,
      });
    }
  },

  deleteTask: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await deleteTaskUseCase.execute(id);
      await get().loadTasks();
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to delete task",
        loading: false,
      });
    }
  },
}));
