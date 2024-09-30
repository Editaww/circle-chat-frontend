import React from "react";
import styles from "./styles.module.css";
import QuestionCard from "../QuestionCard/QuestionCard";
import { Question } from "@/types/question";

type QuestionWrapperProps = {
  questions: Question[];
};

const QuestionWrapper = ({ questions }: QuestionWrapperProps) => {
  return (
    <div className={styles.main}>
      {questions
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((q) => {
          return (
            <QuestionCard
              key={q.id}
              id={q.id}
              userName={q.userName}
              questionText={q.questionText}
              date={q.date}
            />
          );
        })}
    </div>
  );
};

export default QuestionWrapper;
