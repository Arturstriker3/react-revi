import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  InputNumber,
  Space,
  Popconfirm,
  message,
} from "antd";
import { useMonsterStore } from "../stores/monsterStore";
import { MonsterDTO } from "../../application/dtos/MonsterDTO";

const initialForm: Omit<MonsterDTO, "id" | "created_at" | "updated_at"> = {
  name: "",
  attack: 0,
  defense: 0,
  speed: 0,
  hp: 0,
  image_url: "",
};

const Monsters: React.FC = () => {
  const {
    monsters,
    loading,
    error,
    fetchMonsters,
    createMonster,
    updateMonster,
    deleteMonster,
  } = useMonsterStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMonster, setEditingMonster] = useState<MonsterDTO | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchMonsters();
  }, [fetchMonsters]);

  useEffect(() => {
    if (error) message.error(error);
  }, [error]);

  const openCreateModal = () => {
    setEditingMonster(null);
    form.setFieldsValue(initialForm);
    setIsModalOpen(true);
  };

  const openEditModal = (monster: MonsterDTO) => {
    setEditingMonster(monster);
    form.setFieldsValue(monster);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteMonster(id);
    message.success("Monstro excluído");
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingMonster) {
        await updateMonster(editingMonster.id, values);
        message.success("Monstro atualizado");
      } else {
        await createMonster(values);
        message.success("Monstro criado");
      }
      setIsModalOpen(false);
      form.resetFields();
    } catch (e) {
      // Erro de validação, não faz nada
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const columns = [
    { title: "Nome", dataIndex: "name", key: "name" },
    { title: "Ataque", dataIndex: "attack", key: "attack" },
    { title: "Defesa", dataIndex: "defense", key: "defense" },
    { title: "Velocidade", dataIndex: "speed", key: "speed" },
    { title: "HP", dataIndex: "hp", key: "hp" },
    {
      title: "Imagem",
      dataIndex: "image_url",
      key: "image_url",
      render: (url: string) =>
        url ? (
          <img
            src={url}
            alt="monstro"
            style={{ width: 40, height: 40, objectFit: "cover" }}
          />
        ) : (
          "-"
        ),
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: MonsterDTO) => (
        <Space>
          <Button type="link" onClick={() => openEditModal(record)}>
            Editar
          </Button>
          <Popconfirm
            title="Excluir este monstro?"
            onConfirm={() => handleDelete(record.id)}
            okText="Sim"
            cancelText="Não"
          >
            <Button type="link" danger>
              Excluir
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={openCreateModal}
        style={{ marginBottom: 16 }}
      >
        Adicionar Monstro
      </Button>
      <Table
        dataSource={monsters}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title={editingMonster ? "Editar Monstro" : "Adicionar Monstro"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={editingMonster ? "Atualizar" : "Criar"}
        destroyOnClose
      >
        <Form form={form} layout="vertical" initialValues={initialForm}>
          <Form.Item
            name="name"
            label="Nome"
            rules={[{ required: true, message: "Digite o nome" }]}
          >
            {" "}
            <Input />{" "}
          </Form.Item>
          <Form.Item
            name="attack"
            label="Ataque"
            rules={[
              {
                required: true,
                type: "number",
                min: 0,
                message: "Digite o ataque",
              },
            ]}
          >
            {" "}
            <InputNumber style={{ width: "100%" }} />{" "}
          </Form.Item>
          <Form.Item
            name="defense"
            label="Defesa"
            rules={[
              {
                required: true,
                type: "number",
                min: 0,
                message: "Digite a defesa",
              },
            ]}
          >
            {" "}
            <InputNumber style={{ width: "100%" }} />{" "}
          </Form.Item>
          <Form.Item
            name="speed"
            label="Velocidade"
            rules={[
              {
                required: true,
                type: "number",
                min: 0,
                message: "Digite a velocidade",
              },
            ]}
          >
            {" "}
            <InputNumber style={{ width: "100%" }} />{" "}
          </Form.Item>
          <Form.Item
            name="hp"
            label="HP"
            rules={[
              {
                required: true,
                type: "number",
                min: 0,
                message: "Digite o HP",
              },
            ]}
          >
            {" "}
            <InputNumber style={{ width: "100%" }} />{" "}
          </Form.Item>
          <Form.Item name="image_url" label="URL da Imagem">
            {" "}
            <Input />{" "}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Monsters;
