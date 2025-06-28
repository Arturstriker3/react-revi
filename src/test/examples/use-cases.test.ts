import { describe, it, expect, vi, beforeEach } from "vitest";
import { CreateTaskUseCase } from "../../application/use-cases/CreateTaskUseCase";
import { GetTasksUseCase } from "../../application/use-cases/GetTasksUseCase";
import { ToggleTaskUseCase } from "../../application/use-cases/ToggleTaskUseCase";
import { DeleteTaskUseCase } from "../../application/use-cases/DeleteTaskUseCase";
import { TaskEntity } from "../../domain/entities/Task";

// Mock do repositório
const mockRepository = {
  findAll: vi.fn(),
  findById: vi.fn(),
  save: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

describe("Use Cases", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("CreateTaskUseCase", () => {
    it("should create a task successfully", async () => {
      const task = TaskEntity.create("Nova tarefa");
      mockRepository.save.mockResolvedValue(task);

      const useCase = new CreateTaskUseCase(mockRepository);
      const result = await useCase.execute({ title: "Nova tarefa" });

      expect(mockRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Nova tarefa",
          completed: false,
        })
      );
      expect(result.title).toBe("Nova tarefa");
      expect(result.completed).toBe(false);
    });

    it("should throw error when title is empty", async () => {
      const useCase = new CreateTaskUseCase(mockRepository);

      await expect(useCase.execute({ title: "" })).rejects.toThrow(
        "Task title is required"
      );
      await expect(useCase.execute({ title: "   " })).rejects.toThrow(
        "Task title is required"
      );
    });
  });

  describe("GetTasksUseCase", () => {
    it("should return all tasks", async () => {
      const tasks = [
        TaskEntity.create("Tarefa 1"),
        TaskEntity.create("Tarefa 2"),
      ];
      mockRepository.findAll.mockResolvedValue(tasks);

      const useCase = new GetTasksUseCase(mockRepository);
      const result = await useCase.execute();

      expect(mockRepository.findAll).toHaveBeenCalled();
      expect(result.tasks).toHaveLength(2);
      expect(result.total).toBe(2);
    });
  });

  describe("ToggleTaskUseCase", () => {
    it("should toggle task status", async () => {
      const task = TaskEntity.create("Tarefa teste");
      const toggledTask = task.toggle();

      mockRepository.findById.mockResolvedValue(task);
      mockRepository.update.mockResolvedValue(toggledTask);

      const useCase = new ToggleTaskUseCase(mockRepository);
      const result = await useCase.execute(task.id);

      expect(mockRepository.findById).toHaveBeenCalledWith(task.id);
      expect(mockRepository.update).toHaveBeenCalledWith(toggledTask);
      expect(result.completed).toBe(true);
    });

    it("should throw error when task not found", async () => {
      mockRepository.findById.mockResolvedValue(null);

      const useCase = new ToggleTaskUseCase(mockRepository);

      await expect(useCase.execute("invalid-id")).rejects.toThrow(
        "Task not found"
      );
    });
  });

  describe("DeleteTaskUseCase", () => {
    it("should delete task successfully", async () => {
      const task = TaskEntity.create("Tarefa para deletar");
      mockRepository.findById.mockResolvedValue(task);
      mockRepository.delete.mockResolvedValue(undefined);

      const useCase = new DeleteTaskUseCase(mockRepository);
      await useCase.execute(task.id);

      expect(mockRepository.findById).toHaveBeenCalledWith(task.id);
      expect(mockRepository.delete).toHaveBeenCalledWith(task.id);
    });

    it("should throw error when task not found", async () => {
      mockRepository.findById.mockResolvedValue(null);

      const useCase = new DeleteTaskUseCase(mockRepository);

      await expect(useCase.execute("invalid-id")).rejects.toThrow(
        "Task not found"
      );
    });
  });
});
