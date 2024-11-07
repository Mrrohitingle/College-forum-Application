import { Box, Typography, TextField, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setLogin } from "../../states/index.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const initialValuesLogin = {
  email: "",
  password: "",
};
const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});
export function Login(props) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const login = async (values, onSubmitProps) => {
    setIsLoading(true);
    const loginResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }).catch((x) => {
      setError("Unable To Connect To Server");
      setIsLoading(false);
    });
    const status = loginResponse.status;
    if (status == null) {
      setError("unable to connect to server");
    }

    if (status == 401) {
      setError("Invalid Credentials");
    }
    if (status == 404) {
      setError("User Not Found ");
    }
    const loggedIn = await loginResponse.json();
    if (loggedIn && status == 200) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        }),
      );
      onSubmitProps.resetForm();
      navigate("/home");
    }
    setIsLoading(false);
  };
  const theme = useTheme();
  const handleFormSubmit = async (values, onSubmitProps) => {
    await login(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesLogin}
      validationSchema={loginSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            backdropFilter: "blur(2px)",
            p: 2,
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: "2rem" }}>
              Welcome Back
            </Typography>
            <Typography sx={{ fontSize: "1rem" }}>
              Let's get started! Please enter your details.
            </Typography>
          </Box>

          <form onSubmit={handleSubmit} autoComplete="off">
            <Box display={"flex"} flexDirection="column" gap={"1rem"}>
              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  setError(null);
                }}
                autoComplete="false"
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                type="email"
              />
              <TextField
                label="password"
                inputProps={{ autoComplete: "off" }}
                type="password"
                name="password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  setError(null);
                }}
                value={values.password}
                error={
                  (Boolean(touched.password) && Boolean(errors.password)) ||
                  Boolean(error)
                }
                helperText={(touched.password && errors.password) || error}
              />
              <LoadingButton
                sx={{ fontSize: "1rem" }}
                type="submit"
                variant="outlined"
                loading={isLoading}
              >
                Signin
              </LoadingButton>
            </Box>
          </form>
          <Typography
            onClick={() => {
              props.setPageType("signup");
            }}
            sx={{
              textDecoration: "underline",
              color: theme.palette.primary.main,
              "&:hover": {
                cursor: "pointer",
                // color: theme.palette.primary.secondary,
                color: theme.palette.neutral.dark,
              },
            }}
          >
            Dont Have An Account? Sign Up Here
          </Typography>
        </Box>
      )}
    </Formik>
  );
}
