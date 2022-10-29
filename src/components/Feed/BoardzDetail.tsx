import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LoadingSnowSpin from "../../assets/LoadingSnowSpin";
import BoardzComments from "./sub-components/BoardzComments";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBoardzHandler, getSingleBoardz, postLikeBoardz } from "../../api/BoardController";
import { authorBoxStyle, boxStyle, postInfoStyle } from "../Style/SXStyles";
import { useEffect, useState } from "react";
import { BoardzInfo } from "../types/BoardzTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../state/StoreIndex";
import { API_URL } from "../../Config";

const BoardzDetail: React.FC = () => {
  const { username: curUsername } = useSelector((state: RootState) => state.AuthSlice);
  const { boardId } = useParams<{ boardId: string }>();
  const navigate = useNavigate();

  const [boardData, setBoardData] = useState<BoardzInfo>();

  const getBoardzDetailHandler = async (boardID: string) => {
    const result = await getSingleBoardz(boardID);
    if (result?.boardzData) setBoardData(result.boardzData);
  };

  const LikePostHandler = async () => {
    await postLikeBoardz(boardId!);
    await getBoardzDetailHandler(boardId!);
  };

  useEffect(() => {
    getBoardzDetailHandler(boardId!);
  }, [boardId]);

  if (!boardData) {
    return <LoadingSnowSpin />;
  }

  const isLiked = boardData.likes.map((x) => x.username).includes(curUsername);
  const totalLikes = boardData.likes.length;
  const sortedByDateComments = boardData.comments.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  const commentList = [
    ...sortedByDateComments.filter(({ commentAuthor }) => {
      return commentAuthor.username === curUsername;
    }),
    ...sortedByDateComments.filter(({ commentAuthor }) => {
      return commentAuthor.username !== curUsername;
    }),
  ];

  const deleteBHandler = async () => {
    await deleteBoardzHandler(boardId!);
    navigate("/");
  };

  return (
    <Container maxWidth='md' sx={{ marginTop: "2em" }}>
      <Box sx={{ ...boxStyle, marginTop: "5em" }}>
        <Box sx={authorBoxStyle}>
          <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "9px" }}>
            <Avatar
              alt='Remy Sharp'
              src={
                API_URL + "/" + boardData.author.userpic || "https://i.ibb.co/LxryDqs/default.png"
              }
              sx={{ width: 36, height: 36, marginLeft: "6px" }}
            />
            <p>{boardData.author.username}</p>
          </div>
          <Typography
            variant='h4'
            sx={{
              marginLeft: "45px",
              overflow: "hidden",
              wordWrap: "break-word",
            }}
          >
            {boardData.boardTitle}
          </Typography>
        </Box>
        <Box sx={postInfoStyle}>
          <Typography
            variant='h6'
            sx={{
              marginLeft: "10px",
              marginTop: "0.5em",
              marginBottom: "0.5em",
              overflow: "hidden",
              wordWrap: "break-word",
            }}
          >
            {boardData.boardContent}
          </Typography>
          <Button
            onClick={LikePostHandler}
            variant='contained'
            color='error'
            sx={{ margin: "0.5em", fontWeight: "bold" }}
          >
            {isLiked ? (
              <FavoriteIcon sx={{ paddingRight: "3px" }} />
            ) : (
              <FavoriteBorderIcon sx={{ paddingRight: "3px" }} />
            )}
            {isLiked ? `${totalLikes} LIKED` : `${totalLikes} LIKES`}
          </Button>
          {curUsername === boardData.author.username && (
            <Button onClick={deleteBHandler} variant='text' color='error'>
              <DeleteForeverIcon />
            </Button>
          )}
          <Divider sx={{ margin: "1em 0em" }} />
          <BoardzComments
            updateBoardz={getBoardzDetailHandler}
            boardId={boardId!}
            commentsList={commentList}
          />
          {commentList.length === 0 && (
            <h3 style={{ marginLeft: "20px" }}>no comments yet... 👻</h3>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default BoardzDetail;
