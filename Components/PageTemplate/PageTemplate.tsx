import React, { ReactNode } from "react";
import styles from "./styles.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

type PageTemplateProps = {
  children: ReactNode;
};

const PageTemplate = ({ children }: PageTemplateProps) => {
  return (
    <div className={styles.wrapper}>
      <Header logo={"Circle Chat"} />
      <div className={styles.main}>{children}</div>
      <Footer copyrightTitle="© 2024 Circle Chat. All rights reserved." />
    </div>
  );
};

export default PageTemplate;
