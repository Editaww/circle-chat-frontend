import axios from "axios";

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
