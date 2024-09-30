import axios from "axios";
import cookie from "js-cookie";

export const questionsApi = async () => {
  const response = await axios.get(`${process.env.SERVER_URL}/questions`);
  return response.data;
};

export const questionByIdApi = async (questionId: string) => {
  const jwt = cookie.get(process.env.JWT_KEY as string);
  if (!jwt) {
    return;
  }

  const headers = {
    authorization: jwt,
  };

  try {
    const response = await axios.get(
      `${process.env.SERVER_URL}/questions/${questionId}`,
      { headers }
    );
    return response.data.question;
  } catch (err) {
    console.log(err);
    return;
  }
};

export const addQuestionApi = async (
  userName: string,
  questionText: string
) => {
  const jwt = cookie.get(process.env.JWT_KEY as string);

  const body = {
    userName: userName,
    questionText: questionText,
  };

  const headers = {
    authorization: jwt,
  };

  const response = await axios.post(
    `${process.env.SERVER_URL}/questions`,
    body,

    { headers }
  );

  return response;
};

export const deleteQuestionApi = async (questionId: string) => {
  const jwt = cookie.get(process.env.JWT_KEY as string);
  if (!jwt) return;
  const headers = {
    authorization: jwt,
  };

  try {
    const response = await axios.delete(
      `${process.env.SERVER_URL}/questions/${questionId}`,

      { headers }
    );
    return response;
  } catch (err) {
    //     console.log(err);
    //   }
    // };
    if (err.response) {
      // Jei serveris grąžino atsakymą su klaida
      console.log("Error message:", err.response.data.message);
      alert(err.response.data.message); // Galite rodyti pranešimą vartotojui
    } else {
      console.error("Error message:", err.message);
    }
  }
};
