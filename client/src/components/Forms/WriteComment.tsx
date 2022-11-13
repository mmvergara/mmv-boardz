import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { RootState } from "../../state/StoreIndex";
import { commentValidationSchema } from "./FormSchemas";
import { useFormik } from "formik";
import { putCommentHandler } from "../../api/BoardController";
import { ThemeProvider } from "@mui/material";
import { CrownTheme } from "../Style/Theme";

type WCProps = {
  boardId: string;
  submitComment: Function;
};

const WriteComment: React.FC<WCProps> = ({ boardId, submitComment }) => {
  const curUser = useSelector((state: RootState) => {
    return state.AuthSlice;
  });
  const submitCommentHandler = async () => {
    if (formik.values.commentContent.trim().length === 0) return;
    const result = await putCommentHandler(boardId, formik.values.commentContent);
    if (!result.ok) return;
    submitComment();
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      commentContent: "",
    },
    validationSchema: commentValidationSchema,
    onSubmit: submitCommentHandler,
  });

  return (
    <ThemeProvider theme={CrownTheme}>
      <form
        onSubmit={formik.handleSubmit}
        style={{ width: "100%", display: "flex", alignItems: "center", gap: "9px" }}
      >
        <Avatar
          alt='Remy Sharp'
          src={curUser.userpic}
          sx={{ width: 36, height: 36, marginLeft: "6px" }}
        />
        <TextField
          variant='outlined'
          fullWidth
          id='commentContent'
          name='commentContent'
          type='text'
          label='Write a comment...'
          value={formik.values.commentContent}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.commentContent && Boolean(formik.errors.commentContent)}
          helperText={formik.touched.commentContent && formik.errors.commentContent}
        />
      </form>
    </ThemeProvider>
  );
};

export default WriteComment;
