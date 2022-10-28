import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ErrHandlingState {
  errMessage: string;
  hasError: boolean;
  statusCode:string;
}

let initialState: ErrHandlingState = {
  errMessage: "",
  hasError: false,
  statusCode:'',
};

const ErrHandlingSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    showErr(state: ErrHandlingState, action: PayloadAction<ErrHandlingState>) {
      state.errMessage = action.payload.errMessage;
      state.hasError = action.payload.hasError;
      state.statusCode = action.payload.statusCode
    },
    removeErr(state: ErrHandlingState) {
      state.errMessage = "";
      state.hasError = false;
      state.statusCode =''
    },
  },
});

export const ErrHandlingSliceActions = ErrHandlingSlice.actions;
export default ErrHandlingSlice.reducer;
