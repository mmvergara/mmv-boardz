import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { ThemeProvider } from "@mui/system";
import { Link } from "react-router-dom";
import { CrownTheme } from "../Style/Theme";
import { loginValidationSchema } from "./FormSchemas";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthSliceActions } from "../../state/AuthSlice";
import { ErrHandlingSliceActions } from "../../state/ErrHandlingSlice";
import { postLogin } from "../../api/AuthController";
import { useState } from "react";
const LoginIndex: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loginFormSubmitHandler = async () => {
    setIsLoading(true);
    const data = {
      email: formik.values.email,
      password: formik.values.password,
    };
    const result = await postLogin(data);
    if (result.ok && result.userData) {
      dispatch(AuthSliceActions.authLogin(result.userData));
      navigate("/");
      return;
    } else {
      dispatch(
        ErrHandlingSliceActions.showErr({
          errMessage: result.message,
          hasError: true,
          statusCode: String(result.statusCode),
        })
      );
    }
    setIsLoading(false);
  };
    const formik = useFormik({
      initialValues: {
        email: "salt2@gmail.com",
        password: "salt1234",
      },
      validationSchema: loginValidationSchema,
      onSubmit: loginFormSubmitHandler,
    });

  return (
    <ThemeProvider theme={CrownTheme}>
      <main>
        <div onClick={(e) => {}}></div>
        <Container maxWidth='sm'>
          <Box component='form' onSubmit={formik.handleSubmit} sx={{ marginTop: "5em" }}>
            <Typography variant='h2' align='center' color='InfoText' sx={{ marginBottom: "20px" }}>
              Login
            </Typography>
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
            <Button
              type='submit'
              variant='contained'
              size='large'
              sx={{ width: "100%", marginBottom: "20px" }}
            >
              {isLoading ? "Loggin in . . ." : "Login"}
            </Button>
            <Link to='/auth/register'>
              <Button variant='outlined' size='large' sx={{ width: "100%", marginBottom: "20px" }}>
                Register
              </Button>
            </Link>
          </Box>
          {isLoading &&
            "Backend is hosted for free by onRender.com logging in might take a while, service will speed up once the first response is received."}
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default LoginIndex;
