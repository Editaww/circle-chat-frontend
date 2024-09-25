import axios from "axios";
import cookie from "js-cookie";

type LoginProps = {
  name: string;
  email: string;
  password: string;
};

export const login = async ({ name, email, password }: LoginProps) => {
  const body = {
    name: name,
    email: email,
    password: password,
  };
  const response = await axios.post(`${process.env.SERVER_URL}/login`, body);
  return response;
};

export const validateUser = async () => {
  const jwt = cookie.get(process.env.JWT_KEY as string);

  const headers = {
    authorization: jwt,
  };

  const response = await axios.get(`${process.env.SERVER_URL}/login/validate`, {
    headers,
  });
  return response;
};
