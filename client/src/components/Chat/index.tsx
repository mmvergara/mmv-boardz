import Box from "@mui/material/Box";
import MessageInput from "./MessageInput";
import { useState } from "react";
import { messagelistContainer } from "../Style/SXStyles";
import Messagelist from "./MessageList";

const GlobalChat: React.FC = () => {
  const [showEmojis, setShowEmojis] = useState<boolean>(false);
  const toggleEmojiPicker = (show?: boolean | undefined): void => {
    if (show) {
      setShowEmojis(show);
      return;
    }
    if (show === false) {
      setShowEmojis(false);
      return;
    }
    setShowEmojis((prev) => !prev);
  };
  return (
    <>
      <section
        style={{ maxWidth: "1200px", height: "90vh", margin: "auto" }}
        onClick={() => toggleEmojiPicker(false)}
      >
        <Box sx={messagelistContainer}>
          <Messagelist />
        </Box>
      </section>
      <MessageInput showEmjPicker={showEmojis} toggleEmojiPicker={toggleEmojiPicker} />
    </>
  );
};

export default GlobalChat;
