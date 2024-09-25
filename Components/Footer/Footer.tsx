import React from "react";
import styles from "./styles.module.css";

type FooterProps = {
  copyrightTitle: string;
};

const Footer = ({ copyrightTitle }: FooterProps) => {
  return <div className={styles.footer}>{copyrightTitle}</div>;
};

export default Footer;
