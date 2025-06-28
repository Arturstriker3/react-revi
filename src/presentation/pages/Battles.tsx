import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const Battles: React.FC = () => {
  return (
    <div>
      <Title level={2}>Batalhas</Title>
      <Paragraph>Gerencie e inicie batalhas aqui.</Paragraph>
    </div>
  );
};

export default Battles;
