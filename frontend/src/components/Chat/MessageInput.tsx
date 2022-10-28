import "./MessageInput.css";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useEffect, useState } from "react";
import { putMessage } from "../../api/MessageController";
interface MIProps {
  toggleEmojiPicker: Function;
  showEmjPicker: boolean;
}

//Banned words
const profanityWords = ["wtf"];
//Banned words

const MessageInput: React.FC<MIProps> = ({ toggleEmojiPicker, showEmjPicker }) => {
  const [message, setMessage] = useState<string>("");
  const emojiPickedHandler = ({ native }: { native: string }) => {
    setMessage((prev) => prev + native);
  };
  const sendMessageHandler = async (e: any) => {
    e.preventDefault();
    if (message.trim().length === 0) return;
    if (message.length > 350) {
      alert("Maximum message length is 350\nCurrent message length:" + message.length);
      return;
    }
    if (profanityWords.some((x) => message.includes(x))) {
      alert("Yer message contains words that are forbidden 👮‍♀️");
      return;
    }
    const result = await putMessage({ message });
    if (result.ok) setMessage("");
  };

  //*************Listener*************//
  useEffect(() => {
    const hideEmjPicker = () => {
      if (showEmjPicker) toggleEmojiPicker(false);
    };
    window.addEventListener("scroll", hideEmjPicker);
    return () => window.removeEventListener("scroll", hideEmjPicker);
  }, [showEmjPicker, toggleEmojiPicker]);
  //*************Listener*************//

  return (
    <>
      {showEmjPicker && (
        <span style={{ position: "fixed", bottom: "65px", right: "4px" }}>
          <Picker data={data} onEmojiSelect={emojiPickedHandler} />
        </span>
      )}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position='fixed'
          color='primary'
          sx={{ backgroundColor: "#272727", top: "auto", bottom: 0 }}
        >
          <Toolbar>
            <form className='MessageInput__Section' onSubmit={sendMessageHandler}>
              <input
                onFocus={() => toggleEmojiPicker(false)}
                className='MessageInput__Input'
                placeholder='Send message...'
                style={{ color: "white" }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMessage(e.target.value || "")
                }
                value={message}
              />
              <span onClick={() => toggleEmojiPicker()} style={{ cursor: "pointer" }}>
                <EmojiEmotionsIcon sx={{ transform: "translate(1px,4px)" }} />
              </span>
            </form>

            <IconButton size='medium' color='inherit' onClick={sendMessageHandler}>
              <SendIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default MessageInput;
