import { TaskRepository } from "@domain/repositories/TaskRepository";
import { TaskEntity } from "@domain/entities/Task";
import { CreateTaskDTO, TaskResponseDTO } from "../dtos/TaskDTO";

export class CreateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(dto: CreateTaskDTO): Promise<TaskResponseDTO> {
    if (!dto.title?.trim()) {
      throw new Error("Task title is required");
    }

    const task = TaskEntity.create(dto.title.trim());
    const savedTask = await this.taskRepository.save(task);

    return this.toDTO(savedTask);
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
