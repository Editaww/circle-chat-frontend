import React from "react";
import styles from "./styles.module.css";

type HeaderProps = {
  logo: string;
  title: string;
};

const Header = ({ logo, title }: HeaderProps) => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>{logo}</div>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
};

export default Header;
