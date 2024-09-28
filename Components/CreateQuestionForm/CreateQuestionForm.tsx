import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import Button from "../Button/Button";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";

const CreateQuestionForm = () => {
  const [userName, setUserName] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [isShowError, setShowError] = useState(false);

  const router = useRouter();

  const jwt = cookie.get(process.env.JWT_KEY as string);

  useEffect(() => {
    if (!jwt) {
      router.push("/login");
    }
  }, []);

  const addQuestion = async () => {
    if (!userName || !questionText) {
      setShowError(true);
      return;
    }
    try {
      const body = {
        userName: userName,
        questionText: questionText,
      };

      const headers = {
        authorization: jwt,
      };

      const response = await axios.post(
        `${process.env.SERVER_URL}/questions`,
        body,
        {
          headers,
        }
      );

      if (response.status === 201) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
      setShowError(true);
    }
  };

  return (
    <div className={styles.main}>
      <input
        value={userName}
        placeholder="Name"
        type="text"
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <input
        value={questionText}
        placeholder="Question Text"
        className={styles.textarea}
        onChange={(e) => {
          setQuestionText(e.target.value);
        }}
      />

      {isShowError && (
        <h5 className={styles.error}>All fields must be entered</h5>
      )}

      <Button
        isLoading={false}
        title="Add Question"
        onClick={() => {
          addQuestion();
        }}
      />
    </div>
  );
};

export default CreateQuestionForm;
