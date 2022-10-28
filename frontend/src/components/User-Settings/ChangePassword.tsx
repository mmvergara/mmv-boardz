import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useStatus from "../../hooks/useStatus";
import SnowSpinSM from "../../assets/SnowSpinSM";
import { useFormik } from "formik";
import { patchChangePassword } from "../../api/AuthController";
import { passwordPatchSchema } from "./Patch-FormSchemas";

const ChangePassword: React.FC<{ username: string }> = ({ username }) => {
  const {
    setStatus,
    status: { hasError, isLoading, statusText },
  } = useStatus();

  const changePasswordHandler = async () => {
    setStatus({ hasError: false, isLoading: true, statusText: "" });
    const ChangePassData = {
      newPassword: formik.values.PUnewPassword,
      oldPassword: formik.values.PUpassword,
    };
    const result = await patchChangePassword(ChangePassData);
    if (result.ok) formik.resetForm();
    setStatus({ hasError: !result.ok, isLoading: false, statusText: result.message });
  };

  const formik = useFormik({
    initialValues: {
      username,
      PUnewPassword: "",
      PUpassword: "",
    },
    validationSchema: passwordPatchSchema,
    onSubmit: changePasswordHandler,
  });

  return (
    <>
      <Typography variant='h4' sx={{ my: 2 }}>
        Change Password {isLoading && <SnowSpinSM />}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          sx={{ marginBottom: "20px" }}
          fullWidth
          id='PUnewPassword'
          name='PUnewPassword'
          label='New Password'
          variant='outlined'
          color='primary'
          type='password'
          value={formik.values.PUnewPassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.PUnewPassword && Boolean(formik.errors.PUnewPassword)}
          helperText={formik.touched.PUnewPassword && formik.errors.PUnewPassword}
        />
        <TextField
          sx={{ marginBottom: "20px" }}
          fullWidth
          id='PUpassword'
          name='PUpassword'
          label='Current Password'
          type='password'
          variant='outlined'
          color='primary'
          value={formik.values.PUpassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.PUpassword && Boolean(formik.errors.PUpassword)}
          helperText={formik.touched.PUpassword && formik.errors.PUpassword}
        />
        <Button type='submit' variant='contained' color='info'>
          Change Password
        </Button>
        <Typography
          sx={{
            display: "inline",
            mx: 4,
            color: hasError ? "red" : "green",
          }}
          variant='body2'
        >
          {!isLoading && statusText}
        </Typography>
      </form>
    </>
  );
};

export default ChangePassword;
