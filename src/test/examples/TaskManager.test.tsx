import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "../utils/test-utils";
import TaskManager from "../../presentation/pages/TaskManager";

// Mock do store
vi.mock("../../presentation/stores/taskStore", () => ({
  useTaskStore: () => ({
    tasks: [
      {
        id: "1",
        title: "Teste de tarefa",
        completed: false,
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-01"),
      },
    ],
    loading: false,
    error: null,
    loadTasks: vi.fn(),
    addTask: vi.fn(),
    toggleTask: vi.fn(),
    deleteTask: vi.fn(),
  }),
}));

describe("TaskManager", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render task manager page", () => {
    render(<TaskManager />);

    expect(screen.getByText("Gerenciador de Tarefas")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Adicionar nova tarefa...")
    ).toBeInTheDocument();
    expect(screen.getByText("Adicionar")).toBeInTheDocument();
  });

  it("should display existing tasks", () => {
    render(<TaskManager />);

    expect(screen.getByText("Teste de tarefa")).toBeInTheDocument();
  });

  it("should add new task when form is submitted", async () => {
    const mockAddTask = vi.fn();
    vi.mocked(useTaskStore).mockReturnValue({
      tasks: [],
      loading: false,
      error: null,
      loadTasks: vi.fn(),
      addTask: mockAddTask,
      toggleTask: vi.fn(),
      deleteTask: vi.fn(),
    });

    render(<TaskManager />);

    const input = screen.getByPlaceholderText("Adicionar nova tarefa...");
    const button = screen.getByText("Adicionar");

    fireEvent.change(input, { target: { value: "Nova tarefa" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockAddTask).toHaveBeenCalledWith("Nova tarefa");
    });
  });

  it("should show error message when trying to add empty task", async () => {
    render(<TaskManager />);

    const button = screen.getByText("Adicionar");
    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText("Por favor, digite um título para a tarefa")
      ).toBeInTheDocument();
    });
  });
});
