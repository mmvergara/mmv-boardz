import { AxiosResponse } from "axios";
import {
  getBoardsListResponse,
  getSingleBoardzPostResponse,
  newBoardPostData,
  newBoardPostDataResponse,
  postLikeResponse,
  postLikeCommentResponse,
} from "../components/types/RequestTypes";
import { BOARDZ_ITEM_PERPAGE_COUNT } from "../Config";
import { AxiosRequest } from "./interceptors/StoreInterceptors";
interface writeCommentResponse {
  message: string;
  ok: boolean;
  data: {};
}

export const getBoardz = async (page: number): Promise<getBoardsListResponse> => {
  const result = (await AxiosRequest({
    method: "get",
    url: `/boardz/boardzlist?page=${String(page)}&count=${String(BOARDZ_ITEM_PERPAGE_COUNT)}`,
  })) as AxiosResponse<getBoardsListResponse>;
  return result.data;
};

export const getBoardzCount = async (): Promise<{ ok: boolean; mesage: string; count: number }> => {
  const result = (await AxiosRequest({
    method: "get",
    url: `/boardz/count`,
  })) as AxiosResponse<{ ok: boolean; mesage: string; count: number }>;
  return result.data;
};

export const getSingleBoardz = async (boardId: string): Promise<getSingleBoardzPostResponse> => {
  const result = (await AxiosRequest({
    url: `/boardz/${boardId}`,
    method: "get",
  })) as AxiosResponse<getSingleBoardzPostResponse>;
  return result.data;
};

export const postLikeBoardz = async (boardId: string): Promise<postLikeResponse> => {
  const result = (await AxiosRequest({
    method: "post",
    url: `/boardz/like/${boardId}`,
    data: {},
  })) as AxiosResponse<postLikeResponse>;
  return {
    isLiked: result.data?.message === "Liked" ? true : false,
    Likes: result.data?.Likes,
    message: result.data?.message,
    ok: true,
  };
};

export const putCreateBoardz = async (
  boardData: newBoardPostData
): Promise<newBoardPostDataResponse> => {
  const result = (await AxiosRequest({
    method: "put",
    url: "/boardz/createnewboardz",
    data: boardData,
  })) as AxiosResponse<newBoardPostDataResponse>;
  return result.data;
};

export const putCommentHandler = async (
  boardId: string,
  commentContent: string
): Promise<writeCommentResponse> => {
  const result = (await AxiosRequest({
    method: "put",
    url: `/boardz/comment/${boardId}`,
    data: { commentContent },
  })) as AxiosResponse<writeCommentResponse>;
  return result.data;
};
export const postLikeCommentHandler = async (
  commentId: string
): Promise<postLikeCommentResponse> => {
  const result = (await AxiosRequest({
    method: "post",
    url: `/boardz/like/comment/${commentId}`,
    data: {},
  })) as AxiosResponse<postLikeCommentResponse>;
  return {
    isLiked: result.data?.message === "Liked" ? true : false,
    Likes: result.data?.Likes,
    message: result.data?.message,
    ok: true,
  };
};
export const deleteCommentHandler = async (boardId: string, commentId: string) => {
  const result = (await AxiosRequest({
    url: `/boardz/delete/comment/${commentId}?boardId=${boardId}`,
    method: "delete",
  })) as AxiosResponse;
  return result.statusText;
};
export const deleteBoardzHandler = async (boardId: string) => {
  await AxiosRequest({ method: "delete", url: `/boardz/delete/boardz/${boardId}` });
};
