import axios from 'axios';
import { RegisterRequestData } from '../models/AuthModels';
import { URL_LINK } from '../utils/utils';

const registerUser = async (user : RegisterRequestData) => axios({
  method: 'POST',
  url: `${URL_LINK}/user`,
  data: user,
});

export const AuthService = { registerUser };
