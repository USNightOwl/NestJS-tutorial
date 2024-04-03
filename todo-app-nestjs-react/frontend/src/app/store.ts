import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
  reducer:{
    user: userSlice,
  }
})


export const useAppDispatch: () => typeof store.dispatch = useDispatch; 
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;