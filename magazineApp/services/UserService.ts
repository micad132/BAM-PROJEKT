import axios from 'axios';

const getAllUsers = async () => {
  const res = await axios.get(`${URL}/user`);
  return res.data;
};

const getLoggedUser = async () => {
  const res = await axios.get(`${URL}/user/logged`);
  return res.data;
};

export const UserService = { getAllUsers, getLoggedUser };
