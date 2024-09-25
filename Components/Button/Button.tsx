import React from "react";
import styles from "./styles.module.css";
import Spinner from "../Spinner/Spinner";

type ButtonProps = {
  onClick: () => void;
  title: string;
  isLoading: boolean;
};
const Button = ({ onClick, title, isLoading }: ButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {isLoading ? <Spinner /> : <> {title}</>}
    </button>
  );
};

export default Button;
