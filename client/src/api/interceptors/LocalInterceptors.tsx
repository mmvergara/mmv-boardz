import axios, { AxiosError, AxiosResponse } from "axios";
import { authResponse } from "../../components/types/RequestTypes";
import { API_URL as baseURL } from "../../Config";
axios.defaults.withCredentials = true
const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
});

export const AuthRequest = async (reqConfig: reqConfing): Promise<authResponse> => {
  try {
    const result = (await axiosClient(reqConfig)) as AxiosResponse<authResponse>;
    return result.data;
  } catch (error) {
    const err = error as AxiosError<authResponse>;
    let message = err.message;
    let ok = false;
    let statusCode = 500;
    if (err?.status) {
      statusCode = err.status;
    }
    if (err.response?.data) {
      message = err.response.data.message;
    }
    return { message, ok, statusCode };
  }
};

interface reqConfing {
  method: string;
  url: string;
  data?: {} | FormData;
  headers?: {};
}
