import { USER_DATA } from '../../types/types';
import custom_axios from '../../axios/AxiosSetup';

const login = async (userData: USER_DATA) => {
  const response = await custom_axios.post('/auth/login', userData);
  if (response.data?.token) {
    localStorage.setItem('token', JSON.stringify(response.data.token));
  }
  return response.data;
}

const userService = {
  login,
}

export default userService;