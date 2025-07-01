import React from "react";
import { Modal, Form, Input, InputNumber, Button } from "antd";
import { MonsterDTO } from "../../application/dtos/MonsterDTO";
import { MONSTER_STAT_LIMITS } from "../../domain/entities/Monster";

interface MonsterModalProps {
  open: boolean;
  onOk: (values: any) => void;
  onCancel: () => void;
  initialValues: Partial<MonsterDTO>;
  editingMonster: MonsterDTO | null;
  loading?: boolean;
}

const MonsterModal: React.FC<MonsterModalProps> = ({
  open,
  onOk,
  onCancel,
  initialValues,
  editingMonster,
  loading,
}) => {
  const [form] = Form.useForm();
  const isMobileScreen =
    typeof window !== "undefined" ? window.innerWidth < 640 : false;

  React.useEffect(() => {
    if (open) {
      form.setFieldsValue(initialValues);
    }
  }, [open, initialValues, form]);

  const onlyAllowNumbers = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/\d/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onOk(values);
      form.resetFields();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={editingMonster ? "Editar Monstro" : "Adicionar Monstro"}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={editingMonster ? "Atualizar" : "Criar"}
      destroyOnHidden
      width={isMobileScreen ? "100vw" : 520}
      style={
        isMobileScreen
          ? {
              top: 0,
              left: 0,
              margin: 0,
              padding: 0,
              height: "100vh",
              maxWidth: "100vw",
            }
          : {}
      }
      styles={
        isMobileScreen
          ? {
              body: {
                height: "calc(100vh - 55px)",
                overflow: "auto",
                padding: 16,
              },
            }
          : {}
      }
      mask={!isMobileScreen}
      footer={
        <div
          style={{ display: "flex", justifyContent: "space-between", gap: 8 }}
        >
          <Button
            onClick={handleCancel}
            style={{ flex: 1, maxWidth: isMobileScreen ? "48%" : undefined }}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            type="primary"
            onClick={handleOk}
            loading={loading}
            style={{ flex: 1, maxWidth: isMobileScreen ? "48%" : undefined }}
          >
            {editingMonster ? "Atualizar" : "Criar"}
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Nome"
          rules={[{ required: true, message: "Digite o nome" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="attack"
          label="Ataque"
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
              max: MONSTER_STAT_LIMITS.MAX_ATTACK,
              message: `O ataque deve estar entre 0 e ${MONSTER_STAT_LIMITS.MAX_ATTACK}`,
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            controls={false}
            stringMode={false}
            onKeyPress={onlyAllowNumbers}
            min={0}
            max={MONSTER_STAT_LIMITS.MAX_ATTACK}
          />
        </Form.Item>
        <Form.Item
          name="defense"
          label="Defesa"
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
              max: MONSTER_STAT_LIMITS.MAX_DEFENSE,
              message: `A defesa deve estar entre 0 e ${MONSTER_STAT_LIMITS.MAX_DEFENSE}`,
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            controls={false}
            stringMode={false}
            onKeyPress={onlyAllowNumbers}
            min={0}
            max={MONSTER_STAT_LIMITS.MAX_DEFENSE}
          />
        </Form.Item>
        <Form.Item
          name="speed"
          label="Velocidade"
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
              max: MONSTER_STAT_LIMITS.MAX_SPEED,
              message: `A velocidade deve estar entre 0 e ${MONSTER_STAT_LIMITS.MAX_SPEED}`,
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            controls={false}
            stringMode={false}
            onKeyPress={onlyAllowNumbers}
            min={0}
            max={MONSTER_STAT_LIMITS.MAX_SPEED}
          />
        </Form.Item>
        <Form.Item
          name="hp"
          label="HP"
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
              max: MONSTER_STAT_LIMITS.MAX_HP,
              message: `O HP deve estar entre 0 e ${MONSTER_STAT_LIMITS.MAX_HP}`,
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            controls={false}
            stringMode={false}
            onKeyPress={onlyAllowNumbers}
            min={0}
            max={MONSTER_STAT_LIMITS.MAX_HP}
          />
        </Form.Item>
        <Form.Item name="image_url" label="URL da Imagem">
          <Input
            readOnly
            disabled
            style={{ background: "#f5f5f5", color: "#888" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MonsterModal;
