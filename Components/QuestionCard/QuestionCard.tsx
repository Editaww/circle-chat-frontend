import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";

type QuestionCardProps = {
  id: string;
  userName: string;
  questionText: string;
};

const QuestionCard = ({ id, userName, questionText }: QuestionCardProps) => {
  return (
    <Link href={`/itemPage/${id}`}>
      <div className={styles.main}>
        <div className={styles.questionInfo}>
          <p>Name:</p>
          <h4>{userName}</h4>
        </div>
        <div className={styles.questionLine}>
          <p>{questionText}</p>
        </div>
      </div>
    </Link>
  );
};

export default QuestionCard;
