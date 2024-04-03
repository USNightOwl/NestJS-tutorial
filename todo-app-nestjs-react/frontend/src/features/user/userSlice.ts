import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService';
import { USER_DATA } from '../../types/types';
import { toast } from 'react-toastify';

export const loginUser = createAsyncThunk('auth/login', async (user: USER_DATA, thunkAPI) => {
  try {
    return await userService.login(user);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})

interface InitialStateUser {
  user: null;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean,
  message: string;
}

const initialState: InitialStateUser = {
  user: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ""
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.user = action.payload;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action?.error?.message || "";
      if (state.isError === true) {
          toast.error("Email or password invalid");
      }
    })
  }
})

export default userSlice.reducer;