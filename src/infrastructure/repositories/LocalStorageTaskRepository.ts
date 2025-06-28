import { TaskRepository } from "@domain/repositories/TaskRepository";
import { Task } from "@domain/entities/Task";

const STORAGE_KEY = "tasks";

export class LocalStorageTaskRepository implements TaskRepository {
  private getTasksFromStorage(): Task[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];

      const tasks = JSON.parse(stored);
      return tasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt),
      }));
    } catch {
      return [];
    }
  }

  private saveTasksToStorage(tasks: Task[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  async findAll(): Promise<Task[]> {
    return this.getTasksFromStorage();
  }

  async findById(id: string): Promise<Task | null> {
    const tasks = this.getTasksFromStorage();
    return tasks.find((task) => task.id === id) || null;
  }

  async save(task: Task): Promise<Task> {
    const tasks = this.getTasksFromStorage();
    tasks.push(task);
    this.saveTasksToStorage(tasks);
    return task;
  }

  async update(task: Task): Promise<Task> {
    const tasks = this.getTasksFromStorage();
    const index = tasks.findIndex((t) => t.id === task.id);

    if (index === -1) {
      throw new Error("Task not found");
    }

    tasks[index] = task;
    this.saveTasksToStorage(tasks);
    return task;
  }

  async delete(id: string): Promise<void> {
    const tasks = this.getTasksFromStorage();
    const filteredTasks = tasks.filter((task) => task.id !== id);
    this.saveTasksToStorage(filteredTasks);
  }
}
