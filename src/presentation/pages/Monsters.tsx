import React, { useEffect, useState } from "react";
import { Button, Table, message, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useMonsterStore } from "../stores/monsterStore";
import { Monster, getCardRarity } from "../../domain/entities/Monster";
import MonsterModal from "../components/MonsterModal";
import MonsterMobileCardEdit from "../components/MonsterMobileCardEdit";
import ConfirmationModal from "../components/ConfirmationModal";
import { useOutletContext } from "react-router-dom";

const initialForm: Omit<Monster, "id" | "created_at" | "updated_at"> = {
  name: "",
  attack: 0,
  defense: 0,
  speed: 0,
  hp: 0,
  image_url: null,
};

const getRarityEffects = (rarity: ReturnType<typeof getCardRarity>) => {
  const effects = {
    legendary: {
      btnBg: "bg-amber-50 hover:bg-amber-100",
      textColor: "text-amber-600",
    },
    mythical: {
      btnBg: "bg-purple-50 hover:bg-purple-100",
      textColor: "text-purple-600",
    },
    epic: {
      btnBg: "bg-pink-50 hover:bg-pink-100",
      textColor: "text-pink-600",
    },
    rare: {
      btnBg: "bg-blue-50 hover:bg-blue-100",
      textColor: "text-blue-600",
    },
    uncommon: {
      btnBg: "bg-gray-50 hover:bg-gray-100",
      textColor: "text-gray-600",
    },
    common: {
      btnBg: "bg-gray-50 hover:bg-gray-100",
      textColor: "text-gray-500",
    },
  };

  return effects[rarity];
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
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
  const [editingMonster, setEditingMonster] = useState<Monster | null>(null);
  const { mobileOpen } = useOutletContext() as { mobileOpen: boolean };
  const [messageApi, contextHolder] = message.useMessage();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [monsterToDelete, setMonsterToDelete] = useState<Monster | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchMonsters();
  }, [fetchMonsters]);

  useEffect(() => {
    if (error) messageApi.error(error);
  }, [error, messageApi]);

  const openCreateModal = () => {
    setEditingMonster(null);
    setIsModalOpen(true);
  };

  const openEditModal = (monster: Monster) => {
    setEditingMonster(monster);
    setIsModalOpen(true);
  };

  const handleDelete = (monster: Monster) => {
    setMonsterToDelete(monster);
  };

  const confirmDelete = async () => {
    if (monsterToDelete) {
      try {
        await deleteMonster(monsterToDelete.id);
        messageApi.success("Monstro excluído com sucesso!");
        setMonsterToDelete(null);
      } catch (error) {
        messageApi.error("Erro ao excluir o monstro. Tente novamente.");
      }
    }
  };

  const handleOk = async (
    values: Omit<Monster, "id" | "created_at" | "updated_at">
  ) => {
    try {
      if (editingMonster) {
        await updateMonster(editingMonster.id, values);
        messageApi.success("Monstro atualizado");
      } else {
        await createMonster(values);
        messageApi.success("Monstro criado");
      }
      setIsModalOpen(false);
    } catch (e) {
      messageApi.error("Por favor, corrija os erros do formulário.");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
      render: (url: string | null) =>
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
      title: "Criado em",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => formatDate(date),
    },
    {
      title: "Atualizado em",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (date: string) => formatDate(date),
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: Monster) => {
        const rarity = getCardRarity(record);
        const effects = getRarityEffects(rarity);
        return (
          <Space>
            <Button
              type="text"
              className={`${effects.btnBg} ${effects.textColor} rounded`}
              onClick={() => openEditModal(record)}
            >
              Editar
            </Button>
            <Button
              type="text"
              className="bg-red-50 hover:bg-red-100 text-red-500 rounded"
              onClick={() => handleDelete(record)}
            >
              Excluir
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      {contextHolder}
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-4 px-4 sm:px-0">
          <Button
            type="primary"
            onClick={openCreateModal}
            className="hidden sm:flex"
          >
            Adicionar Monstro
          </Button>
        </div>

        {isMobile ? (
          <div className="space-y-4">
            {monsters.map((monster) => (
              <MonsterMobileCardEdit
                key={monster.id}
                monster={monster}
                onEdit={openEditModal}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <Table
            dataSource={monsters}
            columns={columns}
            loading={loading}
            rowKey="id"
            pagination={{
              pageSize: 10,
              position: ["bottomCenter"],
            }}
          />
        )}

        {!mobileOpen && (
          <button
            aria-label="Adicionar Monstro"
            onClick={openCreateModal}
            className="fixed bottom-4 right-4 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-blue-500 shadow-lg hover:bg-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 sm:hidden"
            style={{ border: "none" }}
          >
            <PlusOutlined className="text-white text-xl" />
          </button>
        )}

        <MonsterModal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          initialValues={editingMonster || initialForm}
          editingMonster={editingMonster}
          loading={loading}
        />

        <ConfirmationModal
          open={!!monsterToDelete}
          title="Excluir Monstro"
          description={`Tem certeza que deseja excluir o monstro "${monsterToDelete?.name}"?`}
          confirmText="Sim, excluir"
          cancelText="Não"
          onConfirm={confirmDelete}
          onCancel={() => setMonsterToDelete(null)}
          type="danger"
        />
      </div>
    </>
  );
};

export default Monsters;
