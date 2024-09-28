import axios from "axios";
import cookie from "js-cookie";

export const questionsApi = async () => {
  const response = await axios.get(`${process.env.SERVER_URL}/questions`);
  return response.data;
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
    {
      headers,
    }
  );

  return response;
};
