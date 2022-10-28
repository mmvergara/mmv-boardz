import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SnowSpinSM from "../../assets/SnowSpinSM";
import useStatus from "../../hooks/useStatus";
import { useFormik } from "formik";
import { usernamePatchSchema } from "./Patch-FormSchemas";
import { patchChangeUsername } from "../../api/AuthController";
import { useDispatch } from "react-redux";
import { AuthSliceActions } from "../../state/AuthSlice";

const ChangeUsername: React.FC<{ username: string }> = ({ username }) => {
  const {
    setStatus,
    status: { hasError, isLoading, statusText },
  } = useStatus();
  const dispatch = useDispatch();

  const changeUsernameHandler = async () => {
    setStatus({ hasError: false, isLoading: true, statusText: "" });
    const ChangeUsernameData = {
      newUsername: formik.values.UUnewUsername,
      password: formik.values.UUpassword,
    };
    const result = await patchChangeUsername(ChangeUsernameData);
    if (result.ok) {
      dispatch(AuthSliceActions.changeUsername({ newUsername: formik.values.UUnewUsername }));
      formik.resetForm();
    }
    setStatus({ hasError: !result.ok, isLoading: false, statusText: result.message });
  };

  const formik = useFormik({
    initialValues: {
      username,
      UUnewUsername: "",
      UUpassword: "",
    },
    validationSchema: usernamePatchSchema,
    onSubmit: changeUsernameHandler,
  });

  return (
    <>
      <Typography variant='h4' sx={{ my: 2 }}>
        Change Username {isLoading && <SnowSpinSM />}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          sx={{ marginBottom: "20px" }}
          fullWidth
          id='UUnewUsername'
          name='UUnewUsername'
          label='New Username'
          variant='outlined'
          color='primary'
          value={formik.values.UUnewUsername}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.UUnewUsername && Boolean(formik.errors.UUnewUsername)}
          helperText={formik.touched.UUnewUsername && formik.errors.UUnewUsername}
        />
        <TextField
          sx={{ marginBottom: "20px" }}
          fullWidth
          id='UUpassword'
          name='UUpassword'
          label='Current Password'
          type='password'
          variant='outlined'
          color='primary'
          value={formik.values.UUpassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.UUpassword && Boolean(formik.errors.UUpassword)}
          helperText={formik.touched.UUpassword && formik.errors.UUpassword}
        />
        <Button type='submit' variant='contained' color='info'>
          Change username
        </Button>
        <Typography
          sx={{
            display: "inline",
            mx: 4,
            color: hasError ? "red" : "green",
          }}
        >
          {!isLoading && statusText}
        </Typography>
      </form>
    </>
  );
};

export default ChangeUsername;
