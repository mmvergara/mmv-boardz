import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #272727",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  textAlign: "center",
};
interface TextModalProps {
  modalCloseHandler: () => void;
  isOpen: boolean;
  title: string;
  message: string;
  exitButtonText: string;
}
const TextModal: React.FC<TextModalProps> = ({
  title,
  message,
  exitButtonText,
  isOpen,
  modalCloseHandler,
}) => {
  return (
    <>
      <Modal
        hideBackdrop
        open={isOpen}
        onClick={modalCloseHandler}
        onClose={modalCloseHandler}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
        sx={{ backgroundColor: "#1f1f1f68" }}
      >
        <Box sx={{ ...style, width: 250 }}>
          <Typography variant='h6' id='child-modal-title'>
            {title}
          </Typography>
          <Typography variant='body1' sx={{ marginBottom: "10px" }}>
            {message}
          </Typography>
          <Button variant='contained' onClick={modalCloseHandler}>
            {exitButtonText}
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default TextModal;
