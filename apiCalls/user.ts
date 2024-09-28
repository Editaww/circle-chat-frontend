import axios from "axios";

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

type RegisterProps = {
  userName: string;
  email: string;
  password: string;
};

export const register = async ({
  userName,
  email,
  password,
}: RegisterProps) => {
  const body = {
    userName: userName,
    email: email,
    password: password,
  };

  const response = await axios.post(`${process.env.SERVER_URL}/register`, body);
  return response;
};
