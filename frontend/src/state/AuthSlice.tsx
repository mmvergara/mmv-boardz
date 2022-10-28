import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postLogout } from "../api/AuthController";
import { API_URL } from "../Config";

export interface AuthState {
  username: string;
  userpic: string;
  tokenExpirationDate: number;
  isAuthenticated: boolean;
}

let initialState: AuthState = {
  username: "",
  userpic: "",
  tokenExpirationDate: 0,
  isAuthenticated: false,
};

const localAuth: AuthState | null = localStorage.getItem("authState")
  ? JSON.parse(localStorage.getItem("authState")!)
  : null;
if (localAuth) {
  initialState = localAuth;
}

const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    authLogin: (state: AuthState, action: PayloadAction<AuthState>) => {
      state.userpic = API_URL + "/" + action.payload.userpic;
      state.username = action.payload.username;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.tokenExpirationDate = action.payload.tokenExpirationDate;
      localStorage.setItem(
        "authState",
        JSON.stringify({ ...action.payload, userpic: state.userpic })
      );
    },
    changeUsername: (state: AuthState, action: PayloadAction<{ newUsername: string }>) => {
      state.username = action.payload.newUsername;
      localStorage.setItem("authState", JSON.stringify(state));
    },
    changeUserPic: (state: AuthState, action: PayloadAction<{ imgPath: string }>) => {
      state.userpic = API_URL + "/" + action.payload.imgPath;
      localStorage.setItem("authState", JSON.stringify(state));
    },
    authLogout: (state: AuthState) => {
      postLogout();
      state.userpic = "";
      state.username = "";
      state.isAuthenticated = false;
      state.tokenExpirationDate = 0;
      localStorage.removeItem("authState");
    },
  },
});

export const AuthSliceActions = AuthSlice.actions;
export default AuthSlice.reducer;
