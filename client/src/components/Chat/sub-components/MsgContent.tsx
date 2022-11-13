import Typography from "@mui/material/Typography";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { messageReqResponse } from "../../types/MessageTypes";
import { useState } from "react";

interface MsgContentProps {
  messageContent: string;
  messageAuthorName: string;
  msgId: string;
  lastAuthor: boolean;
  isMobile: boolean;
  nextAuthor: boolean;
  deleteMessage: (messageID: string) => Promise<messageReqResponse>;
  styleOptions: {
    isTopMost: boolean;
    isMiddle: boolean;
    isBottomMost: boolean;
    isAuthor: boolean;
    isSingle: boolean;
  };
}

const MsgContent: React.FC<MsgContentProps> = (props) => {
  const { isAuthor, isBottomMost, isMiddle, isTopMost, isSingle } = props.styleOptions;
  const [showDelBtn, setShowDelBtn] = useState<boolean>(false);

  const msgClickHandler = () => setShowDelBtn((prev) => !prev);
  const deleteHandler = (e: any) => props.deleteMessage(props.msgId);
  const TypographyMsgContentStyles = {
    borderRadius: "20px",
    borderTopLeftRadius: isSingle
      ? "20px"
      : !isAuthor && isTopMost
      ? "20px"
      : !isAuthor && isMiddle
      ? "7px"
      : isAuthor
      ? "20px"
      : "3px",
    borderBottomLeftRadius: isSingle
      ? "20px"
      : !isAuthor && isBottomMost
      ? "20px"
      : !isAuthor && isMiddle
      ? "7px"
      : isAuthor
      ? "20px"
      : "3px",
    borderTopRightRadius: isSingle ? "20px" : isAuthor && props.lastAuthor ? "7px" : "",
    borderBottomRightRadius: isSingle ? "20px" : isAuthor && props.nextAuthor ? "7px" : "",
    backgroundColor: isAuthor ? "#4a4a4a" : "#272727",
    padding: "0.3em 0.8em",
    marginLeft: props.lastAuthor && !isAuthor ? "40px" : "0px",
    width: "fit-content",
  };

  return (
    <>
      {isAuthor && showDelBtn && (
        <span onClick={deleteHandler}>
          <HighlightOffIcon
            sx={{ color: "#630a0a", fontSize: "1.4rem", cursor: isAuthor ? "pointer" : "" }}
          />
        </span>
      )}
      <div
        style={{ maxWidth: "560px", cursor: isAuthor ? "pointer" : "" }}
        onClick={msgClickHandler}
      >
        <Typography
          sx={{ color: "gray", marginLeft: "5px" }}
          variant={props.isMobile ? "body2" : "h6"}
        >
          {!isAuthor && !props.lastAuthor && props.messageAuthorName}
        </Typography>
        <Typography
          variant={props.isMobile ? "body2" : "h6"}
          color={isAuthor && showDelBtn ? "#b27d7d" : "#dcdcdc"}
          sx={TypographyMsgContentStyles}
          className='transitionSmooth'
        >
          {props.messageContent}
        </Typography>
      </div>
    </>
  );
};

export default MsgContent;
