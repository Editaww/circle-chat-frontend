import React, { useState } from "react";
import styles from "./styles.module.css";
import Button from "../Button/Button";
import cookie from "js-cookie";
// import { useRouter } from "next/router";
import axios from "axios";
import Modal from "../Modal/Modal";

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
  // currentUserId?: string;
};

const AnswerItem = ({
  id,
  userName,
  // userId,
  answerText,
  gainedLikeNumber,
  gainedDisLikeNumber,
  questionId,
  onDelete,
}: // currentUserId,
AnswerProps) => {
  //   const router = useRouter();

  const jwt = cookie.get(process.env.JWT_KEY as string);

  const [isModalOpen, setModalOpen] = useState(false);
  const [answerToDelete, setAnswerToDelete] = useState<string | null>(null);
  const [likes, setLikes] = useState(gainedLikeNumber);
  const [disLikes, setDisLikes] = useState(gainedDisLikeNumber || 0);
  const [isShowError, setShowError] = useState(false);

  const likeAnswer = async () => {
    try {
      // const headers = {
      //   authorization: jwt,
      // };
      const response = await axios.post(
        `${process.env.SERVER_URL}/questions/${questionId}/answers/like`,
        { answerId: id }
        // { headers }
      );

      if (response.status === 200) {
        setLikes((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const disLikeAnswer = async () => {
    try {
      // const headers = {
      //   authorization: jwt,
      // };
      const response = await axios.post(
        `${process.env.SERVER_URL}/questions/${questionId}/answers/dislike`,
        { answerId: id }
        // { headers }
      );

      if (response.status === 200) {
        setDisLikes((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAnswer = async (answerId: string) => {
    try {
      const headers = {
        authorization: jwt,
      };

      const response = await axios.delete(
        `${process.env.SERVER_URL}/answers/${answerId}`,
        {
          headers,
        }
      );
      console.log("Response from delete:", response);
      if (response.status === 200) {
        onDelete(answerId);
      }
    } catch (err) {
      console.log(err);
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
      {isShowError && (
        <h5 className={styles.error}>
          Yuo can only delete question what belongs to You
        </h5>
      )}
      <div className={styles.answerInfo}>
        <div className={styles.answerLine}>
          <p>Name:</p>
          <h3>{userName}</h3>
        </div>
        <div className={styles.itemLine}>
          <h3>{answerText}</h3>
        </div>
        <div className={styles.likesDislikes}>
          <h3>{likes} </h3>
          <Button title="Like" onClick={likeAnswer} isLoading={false} />
          <h3>{disLikes} </h3>
          <Button title="Dislike" onClick={disLikeAnswer} isLoading={false} />
        </div>

        <Button
          title="Delete Answer"
          onClick={confirmDelete}
          isLoading={false}
        />
      </div>

      {isModalOpen && (
        <Modal
          title={"Delete Answer?"}
          subtitle={"Are you sure you want to delete this Answer?"}
          onConfirm={deleteConfirmation}
          onModalClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AnswerItem;
