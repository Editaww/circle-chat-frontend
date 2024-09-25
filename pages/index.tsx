import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionsWrapper from "../Components/QuestionWrapper/QuestionWrapper";
import { Question } from "@/types/question";

import PageTemplate from "@/Components/PageTemplate/PageTemplate";

const Home = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${process.env.SERVER_URL}/questions`);
      console.log(response.data);
      setQuestions(response.data.questions);
      console.log(response.data.questions);
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
