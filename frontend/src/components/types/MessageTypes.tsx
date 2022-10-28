export interface messageDetails {
  _id:string;
  messageAuthor: { username: string; userpic: string };
  messageContent: string;
}

export interface messageReqResponse {
  message: string;
  ok: boolean;
  data?:messageDetails[];
}