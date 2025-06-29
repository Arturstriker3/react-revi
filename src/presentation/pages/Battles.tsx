import React, { useState, useEffect } from "react";
import { Button, Modal, message } from "antd";
import { useMonsterStore } from "../stores/monsterStore";
import { Monster } from "../../domain/entities/Monster";
import MonsterCard from "../components/MonsterCard";
import BattleCardVs from "../components/BattleCardVs";
import { CheckCircleFilled } from "@ant-design/icons";

const Battles: React.FC = () => {
  const { monsters, error, fetchMonsters } = useMonsterStore();
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
      {/* Botão de batalha */}
      <div className="flex justify-center mb-6">
        <Button
          type="primary"
          onClick={handleBattleClick}
          disabled={selectedMonsters.length !== 2}
          className="bg-gradient-to-r from-yellow-600 to-red-600 border-none hover:from-yellow-700 hover:to-red-700 h-12 px-8 text-base sm:text-lg"
        >
          {selectedMonsters.length === 2
            ? "Iniciar Batalha"
            : `Selecione ${2 - selectedMonsters.length} monstro${
                selectedMonsters.length === 1 ? "" : "s"
              }`}
        </Button>
      </div>

      {/* Grid de cartas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8 max-w-7xl mx-auto">
        {monsters.map((monster) => {
          const isSelected = selectedMonsters.find((m) => m.id === monster.id);
          return (
            <div key={monster.id} className="flex justify-center">
              <div
                className="w-[220px] sm:w-[280px] relative cursor-pointer"
                onClick={() => handleMonsterClick(monster)}
              >
                <MonsterCard monster={monster} />
                {isSelected && (
                  <div
                    className="absolute top-0 left-0 right-0 bottom-0 rounded-lg border-[4px] sm:border-[6px] border-green-500 pointer-events-none"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  >
                    <div className="absolute -top-3 -right-3 sm:-top-5 sm:-right-5 z-10">
                      <div className="bg-green-500 rounded-full p-1 sm:p-2 shadow-lg">
                        <CheckCircleFilled className="text-white text-xl sm:text-3xl" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        title={
          <div className="text-lg font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Batalha de Monstros
          </div>
        }
        open={isBattleModalOpen}
        onCancel={handleCloseBattleModal}
        footer={[
          <Button
            key="close"
            onClick={handleCloseBattleModal}
            className="bg-gradient-to-r from-gray-700 to-gray-900 text-white border-none hover:from-gray-800 hover:to-gray-950"
          >
            Fechar
          </Button>,
        ]}
        width={800}
        centered
        className="battle-modal"
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
