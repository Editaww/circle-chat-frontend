import React, { useState } from "react";
import styles from "./styles.module.css";
import Button from "../Button/Button";
import { addAnswerApi } from "@/apiCalls/answer";

type AnswerFormProps = {
  userName: string;
  questionId: string;
  onAnswerAdded: () => void;
};

const AnswerForm = ({ questionId, onAnswerAdded }: AnswerFormProps) => {
  const [userName, setUserName] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [isShowError, setShowError] = useState(false);
  const [isAddAnswer, setAddAnswer] = useState(false);

  const addAnswer = async () => {
    if (!answerText) {
      setShowError(true);
      return;
    }

    try {
      setAddAnswer(true);
      const response = await addAnswerApi(questionId, userName, answerText);

      if (response.status === 201) {
        setUserName("");
        setAnswerText("");
        onAnswerAdded();
        setShowError(false);
      }
    } catch (err) {
      console.log(err);
      setShowError(true);
    } finally {
      setAddAnswer(false);
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.main}>
        <h1>Create Answer</h1>
        <input
          value={userName}
          placeholder="Name"
          className={styles.input}
          type="text"
          onChange={(e) => {
            setUserName(
              (e.target.value =
                e.target.value.charAt(0).toUpperCase() +
                e.target.value.slice(1))
            );
          }}
        />
        <textarea
          value={answerText}
          placeholder="Enter your answer"
          className={styles.textarea}
          onChange={(e) => {
            setAnswerText(e.target.value);
            if (e.target.value) {
              setShowError(false);
            }
          }}
        />
        {isShowError && (
          <h5 className={styles.error}>Answer field must be filled</h5>
        )}
        <Button
          isLoading={isAddAnswer}
          title="Add Answer"
          onClick={() => {
            addAnswer();
          }}
        />
      </div>
    </div>
  );
};

export default AnswerForm;
