import React, { ReactNode } from "react";
import styles from "./styles.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
// import { validateUser as validateUserApi } from "../../apiCalls/user";
// import { useRouter } from "next/router";

type PageTemplateProps = {
  children: ReactNode;
};

const PageTemplate = ({ children }: PageTemplateProps) => {
  // const [isUserLoggedIn, setUserLoggedIn] = useState(false);

  // const router = useRouter();

  // const validateUser = async () => {
  //   try {
  //     const response = await validateUserApi();

  //     if (response.status !== 200) {
  //       router.push("/login");
  //     }
  //     setUserLoggedIn(true);
  //   } catch (err) {
  //     console.error("User validation error:", err);
  //     router.push("/login");
  //   }
  // };

  // useEffect(() => {
  //   validateUser();
  // }, []);

  return (
    <div className={styles.wrapper}>
      <Header logo={"Circle Chat"} />
      <div className={styles.main}>{children}</div>
      <Footer copyrightTitle="© 2024 Circle Chat. All rights reserved." />
    </div>
  );
};

export default PageTemplate;
