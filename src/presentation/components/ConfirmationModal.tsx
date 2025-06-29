import React from "react";
import { Modal, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

interface ConfirmationModalProps {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: "danger" | "info";
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
  type = "danger",
}) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={320}
      closable={false}
      centered
    >
      <div className="flex flex-col items-center text-center py-4">
        <ExclamationCircleOutlined
          className={`text-4xl ${
            type === "danger" ? "text-red-500" : "text-blue-500"
          } mb-4`}
        />
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>

        <div className="flex gap-3 w-full">
          <Button onClick={onCancel} className="flex-1">
            {cancelText}
          </Button>
          <Button
            type={type === "danger" ? "primary" : "default"}
            danger={type === "danger"}
            onClick={onConfirm}
            className="flex-1"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
