import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SnowSpinSM from "../../assets/SnowSpinSM";
import useStatus from "../../hooks/useStatus";
import { useFormik } from "formik";
import { emailPatchSchema } from "./Patch-FormSchemas";
import { patchChangeEmail } from "../../api/AuthController";

const ChangeEmail: React.FC = () => {
  const {
    setStatus,
    status: { hasError, isLoading, statusText },
  } = useStatus();

  const changeEmailHandler = async () => {
    setStatus({ isLoading: true, hasError: false, statusText: "" });
    const ChangeEmailData = {
      newEmail: formik.values.UEnewEmail,
      password: formik.values.UEpassword,
    };
    const result = await patchChangeEmail(ChangeEmailData);
    if (result.ok) formik.resetForm();
    setStatus({ isLoading: false, statusText: result.message, hasError: !result.ok });
  };
  const formik = useFormik({
    initialValues: {
      UEnewEmail: "",
      UEpassword: "",
    },
    validationSchema: emailPatchSchema,
    onSubmit: changeEmailHandler,
  });
  return (
    <>
      <Typography variant='h4' sx={{ my: 2 }}>
        Change Email {isLoading && <SnowSpinSM />}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          sx={{ marginBottom: "20px" }}
          fullWidth
          id='UEnewEmail'
          name='UEnewEmail'
          label='New Email'
          variant='outlined'
          color='primary'
          type='email'
          value={formik.values.UEnewEmail}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.UEnewEmail && Boolean(formik.errors.UEnewEmail)}
          helperText={formik.touched.UEnewEmail && formik.errors.UEnewEmail}
        />
        <TextField
          sx={{ marginBottom: "20px" }}
          fullWidth
          id='UEpassword'
          name='UEpassword'
          label='Current Password'
          type='password'
          variant='outlined'
          color='primary'
          value={formik.values.UEpassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.UEpassword && Boolean(formik.errors.UEpassword)}
          helperText={formik.touched.UEpassword && formik.errors.UEpassword}
        />
        <Button type='submit' variant='contained' color='info'>
          Change Email
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

export default ChangeEmail;
