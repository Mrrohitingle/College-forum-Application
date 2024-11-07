import { TextField, Autocomplete, Button, MenuItem } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";
import { Formik } from "formik";
import { EditOutlined } from "@mui/icons-material";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import Select from "@mui/material/Select";

export default function Signup(props) {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)");
  const Dept = [
    "Computer",
    "IT",
    "ECE",
    "Electrical",
    "Civil",
    "Mechanical",
    "Mechatronics",
    "Structural",
  ];
  const Year = ["FY", "SY", "TY", "B.Tech"];
  const signup = async (values, onSubmitProps) => {
    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);
    console.log(formData);

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      },
    );

    if (savedUserResponse.status == 403) {
      setError("Email is already in use");
      setIsLoading(false);
      return;
    }
    const savedUser = await savedUserResponse.json();
    console.log(savedUser);
    onSubmitProps.resetForm();

    if (savedUser && savedUserResponse.status == 201) {
      props.setPageType("login");
    }
    setIsLoading(false);
  };
  const handleFormSubmit = async (values, onSubmitProps) => {
    await signup(values, onSubmitProps);
  };
  const initialValueRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    picture: "",
    department: "Computer",
    year: "FY",
  };
  const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required").min(5, "Too Short"),
    picture: yup.string().required("required"),
    department: yup.string().required("required"),
    year: yup.string().required("required"),
  });
  return (
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
          Welcome To Forum
        </Typography>
      </Box>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValueRegister}
        validationSchema={registerSchema}
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
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "grid",
                gap: "30px",
                gridTemplateColumns: "repeat(4,minmax(0,1fr))",
                "& >div": {
                  gridColumn: isMobile ? "span 4" : undefined,
                },
              }}
            >
              <TextField
                label="First Name"
                name="firstName"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                sx={{
                  gridColumn: "span 2",
                }}
              />
              <TextField
                label="Last Name"
                name="lastName"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                sx={{
                  gridColumn: "span 2",
                }}
              />
              <TextField
                label="Email"
                name="email"
                onChange={(e) => {
                  handleChange(e);
                  setError(null);
                }}
                onBlur={handleBlur}
                value={values.email}
                sx={{
                  gridColumn: "span 4",
                }}
                error={
                  (Boolean(touched.email) && Boolean(errors.email)) ||
                  Boolean(error)
                }
                helperText={(touched.email && errors.email) || error}
              />
              <Select
                sx={{
                  gridColumn: "span 2",
                }}
                name="department"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.department}
                disablePortal
                error={
                  Boolean(touched.department) && Boolean(errors.department)
                }
                helperText={touched.department && errors.department}
              >
                {Dept.map((dept) => (
                  <MenuItem value={dept}>{dept}</MenuItem>
                ))}
              </Select>
              <Select
                sx={{
                  gridColumn: "span 2",
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.year}
                name="year"
                error={Boolean(touched.year) && Boolean(errors.year)}
                helperText={touched.year && errors.year}
              >
                {Year.map((year) => (
                  <MenuItem value={year}>{year}</MenuItem>
                ))}
              </Select>
              <TextField
                id="outlined-adornment-password"
                label="Password"
                name="password"
                type={"password"}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{
                  gridColumn: "span 4",
                }}
              />
              <Box
                gridColumn={"span 4 "}
                border={`1px solid ${theme.palette.neutral.medium}`}
                borderRadius={"5px"}
                p="1rem"
              >
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) =>
                    setFieldValue("picture", acceptedFiles[0])
                  }
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box
                      {...getRootProps()}
                      border={`2px dashed ${theme.palette.primary.main}`}
                      p="1rem"
                      sx={{
                        "& hover": { cursor: "pointer" },
                      }}
                    >
                      <input {...getInputProps()} />
                      {!values.picture ? (
                        <p>Add Picture Here</p>
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            // alignItems: "center",
                          }}
                        >
                          <Typography>{values.picture.name}</Typography>
                          <EditOutlined />
                        </Box>
                      )}
                    </Box>
                  )}
                </Dropzone>
              </Box>
              <LoadingButton
                loading={isLoading}
                sx={{ fontSize: "1rem", gridColumn: "span 4" }}
                variant="outlined"
                type="submit"
              >
                Signin
              </LoadingButton>
            </Box>
          </form>
        )}
      </Formik>
      <Typography
        onClick={() => {
          props.setPageType("login");
          resetForm();
        }}
        sx={{
          textDecoration: "underline",
          color: theme.palette.primary.main,
          "&:hover": {
            cursor: "pointer",
            color: theme.palette.neutral.dark,
          },
        }}
      >
        Already Have An Account? SignIn Here
      </Typography>
      <Box sx={{ height: "5rem" }}></Box>
    </Box>
  );
}
