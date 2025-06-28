export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class TaskEntity implements Task {
  constructor(
    public readonly id: string,
    public title: string,
    public completed: boolean,
    public readonly createdAt: Date,
    public updatedAt: Date
  ) {}

  static create(title: string): TaskEntity {
    const now = new Date();
    return new TaskEntity(crypto.randomUUID(), title, false, now, now);
  }

  toggle(): TaskEntity {
    return new TaskEntity(
      this.id,
      this.title,
      !this.completed,
      this.createdAt,
      new Date()
    );
  }

  updateTitle(title: string): TaskEntity {
    return new TaskEntity(
      this.id,
      title,
      this.completed,
      this.createdAt,
      new Date()
    );
  }
}
