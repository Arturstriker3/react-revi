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
    message.success("Monster deleted");
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingMonster) {
        await updateMonster(editingMonster.id, values);
        message.success("Monster updated");
      } else {
        await createMonster(values);
        message.success("Monster created");
      }
      setIsModalOpen(false);
      form.resetFields();
    } catch (e) {
      // Validation error, do nothing
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Attack", dataIndex: "attack", key: "attack" },
    { title: "Defense", dataIndex: "defense", key: "defense" },
    { title: "Speed", dataIndex: "speed", key: "speed" },
    { title: "HP", dataIndex: "hp", key: "hp" },
    {
      title: "Image",
      dataIndex: "image_url",
      key: "image_url",
      render: (url: string) =>
        url ? (
          <img
            src={url}
            alt="monster"
            style={{ width: 40, height: 40, objectFit: "cover" }}
          />
        ) : (
          "-"
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: MonsterDTO) => (
        <Space>
          <Button type="link" onClick={() => openEditModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete this monster?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1>Monsters</h1>
      <Button
        type="primary"
        onClick={openCreateModal}
        style={{ marginBottom: 16 }}
      >
        Add Monster
      </Button>
      <Table
        dataSource={monsters}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title={editingMonster ? "Edit Monster" : "Add Monster"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={editingMonster ? "Update" : "Create"}
        destroyOnClose
      >
        <Form form={form} layout="vertical" initialValues={initialForm}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            {" "}
            <Input />{" "}
          </Form.Item>
          <Form.Item
            name="attack"
            label="Attack"
            rules={[{ required: true, type: "number", min: 0 }]}
          >
            {" "}
            <InputNumber style={{ width: "100%" }} />{" "}
          </Form.Item>
          <Form.Item
            name="defense"
            label="Defense"
            rules={[{ required: true, type: "number", min: 0 }]}
          >
            {" "}
            <InputNumber style={{ width: "100%" }} />{" "}
          </Form.Item>
          <Form.Item
            name="speed"
            label="Speed"
            rules={[{ required: true, type: "number", min: 0 }]}
          >
            {" "}
            <InputNumber style={{ width: "100%" }} />{" "}
          </Form.Item>
          <Form.Item
            name="hp"
            label="HP"
            rules={[{ required: true, type: "number", min: 0 }]}
          >
            {" "}
            <InputNumber style={{ width: "100%" }} />{" "}
          </Form.Item>
          <Form.Item name="image_url" label="Image URL">
            {" "}
            <Input />{" "}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Monsters;
