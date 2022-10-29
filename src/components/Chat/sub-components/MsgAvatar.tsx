import Avatar from "@mui/material/Avatar";
import { API_URL } from "../../../Config";

const MsgAvatar: React.FC<{ imgUrl: string; isMobile: boolean }> = ({ imgUrl, isMobile }) => {
  const imgUrlTransformed =
    "https://i.ibb.co/LxryDqs/default.png" === imgUrl ? imgUrl : `${API_URL}/${imgUrl}`;

  return (
    <Avatar
      alt='Remy Sharp'
      src={imgUrlTransformed}
      sx={{
        width: 36,
        height: 36,
        marginTop: isMobile ? "13px" : "36px",
        marginBottom: "auto",
      }}
    />
  );
};

export default MsgAvatar;
