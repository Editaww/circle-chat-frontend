import React, { useEffect, useState } from "react";
import { questionsApi } from "../apiCalls/question";
import QuestionsWrapper from "../Components/QuestionWrapper/QuestionWrapper";
import { Question } from "@/types/question";
import PageTemplate from "@/Components/PageTemplate/PageTemplate";

const Home = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  const fetchQuestions = async () => {
    try {
      const response = await questionsApi();
      setQuestions(response.questions);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <>
      <PageTemplate>
        <QuestionsWrapper questions={questions} />
      </PageTemplate>
    </>
  );
};

export default Home;
