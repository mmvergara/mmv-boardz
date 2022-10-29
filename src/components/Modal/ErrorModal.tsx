import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { authorBoxStyle, boxStyle, postInfoStyle } from "../Style/SXStyles";
import { Link, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/StoreIndex";
import { ErrHandlingSliceActions } from "../../state/ErrHandlingSlice";
import { AuthSliceActions } from "../../state/AuthSlice";

const ErrorModal: React.FC = () => {
  const { errMessage, hasError, statusCode } = useSelector(
    (state: RootState) => state.ErrHandlingSlice
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthErr = errMessage === "Session Expired! Try loggin in again";
  const modalCloseHandler = () => {
    dispatch(ErrHandlingSliceActions.removeErr());
    if (isAuthErr) {
      dispatch(AuthSliceActions.authLogout())
      navigate("/auth/login");
    }
  };
  return (
    <>
      <Modal
        hideBackdrop
        open={hasError}
        onClick={modalCloseHandler}
        onClose={modalCloseHandler}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
        sx={{ backgroundColor: "#1f1f1f68" }}
      >
        <Container maxWidth='sm' sx={{ marginTop: "200px" }} style={{ padding: "0px",maxWidth: "500px",outline:'none' }}>
          <Box sx={{ ...boxStyle }} >
            <Box sx={authorBoxStyle}>Error Occured : Code {statusCode}</Box>
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
                {errMessage}
              </Typography>

              {isAuthErr ? (
                <Link to={`/auth/login`}>
                  <Button
                    onClick={modalCloseHandler}
                    variant='contained'
                    color='error'
                    sx={{ margin: "0.5em", fontWeight: "bold" }}
                  >
                    Login
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={modalCloseHandler}
                  variant='contained'
                  color='error'
                  sx={{ margin: "0.5em", fontWeight: "bold" }}
                >
                  Continue
                </Button>
              )}
            </Box>
          </Box>
        </Container>
      </Modal>
    </>
  );
};

export default ErrorModal;
