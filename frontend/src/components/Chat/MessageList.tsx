import MsgAvatar from "./sub-components/MsgAvatar";
import MsgContent from "./sub-components/MsgContent";
import openSocket from "socket.io-client";
import useMediaQuery from "@mui/material/useMediaQuery";
import LoadingSnowSpin from "../../assets/LoadingSnowSpin";
import { messageDetails } from "../types/MessageTypes";
import { useEffect, useRef, useState } from "react";
import { API_URL } from "../../Config";
import { RootState } from "../../state/StoreIndex";
import { useSelector } from "react-redux";
import { deleteMessage, getAllMessages } from "../../api/MessageController";

const socket = openSocket(API_URL);
type action = "newMessage" | "deletedMessage";
type data = messageDetails;
const Messagelist: React.FC = () => {
  const [messageList, setMessageList] = useState<messageDetails[]>([]);
  const [isLoading, SetIsLoading] = useState<boolean>(true);
  const curUser = useSelector((state: RootState) => state.AuthSlice);
  const isMobile = !useMediaQuery("(min-width:415px)");
  const liRef = useRef<HTMLLIElement | null>(null!);
  const deleteMessageHandler = async (messageID: string) => await deleteMessage({ messageID });
  const fetchMessageList = async () => {
    const result = await getAllMessages();
    if (result.ok && result.data) setMessageList(result.data);
    SetIsLoading(false);
  };

  liRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    socket.on("message", (messageData: { action: action; data: data }) => {
      if (messageData.action === "newMessage") {
        setMessageList((prev) => [...prev, messageData.data]);
        setTimeout(() => {
          liRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 1);
      }
      if (messageData.action === "deletedMessage") {
        setMessageList((prev) => prev.filter((x) => x._id !== messageData.data._id));
      }
    });

    fetchMessageList();
    return () => {
      socket.off("message");
    };
  }, []);
  if (isLoading) return <LoadingSnowSpin />;
  if (!isLoading && messageList.length === 0)
    return <h1 style={{ textAlign: "center" }}>Wow it's empty 😲</h1>;

  return (
    <>
      {messageList.map((m, i) => {
        const isAuthor = curUser.username === m.messageAuthor.username;
        const lastAuthor = messageList[i - 1]?.messageAuthor.username === m.messageAuthor.username;
        const nextAuthor = messageList[i + 1]?.messageAuthor.username === m.messageAuthor.username;
        const styleOptions = {
          isTopMost: !lastAuthor && nextAuthor,
          isMiddle: lastAuthor && nextAuthor,
          isBottomMost: lastAuthor && !nextAuthor,
          isSingle: !lastAuthor && !nextAuthor,
          isAuthor,
        };
        const liElementStyle = {
          marginLeft: isAuthor ? "auto" : "0px",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          marginTop:
            isMobile && styleOptions.isTopMost
              ? "4px"
              : isMobile && (styleOptions.isMiddle || styleOptions.isBottomMost)
              ? "3px"
              : "2.4px",
        };
        return (
          <li key={m._id.toString()} style={liElementStyle}>
            {!isAuthor && !lastAuthor && (
              <MsgAvatar isMobile={isMobile} imgUrl={m.messageAuthor.userpic} />
            )}
            <MsgContent
              lastAuthor={lastAuthor}
              nextAuthor={nextAuthor}
              isMobile={isMobile}
              styleOptions={styleOptions}
              messageAuthorName={m.messageAuthor.username}
              messageContent={m.messageContent}
              deleteMessage={deleteMessageHandler}
              msgId={m._id}
            />
          </li>
        );
      })}
      <li ref={liRef} style={{ marginTop: !isMobile ? "40px" : "20px", color: "#dcdcdc" }}>
        A Padding Message glad you found it {"\\_>_<_/"}
      </li>
    </>
  );
};

export default Messagelist;
