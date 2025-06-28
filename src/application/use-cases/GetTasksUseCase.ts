import { TaskRepository } from "@domain/repositories/TaskRepository";
import { TaskListResponseDTO, TaskResponseDTO } from "../dtos/TaskDTO";

export class GetTasksUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(): Promise<TaskListResponseDTO> {
    const tasks = await this.taskRepository.findAll();

    return {
      tasks: tasks.map(this.toDTO),
      total: tasks.length,
    };
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
