import React from "react";
import styles from "./styles.module.css";
import Spinner from "../Spinner/Spinner";

type ButtonProps = {
  onClick: () => void;
  title: string;
  isLoading: boolean;
  style?: React.CSSProperties;
};
const Button = ({ onClick, title, isLoading, style }: ButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick} style={style}>
      {isLoading ? <Spinner /> : <> {title}</>}
    </button>
  );
};

export default Button;
