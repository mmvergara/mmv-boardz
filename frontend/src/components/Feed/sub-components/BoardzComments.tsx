import Typography from "@mui/material/Typography";
import WriteComment from "../../Forms/WriteComment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import uniqid from "uniqid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { commentsListData } from "../../types/BoardzTypes";
import { deleteCommentHandler, postLikeCommentHandler } from "../../../api/BoardController";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/StoreIndex";
import { API_URL } from "../../../Config";

type BCProps = {
  boardId: string;
  commentsList: commentsListData[];
  updateBoardz: Function;
};
const BoardzComments: React.FC<BCProps> = ({ updateBoardz, boardId, commentsList }) => {
  const curUser = useSelector((state: RootState) => state.AuthSlice);

  const updateHandler = () => {
    updateBoardz(boardId);
  };
  const LikeCommentHandler = async (commentId: string) => {
    await postLikeCommentHandler(commentId);
    updateHandler();
  };
  const handleDeleteComment = async (commentId: string) => {
    await deleteCommentHandler(boardId, commentId);
    updateHandler();
  };

  return (
    <>
      <WriteComment boardId={boardId!} submitComment={updateHandler} />
      {commentsList.map((x) => {
        const isLiked = x.commentLikes.some((x) => {
          return x.username === curUser.username;
        });
        const totalCommentLikes = x.commentLikes.length;
        return (
          <div
            key={uniqid()}
            style={{
              width: "100%",
              display: "flex",
              gap: "9px",
              border: "1px solid #13171841",
              borderRadius: "6px",
              margin: "1em 0em",
            }}
          >
            <Avatar
              alt='Remy Sharp'
              src={API_URL + "/" + x.commentAuthor.userpic}
              sx={{ width: 36, height: 36, marginLeft: "6px", marginTop: "10px" }}
            />
            <div>
              <p style={{ fontWeight: "bold" }}>{x.commentAuthor.username}</p>
              <Typography
                variant='h6'
                sx={{
                  margin: "0.5em 10px",
                  marginLeft: "2px",
                  overflow: "hidden",
                  wordWrap: "break-word",
                }}
              >
                {x.commentContent}
              </Typography>
              <Button
                onClick={() => {
                  LikeCommentHandler(x._id);
                }}
                variant='contained'
                color='error'
                sx={{ maxHeight: "40px", marginBottom: "1em", fontWeight: "bold" }}
              >
                {isLiked ? (
                  <FavoriteIcon sx={{ paddingRight: "3px" }} />
                ) : (
                  <FavoriteBorderIcon sx={{ paddingRight: "3px" }} />
                )}
                {totalCommentLikes || ""}
              </Button>
              {curUser.username === x.commentAuthor.username && (
                <Button
                  onClick={() => {
                    handleDeleteComment(x._id);
                  }}
                  variant='text'
                  color='error'
                  sx={{ maxHeight: "40px", marginBottom: "1em", marginLeft: "2px" }}
                >
                  <DeleteForeverIcon />
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default BoardzComments;
