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
  try {
    const jwt = cookie.get(process.env.JWT_KEY as string);
    if (!jwt) {
      console.error("JWT token not found");
      return;
    }

    const headers = { authorization: jwt };

    const response = await axios.delete(
      `${process.env.SERVER_URL}/questions/${questionId}`,

      { headers }
    );
    return response.status === 200;
  } catch (err) {
    console.log(err);
  }
};
