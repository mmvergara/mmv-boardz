import { AuthState } from "../../state/AuthSlice";
import { BoardzInfo, BoardzInfoFeed } from "./BoardzTypes";

export interface newBoardPostData {
  boardTitle: string;
  boardContent: string;
}
export interface newBoardPostDataResponse {
  message: string;
  ok: boolean;
}

export interface getBoardsListResponse {
  message: string;
  ok: boolean;
  boardzList: BoardzInfoFeed[];
}

export interface postLikeResponse {
  message: string;
  ok: boolean;
  Likes: number;
  isLiked: boolean;
}
export interface postLikeCommentResponse {
  message: string;
  ok: boolean;
  Likes: number;
  isLiked: boolean;
}

export interface getSingleBoardzPostResponse {
  liked: boolean;
  message: string;
  ok: false;
  boardzData: BoardzInfo;
}
export interface postLikeHandlerResponse {
  message: string;
  IsLiked: boolean;
  Likes: number;
}
export interface RegisterForm {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}
export interface authResponse {
  message: string;
  ok: boolean;
  statusCode: number;
  userData?: AuthState;
  imgPath?:string;
}

export interface LoginForm {
  email: string;
  password: string;
}
export interface ChangePassForm {
  newPassword: string;
  oldPassword: string;
}

export interface ChangeUsernameForm{
  newUsername:string;
  password:string;
}
export interface ChangeEmailForm{
  newEmail:string;
  password:string;
}
