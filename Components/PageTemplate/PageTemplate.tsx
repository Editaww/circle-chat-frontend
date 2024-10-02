import React, { ReactNode } from "react";
import styles from "./styles.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Headers from "../Headers/Headers";

type PageTemplateProps = {
  children: ReactNode;
};

const PageTemplate = ({ children }: PageTemplateProps) => {
  return (
    <div className={styles.wrapper}>
      <Header logo={"Travel Spot"} title={"Talk Openly, Share Freely"} />
      <Headers />
      <div className={styles.main}>{children}</div>
      <Footer copyrightTitle="© 2024 Travel Spot. All rights reserved." />
    </div>
  );
};

export default PageTemplate;
