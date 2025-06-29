import React, { useState, useEffect } from "react";
import { Button, Modal, message } from "antd";
import { useMonsterStore } from "../stores/monsterStore";
import { Monster } from "../../domain/entities/Monster";
import MonsterCard from "../components/MonsterCard";
import BattleCardVs from "../components/BattleCardVs";
import { CheckCircleFilled } from "@ant-design/icons";

const Battles: React.FC = () => {
  const { monsters, loading, error, fetchMonsters } = useMonsterStore();
  const [selectedMonsters, setSelectedMonsters] = useState<Monster[]>([]);
  const [isBattleModalOpen, setIsBattleModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    fetchMonsters();
  }, [fetchMonsters]);

  useEffect(() => {
    if (error) messageApi.error(error);
  }, [error, messageApi]);

  const handleMonsterClick = (monster: Monster) => {
    if (selectedMonsters.find((m) => m.id === monster.id)) {
      setSelectedMonsters(selectedMonsters.filter((m) => m.id !== monster.id));
    } else if (selectedMonsters.length < 2) {
      setSelectedMonsters([...selectedMonsters, monster]);
    } else {
      messageApi.warning("Você só pode selecionar 2 monstros para batalhar!");
    }
  };

  const handleBattleClick = () => {
    if (selectedMonsters.length === 2) {
      setIsBattleModalOpen(true);
    } else {
      messageApi.warning("Selecione 2 monstros para iniciar a batalha!");
    }
  };

  const handleCloseBattleModal = () => {
    setIsBattleModalOpen(false);
    setSelectedMonsters([]);
  };

  return (
    <div className="p-4">
      {contextHolder}
      <div className="flex flex-col items-center mb-8">
        <Button
          type="primary"
          onClick={handleBattleClick}
          disabled={selectedMonsters.length !== 2}
          className="bg-gradient-to-r from-yellow-600 to-red-600 border-none hover:from-yellow-700 hover:to-red-700 h-12 px-8 text-lg flex items-center justify-center gap-2"
        >
          {selectedMonsters.length === 2
            ? "Iniciar Batalha"
            : `Selecione ${2 - selectedMonsters.length} monstro${
                selectedMonsters.length === 1 ? "" : "s"
              }`}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {monsters.map((monster) => {
          const isSelected = selectedMonsters.find((m) => m.id === monster.id);
          return (
            <div
              key={monster.id}
              className="relative cursor-pointer group"
              onClick={() => handleMonsterClick(monster)}
            >
              <div
                className={`
                  transform transition-all duration-200 ease-in-out
                  ${isSelected ? "scale-[0.98]" : "hover:scale-105"}
                  ${
                    isSelected
                      ? "ring-2 ring-green-500 ring-offset-2 rounded-lg"
                      : ""
                  }
                `}
              >
                <div className="relative">
                  <MonsterCard monster={monster} />
                  {isSelected && (
                    <div className="absolute -top-3 -right-3 z-10">
                      <div className="bg-green-500 rounded-full p-1 shadow-lg">
                        <CheckCircleFilled className="text-white text-xl" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        title="Batalha de Monstros"
        open={isBattleModalOpen}
        onCancel={handleCloseBattleModal}
        footer={[
          <Button key="close" onClick={handleCloseBattleModal}>
            Fechar
          </Button>,
        ]}
        width={800}
        centered
      >
        {selectedMonsters.length === 2 && (
          <BattleCardVs
            card1={selectedMonsters[0]}
            card2={selectedMonsters[1]}
          />
        )}
      </Modal>
    </div>
  );
};

export default Battles;
