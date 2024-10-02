import React from "react";
import styles from "./styles.module.css";

type ModalProps = {
  title: string;
  style?: React.CSSProperties;
  onConfirm: () => void;
  onModalClose: () => void;
};

const Modal = ({ title, style, onConfirm, onModalClose }: ModalProps) => {
  return (
    <div className={styles.modal}>
      <h3>{title}</h3>
      <div className={styles.button}>
        <button className={styles.button} onClick={onConfirm} style={style}>
          Yes
        </button>
        <button className={styles.button} onClick={onModalClose} style={style}>
          No
        </button>
      </div>
    </div>
  );
};

export default Modal;
