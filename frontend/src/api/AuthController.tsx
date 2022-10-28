import axios from "axios";
import {
  authResponse,
  ChangeEmailForm,
  ChangePassForm,
  ChangeUsernameForm,
  LoginForm,
  RegisterForm,
} from "../components/types/RequestTypes";
import { API_URL as mainUrl } from "../Config";
import { AuthRequest } from "./interceptors/LocalInterceptors";

export const putRegister = async (RegisterData: RegisterForm): Promise<authResponse> => {
  const result = await AuthRequest({
    method: "put",
    url: "/auth/register",
    data: RegisterData,
  });
  return result;
};
export const postLogin = async (Logindata: LoginForm): Promise<authResponse> => {
  const result = await AuthRequest({
    method: "post",
    url: "/auth/login",
    data: Logindata,
  });
  return result;
};
export const postLogout = async () => {
  await axios.post(`${mainUrl}/auth/logout`, {}, { withCredentials: true });
};
export const patchChangePassword = async (
  ChangePassData: ChangePassForm
): Promise<authResponse> => {
  const result = await AuthRequest({
    method: "patch",
    url: "/auth/patch/password",
    data: ChangePassData,
  });
  return result;
};
export const patchChangeUsername = async (
  ChangeUsernameData: ChangeUsernameForm
): Promise<authResponse> => {
  const result = await AuthRequest({
    method: "patch",
    url: "/auth/patch/username",
    data: ChangeUsernameData,
  });
  return result;
};
export const patchChangeEmail = async (ChangeEmailData: ChangeEmailForm): Promise<authResponse> => {
  const result = await AuthRequest({
    method: "patch",
    url: "/auth/patch/email",
    data: ChangeEmailData,
  });
  return result;
};
export const patchChangeUserPic = async (ChangeUserPicData: FormData): Promise<authResponse> => {
  const result = await AuthRequest({
    method: "patch",
    url: "/auth/patch/userpic",
    data: ChangeUserPicData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return result;
};
