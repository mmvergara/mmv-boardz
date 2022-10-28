import axios, { AxiosError } from "axios";
import { ErrHandlingSliceActions } from "../../state/ErrHandlingSlice";
import { Store } from "../../state/StoreIndex";
import { API_URL as baseURL } from "../../Config";
axios.defaults.withCredentials = true;
const axiosClient = axios.create({
  withCredentials: true,
  baseURL,
});

export const AxiosRequest = async (reqConfig: reqConfing) => {
  try {
    const result = await axiosClient(reqConfig);
    return result;
  } catch (error) {
    const err = error as AxiosError<errResponse>;
    let message = err.message;
    let ok = false;
    let statusCode;
    if (err?.status) {
      statusCode = err?.status;
    }
    if (err?.response) {
      message = err.response.data.message;
      statusCode = err.response?.data.status || "500";
    }

    Store.dispatch(
      ErrHandlingSliceActions.showErr({
        errMessage: message,
        hasError: true,
        statusCode: String(statusCode),
      })
    );
    return { message, ok, data: [] };
  }
};

interface reqConfing {
  method: string;
  url: string;
  data?: {};
}
interface errResponse {
  status: number;
  message: string;
  ok: boolean;
}
