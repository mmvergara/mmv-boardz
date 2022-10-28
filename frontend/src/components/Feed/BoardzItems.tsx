import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { BoardzInfoFeed } from "../types/BoardzTypes";
import { useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "../../state/StoreIndex";
import { postLikeBoardz } from "../../api/BoardController";
import { Link } from "react-router-dom";
import { authorBoxStyle, boxStyle, postInfoStyle } from "../Style/SXStyles";
import { API_URL } from "../../Config";

interface FeedItemsProps {
  boardDetails: BoardzInfoFeed;
}

const BoardzItems: React.FC<FeedItemsProps> = ({ boardDetails }) => {
  const curUser = useSelector((state: RootState) => state.AuthSlice);
  const { author, likes, boardTitle, _id } = boardDetails;
  const [totalLikes, setLikes] = useState<number>(likes.length);
  const [isLiked, setIsLiked] = useState<boolean>(
    likes.map((x) => x.username).includes(curUser.username)
  );

  const LikePostHandler = async () => {
    const result = await postLikeBoardz(_id.toString());
    setLikes(result.Likes);
    setIsLiked(result.isLiked);
  };

  return (
    <Box sx={boxStyle}>
      <Box sx={authorBoxStyle}>
        <Avatar
          alt='Remy Sharp'
          src={API_URL + "/" + author.userpic || "https://i.ibb.co/LxryDqs/default.png"}
          sx={{ width: 36, height: 36, marginLeft: "6px" }}
        />
        {author.username}
      </Box>

      <Box sx={postInfoStyle}>
        <Typography
          variant='h4'
          sx={{
            marginLeft: "10px",
            marginTop: "0.5em",
            marginBottom: "0.5em",
            overflow: "hidden",
            wordWrap: "break-word",
          }}
        >
          {boardTitle}
        </Typography>
        <Link to={`/boardz/${_id}`}>
          <Button variant='contained' sx={{ margin: "0.5em" }}>
            Explore
          </Button>
        </Link>
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
      </Box>
    </Box>
  );
};

export default BoardzItems;
