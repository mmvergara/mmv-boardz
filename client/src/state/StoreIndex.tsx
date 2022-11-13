import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import ErrHandlingSlice from "./ErrHandlingSlice";
export const Store = configureStore({
  reducer: {
    AuthSlice,
    ErrHandlingSlice,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
