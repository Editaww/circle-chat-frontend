import React, { useState } from "react";
import styles from "./styles.module.css";
import { register } from "../../apiCalls/user";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import Button from "../Button/Button";

const RegisterForm = () => {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasswor] = useState("");
  const [isButtonLoading, setButtonLoading] = useState(false);
  const [isShowError, setShowError] = useState(false);

  const registerUser = async () => {
    if (!userName || !email || !password) {
      setShowError(true);
      return;
    }
    try {
      setButtonLoading(true);

      const response = await register({ userName, email, password });

      if (response.status === 201) {
        cookie.set(process.env.JWT_KEY as string, response.data.token);
        cookie.set("user_id", response.data.userId);
        router.push("/login");
      }
      console.log(response);
    } catch (err) {
      console.log("err", err);
      setButtonLoading(false);
    }
  };

  return (
    <div className={styles.main}>
      <input
        onChange={(e) => {
          setUserName(e.target.value);
        }}
        value={userName}
        placeholder="Name"
        type="text"
      ></input>
      <input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
        placeholder="Email"
        type="text"
      ></input>
      <input
        onChange={(e) => {
          setPasswor(e.target.value);
        }}
        value={password}
        placeholder="Password"
        type="password"
      ></input>

      <Button
        onClick={registerUser}
        title="Register"
        isLoading={isButtonLoading}
      />
      {isShowError && (
        <h5 className={styles.error}>All fields must be entered</h5>
      )}
    </div>
  );
};

export default RegisterForm;
