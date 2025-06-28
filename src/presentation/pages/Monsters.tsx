import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const Monsters: React.FC = () => {
  return (
    <div>
      <Title level={2}>Monstros</Title>
      <Paragraph>Gerencie seus monstros aqui.</Paragraph>
    </div>
  );
};

export default Monsters;
