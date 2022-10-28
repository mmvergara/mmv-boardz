import { AxiosResponse } from "axios";
import { messageReqResponse } from "../components/types/MessageTypes";
import { AxiosRequest } from "./interceptors/StoreInterceptors";

export const getAllMessages = async (): Promise<messageReqResponse> => {
  const result = (await AxiosRequest({
    method: "get",
    url: "/message/messages",
  })) as AxiosResponse<messageReqResponse>;
  return result.data;
};
export const putMessage = async (data: { message: string }): Promise<messageReqResponse> => {
  const result = (await AxiosRequest({
    method: "put",
    url: "/message/createnewmessage",
    data,
  })) as AxiosResponse<messageReqResponse>;
  return result.data;
};
export const deleteMessage = async ({ messageID }: { messageID: string }) => {
  const result = (await AxiosRequest({
    method: "delete",
    url: "/message/delete/" + messageID,
  })) as AxiosResponse<messageReqResponse>;
  return result.data;
};
