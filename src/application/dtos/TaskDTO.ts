export interface CreateTaskDTO {
  title: string;
}

export interface UpdateTaskDTO {
  id: string;
  title?: string;
  completed?: boolean;
}

export interface TaskResponseDTO {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TaskListResponseDTO {
  tasks: TaskResponseDTO[];
  total: number;
}
