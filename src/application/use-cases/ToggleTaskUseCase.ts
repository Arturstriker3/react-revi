import { TaskRepository } from "@domain/repositories/TaskRepository";
import { TaskResponseDTO } from "../dtos/TaskDTO";

export class ToggleTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(taskId: string): Promise<TaskResponseDTO> {
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new Error("Task not found");
    }

    const toggledTask = task.toggle();
    const updatedTask = await this.taskRepository.update(toggledTask);

    return this.toDTO(updatedTask);
  }

  private toDTO(task: any): TaskResponseDTO {
    return {
      id: task.id,
      title: task.title,
      completed: task.completed,
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString(),
    };
  }
}
