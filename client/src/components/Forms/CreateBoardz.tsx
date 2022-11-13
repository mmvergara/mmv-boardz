import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import CreateIcon from "@mui/icons-material/Create";
import useLoadingMain from "../../hooks/useLoadingMain";
import useStatus from "../../hooks/useStatus";
import { ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../state/StoreIndex";
import { CreateBoardzTheme } from "../Style/Theme";
import { useFormik } from "formik";
import { createBoardValidationSchema } from "./FormSchemas";
import { putCreateBoardz } from "../../api/BoardController";
import { authorBoxStyle, boxStyle, postInfoStyle } from "../Style/SXStyles";
import { useNavigate } from "react-router-dom";

const CreateBoardz: React.FC = () => {
  const curUser = useSelector((state: RootState) => state.AuthSlice);
  const navigate = useNavigate();
  const { loadingIcon, toggleLoading } = useLoadingMain("white", "7px", "25px");
  const {
    setStatus,
    status: { hasError, isLoading, statusText },
  } = useStatus();

  const boardSubmitHandler = async () => {
    setStatus({ hasError: false, isLoading: true, statusText: "" });
    toggleLoading();
    const result = await putCreateBoardz({
      boardTitle: formik.values.boardTitle,
      boardContent: formik.values.boardContent,
    });
    setStatus({
      hasError: !result.ok,
      isLoading: false,
      statusText: result.ok ? "Board Submitted, Redirecting..." : result.message,
    });

    if (result.ok) {
      formik.resetForm();
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
    toggleLoading();
  };
  const formik = useFormik({
    initialValues: {
      boardTitle: "",
      boardContent: "",
    },
    validationSchema: createBoardValidationSchema,
    onSubmit: boardSubmitHandler,
  });

  return (
    <ThemeProvider theme={CreateBoardzTheme}>
      <section style={{ marginTop: "80px" }}>
        <Container maxWidth='md'>
          <Box sx={boxStyle}>
            <Box sx={authorBoxStyle}>
              <Avatar
                alt='Remy Sharp'
                src={curUser.userpic || "https://i.ibb.co/LxryDqs/default.png"}
                sx={{ width: 36, height: 36, marginLeft: "8px", marginRight: "4px" }}
              />
              <b style={{ fontSize: "18px", margin: "0em auto 0em 0em" }}>Create new Board Post</b>
              <CreateIcon sx={{ marginRight: "10px" }} />
            </Box>

            <Box onSubmit={formik.handleSubmit} component='form' sx={postInfoStyle}>
              <TextField
                id='boardTitle'
                name='boardTitle'
                label='boardTitle'
                placeholder='Board Title'
                value={formik.values.boardTitle}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.boardTitle && Boolean(formik.errors.boardTitle)}
                helperText={formik.touched.boardTitle && formik.errors.boardTitle}
                variant='filled'
                sx={{ width: "100%", marginBottom: "20px" }}
              />
              <TextField
                id='boardContent'
                name='boardContent'
                label='boardContent'
                placeholder='Board Content'
                value={formik.values.boardContent}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.boardContent && Boolean(formik.errors.boardContent)}
                helperText={formik.touched.boardContent && formik.errors.boardContent}
                multiline
                variant='outlined'
                rows={10}
                sx={{ width: "100%", marginBottom: "20px" }}
              />
              <Button type='submit' variant='contained' sx={{ margin: "0.5em", minHeight: "40px" }}>
                Submit Boardz
                {loadingIcon === "" ? <SendIcon sx={{ marginLeft: "10px" }} /> : loadingIcon}
              </Button>
              <b style={{ marginLeft: "5px", color: hasError ? "red" : "green" }}>
                {!isLoading && statusText}
              </b>
            </Box>
          </Box>
        </Container>
      </section>
    </ThemeProvider>
  );
};

export default CreateBoardz;
