
export interface BoardzInfo {
  author: { username: string; userpic: string };
  boardTitle: string;
  boardContent: string;
  likes: { username: string }[];
  comments: commentsListData[];
}
export interface commentsListData {
  commentAuthor: { username: string; userpic: string };
  commentContent: string;
  commentLikes: { username: string }[];
  _id:string;
  createdAt:Date;
}
export interface BoardzInfoFeed {
  _id: string;
  author: { username: string; userpic: string };
  boardTitle: string;
  likes: { username: string }[];
}
