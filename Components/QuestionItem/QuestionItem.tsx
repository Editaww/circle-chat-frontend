import React, { useState } from "react";
import styles from "./styles.module.css";
import Button from "../Button/Button";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";
import Modal from "../Modal/Modal";

type QuestionProps = {
  id: string;
  userName: string;
  questionText: string;
  date: Date;
  userId: string;
};

const QuestionItem = ({ id, userName, questionText }: QuestionProps) => {
  const router = useRouter();

  const jwt = cookie.get(process.env.JWT_KEY as string);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isShowError, setShowError] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null);

  const deleteQuestion = async (questionId: string) => {
    try {
      const headers = {
        authorization: jwt,
      };

      const response = await axios.delete(
        `${process.env.SERVER_URL}/questions/${questionId}`,
        {
          headers,
        }
      );

      if (response.status === 200) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
      setShowError(true);
      // router.push("/");
    }
  };

  const confirmDelete = () => {
    setModalOpen(true);
    setQuestionToDelete(id);
  };

  const deleteConfirmation = () => {
    if (questionToDelete) {
      deleteQuestion(questionToDelete);
      setModalOpen(false);
    }
  };

  return (
    <div className={styles.main}>
      {isShowError && (
        <h5 className={styles.error}>
          Yuo can only delete question what belongs to You
        </h5>
      )}
      <div className={styles.questionInfo}>
        <div className={styles.questionLine}>
          <p>Name:</p>
          <h3>{userName}</h3>
        </div>
        <div className={styles.itemLine}>
          <h3>{questionText}</h3>
        </div>

        <Button
          title="Delete Question"
          onClick={confirmDelete}
          isLoading={false}
        />
      </div>

      {isModalOpen && (
        <Modal
          title={"Delete Question?"}
          subtitle={"Are you sure you want to delete this Question?"}
          onConfirm={deleteConfirmation}
          onModalClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default QuestionItem;
