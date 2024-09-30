import React, { useEffect, useState } from "react";
import { Question } from "@/types/question";
import { Answer } from "../../types/answer";
import { useRouter } from "next/router";
import { questionByIdApi } from "../../apiCalls/question";
import { answersApi } from "../../apiCalls/answer";
import QuestionItem from "../../Components/QuestionItem/QuestionItem";
import PageTemplate from "@/Components/PageTemplate/PageTemplate";
import AnswerForm from "../../Components/AnswerForm/AnswerForm";
import AnswerItem from "../../Components/AnswerItem/AnswerItem";
import Button from "../../Components/Button/Button";
import styles from "../../Components/AnswerItem/styles.module.css";
import { FaComment } from "react-icons/fa";

const ItemPage = () => {
  const [isQuestion, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const router = useRouter();

  const fetchQuestionsById = async () => {
    const response = await questionByIdApi(router.query.id as string);
    if (response) {
      setQuestion(response);
    } else {
      router.push("/login");
    }
  };

  const fetchAnswers = async () => {
    const response = await answersApi(router.query.id as string);

    if (response) {
      setAnswers(response);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      fetchQuestionsById();
      fetchAnswers();
    }
  }, [router.query.id]);

  const onDeleteAnswer = (answerId: string) => {
    setAnswers((prevAnswers) =>
      prevAnswers.filter((answer) => answer.id !== answerId)
    );
  };

  const addAnswer = async () => {
    await fetchAnswers();
    setShowAnswerForm(false);
  };

  return (
    <PageTemplate>
      <div className={styles.background}>
        <div>
          {isQuestion && (
            <div>
              <QuestionItem
                id={isQuestion.id}
                userName={isQuestion.userName}
                questionText={isQuestion.questionText}
                date={isQuestion.date}
                userId={isQuestion.userId}
              />
              {!showAnswerForm && (
                <Button
                  title="You Answer"
                  onClick={() => setShowAnswerForm(true)}
                  isLoading={false}
                  style={{ marginLeft: "2rem", width: "150px" }}
                />
              )}
              {showAnswerForm && (
                <AnswerForm
                  userName={isQuestion.userName}
                  questionId={isQuestion.id}
                  onAnswerAdded={addAnswer}
                />
              )}

              <div>
                <div className={styles.answer}>
                  <h1>Answers:</h1>
                  <FaComment style={{ fontSize: "40px", color: "black" }} />
                </div>
                {answers.length > 0 &&
                  answers
                    .sort(
                      (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    )
                    .map((answer) => (
                      <AnswerItem
                        key={answer.id}
                        id={answer.id}
                        userName={answer.userName}
                        userId={answer.userId}
                        answerText={answer.answerText}
                        gainedLikeNumber={answer.gainedLikeNumber}
                        gainedDisLikeNumber={answer.gainedDisLikeNumber}
                        date={answer.date}
                        questionId={isQuestion.id}
                        onDelete={onDeleteAnswer}
                      />
                    ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTemplate>
  );
};

export default ItemPage;
