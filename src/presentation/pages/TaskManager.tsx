import React, { useState, useEffect } from "react";
import {
  Card,
  Input,
  Button,
  List,
  Checkbox,
  Space,
  Typography,
  message,
  Spin,
  Alert,
  Empty,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTaskStore } from "../stores/taskStore";

const { Title, Text } = Typography;

const TaskManager: React.FC = () => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const { tasks, loading, error, loadTasks, addTask, toggleTask, deleteTask } =
    useTaskStore();

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) {
      message.warning("Por favor, digite um título para a tarefa");
      return;
    }

    addTask(newTaskTitle);
    setNewTaskTitle("");
    message.success("Tarefa criada com sucesso!");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const handleToggleTask = async (id: string) => {
    try {
      await toggleTask(id);
      message.success("Status da tarefa atualizado!");
    } catch (error) {
      message.error("Erro ao atualizar tarefa");
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      message.success("Tarefa deletada com sucesso!");
    } catch (error) {
      message.error("Erro ao deletar tarefa");
    }
  };

  if (loading && tasks.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
        <div style={{ marginTop: "16px" }}>
          <Text>Carregando tarefas...</Text>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Title level={2}>Gerenciador de Tarefas</Title>
      <Text type="secondary">
        Gerencie suas tarefas com Clean Architecture e Ant Design
      </Text>

      <Card style={{ marginTop: "24px" }}>
        {error && (
          <Alert
            message="Erro"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: "16px" }}
          />
        )}

        <Space.Compact style={{ width: "100%", marginBottom: "16px" }}>
          <Input
            placeholder="Adicionar nova tarefa..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            size="large"
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddTask}
            disabled={loading}
            size="large"
          >
            Adicionar
          </Button>
        </Space.Compact>

        {tasks.length === 0 ? (
          <Empty
            description="Nenhuma tarefa encontrada"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
          <List
            dataSource={tasks}
            renderItem={(task) => (
              <List.Item
                actions={[
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteTask(task.id)}
                    disabled={loading}
                  >
                    Deletar
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Checkbox
                      checked={task.completed}
                      onChange={() => handleToggleTask(task.id)}
                      disabled={loading}
                    />
                  }
                  title={
                    <Text
                      delete={task.completed}
                      type={task.completed ? "secondary" : undefined}
                    >
                      {task.title}
                    </Text>
                  }
                  description={
                    <Space direction="vertical" size="small">
                      <Text type="secondary" style={{ fontSize: "12px" }}>
                        Criado em:{" "}
                        {new Date(task.createdAt).toLocaleDateString()}
                      </Text>
                      {task.completed && (
                        <Text type="secondary" style={{ fontSize: "12px" }}>
                          Concluído em:{" "}
                          {new Date(task.updatedAt).toLocaleDateString()}
                        </Text>
                      )}
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </Card>
    </div>
  );
};

export default TaskManager;
