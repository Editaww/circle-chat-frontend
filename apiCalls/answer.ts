import axios from "axios";
import cookie from "js-cookie";

export const answersApi = async (questionId: string) => {
  const jwt = cookie.get(process.env.JWT_KEY as string);
  if (!jwt) return;

  const headers = {
    authorization: jwt,
  };

  try {
    const response = await axios.get(
      `${process.env.SERVER_URL}/questions/${questionId}/answers`,
      { headers }
    );
    return response.data.answer;
  } catch (err) {
    console.log(err);
    return;
  }
};

export const addAnswerApi = async (
  questionId: string,
  userName: string,
  answerText: string
) => {
  const jwt = cookie.get(process.env.JWT_KEY as string);

  const body = {
    userName,
    answerText,
  };

  const headers = {
    authorization: jwt,
  };

  const response = await axios.post(
    `${process.env.SERVER_URL}/questions/${questionId}/answers`,
    body,
    { headers }
  );

  return response;
};

export const likeAnswerApi = async (questionId: string, answerId: string) => {
  try {
    const response = await axios.post(
      `${process.env.SERVER_URL}/questions/${questionId}/answers/like`,
      { answerId }
    );
    return response.status === 200;
  } catch (err) {
    console.log(err);
  }
};

export const disLikeAnswerApi = async (
  questionId: string,
  answerId: string
) => {
  try {
    const response = await axios.post(
      `${process.env.SERVER_URL}/questions/${questionId}/answers/dislike`,
      { answerId }
    );
    return response.status === 200;
  } catch (err) {
    console.log(err);
  }
};

export const deleteAnswerApi = async (answerId: string) => {
  try {
    const jwt = cookie.get(process.env.JWT_KEY as string);
    if (!jwt) {
      console.error("JWT token not found");
      return;
    }

    const headers = { authorization: jwt };
    const response = await axios.delete(
      `${process.env.SERVER_URL}/answers/${answerId}`,
      { headers }
    );

    return response.status === 200;
  } catch (err) {
    console.log(err);
  }
};
