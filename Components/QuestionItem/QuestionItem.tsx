import React, { useState } from "react";
import styles from "./styles.module.css";
import { deleteQuestionApi } from "@/apiCalls/question";
import Button from "../Button/Button";
import { format } from "date-fns";
import Modal from "../Modal/Modal";

type QuestionProps = {
  id: string;
  userName: string;
  questionText: string;
  date: Date;
  userId: string;
};

const QuestionItem = ({ id, userName, questionText, date }: QuestionProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isShowError, setShowError] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null);

  const deleteQuestion = async (questionId: string) => {
    const response = await deleteQuestionApi(questionId);
    if (response === true) {
      setShowError(false);
    } else {
      console.log(response);
      setShowError(true);
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
    <div className={styles.background}>
      <div className={styles.main}>
        <div className={styles.itemInfo}>
          <div className={styles.itemName}>
            <p>Name:</p>
            <h4>{userName}</h4>
          </div>
          <div className={styles.itemLine}>
            <p>{questionText}</p>
            <p className={styles.dateText}>
              {format(new Date(date), "yyyy.MM.dd")}
            </p>
          </div>
          {isShowError && (
            <h5 className={styles.error}>
              Yuo can only delete question what belongs to You
            </h5>
          )}
          <Button
            title="Delete Question"
            onClick={confirmDelete}
            isLoading={false}
          />
        </div>

        {isModalOpen && (
          <Modal
            title={"Are you sure you want to delete this Question?"}
            onConfirm={deleteConfirmation}
            onModalClose={() => setModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default QuestionItem;
