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
    <Link href={`/questionItem/${id}`}>
      <div className={styles.main}>
        <div className={styles.questionLine}>
          <p>Name:</p>
          <h3>{userName}</h3>
        </div>
        <div className={styles.questionLine}>
          <h3>{questionText}</h3>
        </div>
      </div>
    </Link>
  );
};

export default QuestionCard;
