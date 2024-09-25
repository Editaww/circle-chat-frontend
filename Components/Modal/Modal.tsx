import React from "react";
import styles from "./styles.module.css";

type ModalProps = {
  title: string;
  subtitle: string;
  onConfirm: () => void;
  onModalClose: () => void;
};

const Modal = ({ title, subtitle, onConfirm, onModalClose }: ModalProps) => {
  return (
    <div className={styles.modal}>
      <h2>{title}</h2>
      <h3>{subtitle}</h3>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onModalClose}>No</button>
    </div>
  );
};

export default Modal;
