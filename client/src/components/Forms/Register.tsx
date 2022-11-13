import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { ThemeProvider } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import { CrownTheme } from "../Style/Theme";
import { useFormik } from "formik";
import { registerValidationSchema } from "./FormSchemas";
import { useDispatch } from "react-redux";
import { ErrHandlingSliceActions } from "../../state/ErrHandlingSlice";
import { putRegister } from "../../api/AuthController";

const RegisterIndex: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [successMsg, SetSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const registerSubmitHandler = async () => {
    setLoading(true);
    const data = {
      email: formik.values.email.toLowerCase(),
      username: formik.values.username,
      password: formik.values.password,
      confirmPassword: formik.values.confirmPassword,
    };
    const result = await putRegister(data);
    if (result.ok) {
      SetSuccessMsg("Register Successful Redirecting to login page...");
      formik.resetForm();
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    } else {
      dispatch(
        ErrHandlingSliceActions.showErr({
          errMessage: result.message,
          hasError: true,
          statusCode: String(result.statusCode),
        })
      );
    }
    setLoading(false);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: registerSubmitHandler,
  });

  return (
    <ThemeProvider theme={CrownTheme}>
      <main>
        <Container maxWidth='sm'>
          <Box component='form' onSubmit={formik.handleSubmit} sx={{marginTop:'5em'}}>
            <Typography variant='h2' align='center' color='InfoText' sx={{ marginBottom: "20px" }}>
              Register
            </Typography>
            {!!successMsg && (
              <b
                style={{
                  textAlign: "center",
                  width: "100%",
                  display: "block",
                  marginBottom: "20px",
                  color: "#0a9132",
                }}
              >
                {successMsg}
              </b>
            )}

            <TextField
              sx={{ marginBottom: "20px" }}
              fullWidth
              id='email'
              name='email'
              label='Email'
              type='email'
              variant='filled'
              color='primary'
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              sx={{ marginBottom: "20px" }}
              fullWidth
              id='username'
              name='username'
              label='Username'
              variant='filled'
              color='primary'
              value={formik.values.username}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              sx={{ marginBottom: "20px" }}
              fullWidth
              id='password'
              name='password'
              label='Password'
              type='password'
              variant='filled'
              color='primary'
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              sx={{ marginBottom: "20px" }}
              fullWidth
              id='confirmPassword'
              name='confirmPassword'
              label='Confirm Password'
              type='password'
              variant='filled'
              color='primary'
              value={formik.values.confirmPassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
            <Button
              type='submit'
              variant='contained'
              size='large'
              sx={{ width: "100%", marginBottom: "20px" }}
            >
              {loading ? "Loading..." : "Register"}
            </Button>
            <Link className='hoverWhite' to='/auth/login'>
              <Typography
                variant='h6'
                align='center'
                color='primary  '
                sx={{ width: "100%", color: "#0495bd", textDecoration: "overline" }}
              >
                Already have an account?
              </Typography>
            </Link>
          </Box>
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default RegisterIndex;
