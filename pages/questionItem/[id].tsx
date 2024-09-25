import React, { useEffect, useState } from "react";
import axios from "axios";
import { Question } from "@/types/question";
import { Answer } from "../../types/answer";
import { useRouter } from "next/router";
import QuestionItem from "../../Components/QuestionItem/QuestionItem";
import PageTemplate from "@/Components/PageTemplate/PageTemplate";
import cookie from "js-cookie";
import AnswerForm from "../../Components/AnswerForm/AnswerForm";

const ItemPage = () => {
  const [isQuestion, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const router = useRouter();

  const fetchQuestions = async () => {
    const jwt = cookie.get(process.env.JWT_KEY as string);
    if (!jwt) {
      router.push("/login");
      return;
    }

    const headers = {
      authorization: jwt,
    };

    try {
      const fetchedQuestions = await axios.get(
        `${process.env.SERVER_URL}/questions/${router.query.id}`,
        { headers }
      );
      setQuestion(fetchedQuestions.data.question);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAnswers = async () => {
    const jwt = cookie.get(process.env.JWT_KEY as string);
    if (!jwt) return;

    const headers = {
      authorization: jwt,
    };

    try {
      const fetchedAnswers = await axios.get(
        `${process.env.SERVER_URL}/questions/${router.query.id}/answers`,
        { headers }
      );
      setAnswers(fetchedAnswers.data.answer);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      fetchQuestions();
      fetchAnswers();
    }
  }, [router.query.id]);

  const addAnswer = async () => {
    await fetchAnswers();
  };

  return (
    <PageTemplate>
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
            <AnswerForm
              userName={isQuestion.userName}
              questionId={isQuestion.id}
              onAnswerAdded={addAnswer}
            />
          </div>
        )}
        <div>
          <h3>Answers:</h3>
          {answers.length > 0 &&
            answers.map((answer) => (
              <div key={answer.id}>
                <p>
                  {answer.userName}: {answer.answerText}
                </p>
              </div>
            ))}
        </div>
      </div>
    </PageTemplate>
  );
};

export default ItemPage;
