import React, { useState } from "react";
import styles from "./styles.module.css";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { format } from "date-fns";

import {
  likeAnswerApi,
  disLikeAnswerApi,
  deleteAnswerApi,
} from "../../apiCalls/answer";

type AnswerProps = {
  id: string;
  userName: string;
  userId: string;
  answerText: string;
  date: Date;
  gainedLikeNumber: number;
  gainedDisLikeNumber: number;
  questionId: string;
  onDelete: (answerId: string) => void;
};

const AnswerItem = ({
  id,
  userName,
  answerText,
  date,
  gainedLikeNumber,
  gainedDisLikeNumber,
  questionId,
  onDelete,
}: AnswerProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [answerToDelete, setAnswerToDelete] = useState<string | null>(null);
  const [likes, setLikes] = useState(gainedLikeNumber);
  const [disLikes, setDisLikes] = useState(gainedDisLikeNumber || 0);
  const [isShowError, setShowError] = useState(false);

  const likeAnswer = async () => {
    try {
      const response = await likeAnswerApi(questionId, id);
      if (response) setLikes((prev) => prev + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const disLikeAnswer = async () => {
    try {
      const response = await disLikeAnswerApi(questionId, id);
      if (response) setDisLikes((prev) => prev + 1);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteAnswer = async (answerId: string) => {
    const response = await deleteAnswerApi(answerId);
    if (response === true) {
      onDelete(answerId);
      setShowError(false);
    } else {
      console.log(response);
      setShowError(true);
    }
  };

  const confirmDelete = () => {
    setModalOpen(true);
    setAnswerToDelete(id);
  };

  const deleteConfirmation = () => {
    if (answerToDelete) {
      deleteAnswer(answerToDelete);
      setModalOpen(false);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.likesDislikes}>
        <p>{likes} </p>
        <FaThumbsUp onClick={likeAnswer} />
        <p>{disLikes}</p>
        <FaThumbsDown onClick={disLikeAnswer} />
      </div>

      <div className={styles.itemInfo}>
        <div className={styles.itemName}>
          <p>Name:</p>
          <h4>{userName}</h4>
        </div>
        <div className={styles.itemLine}>
          <p>{answerText}</p>
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
          title="Delete Answer"
          onClick={confirmDelete}
          isLoading={false}
        />
      </div>

      {isModalOpen && (
        <Modal
          title={"Are you sure you want to delete this Answer?"}
          onConfirm={deleteConfirmation}
          onModalClose={() => setModalOpen(false)}
          style={{ marginLeft: "2rem", width: "80px" }}
        />
      )}
    </div>
  );
};

export default AnswerItem;
