import { styled } from "@mui/material/styles";
import {
  Button,
  Typography,
  Box,
  useTheme,
  TextField,
  DialogActions,
} from "@mui/material";
import {
  GroupAddTwoTone,
  Groups3TwoTone,
  EditTwoTone,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";
import CustomDialog from "./CustomDialog";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";
export default function JoinButton() {
  const theme = useTheme();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const handleCreateSubForum = () => {
    setIsCreateOpen(true);
  };
  const handleJoinSubForum = () => {
    setIsJoinOpen(true);
  };
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <CustomButton
          startIcon={<Groups3TwoTone />}
          onClick={handleJoinSubForum}
        >
          Join SubForum
        </CustomButton>
        <CustomButton
          startIcon={<GroupAddTwoTone />}
          onClick={handleCreateSubForum}
        >
          Create SubForum
        </CustomButton>
      </Box>
      <CreateSubForum open={isCreateOpen} setOpen={setIsCreateOpen} />
      <CustomDialog open={isJoinOpen} onClose={() => setIsJoinOpen(false)}>
        <Box
          sx={{
            width: "50rem",
            height: "30rem",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        ></Box>
      </CustomDialog>
    </>
  );
}
const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.background.alt,
  border: `1px solid transparent`,
  boxShadow: `${theme.palette.primary.main} 0px 0px 0px`,
  "&:hover": {
    backgroundColor: theme.palette.background.alt,
    border: `1px solid ${theme.palette.primary.main}`,
    boxShadow: `${theme.palette.primary.main} 0px 1px 2px`,
  },
}));

const CreateSubForum = ({ open, setOpen }) => {
  const [status, setStatus] = useState(null);
  const initialValue = {
    name: "",
    description: "",
    picture: "",
  };
  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is Required").min(5),
    description: yup.string(),
    picture: yup.string(),
  });
  const user = useSelector((state) => state.user);
  const handleFormSubmit = async (values, onSubmitProps) => {
    setStatus("LOADING");
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);
    formData.append("createdBy", user._id);

    const res = await fetch(`http://localhost:3001/subforum/createforum`, {
      method: "POST",
      body: formData,
    }).catch((err) => setStatus("ERROR"));
    // const res = axios
    //   .post("http://localhost:3001/subforum/createforum", { formData })
    //   .then((res) => res.status)
    //   .catch((err) => {
    //     setStatus("ERROR");
    //     console.log("wth");
    //   });
    if (res.status === 200) {
      setStatus("SUCCESS");
    } else {
      setStatus("ERROR");
    }
  };
  const theme = useTheme();
  console.log(status);
  return (
    <CustomDialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      maxWidth={"50rem"}
      fullScreen={fullScreen}
    >
      <Box
        sx={{
          width: "50rem",
          height: "30rem",
          p: 2,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          gap: 2,
        }}
      >
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValue}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box>
                  <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                    Name Of Forum
                  </Typography>
                  <TextField
                    name="name"
                    size="small"
                    placeholder="Enter Name"
                    fullWidth
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.name) && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                    Description
                  </Typography>
                  <TextField
                    multiline
                    rows={"4"}
                    name="description"
                    size="small"
                    placeholder="Description Your Subforum"
                    fullWidth
                    value={values.about}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.about) && Boolean(errors.about)}
                    helperText={touched.about && errors.about}
                  />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: 15, fontWeight: 600, pb: 2 }}>
                    Profile Picture
                  </Typography>
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
                              }}
                            >
                              <Typography>{values.picture.name}</Typography>
                              <EditTwoTone />
                            </Box>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
                </Box>
                <DialogActions>
                  <LoadingButton
                    type="submit"
                    variant="outlined"
                    loading={status === "LOADING"}
                  >
                    {status === "ERROR" ? "Error" : "Create Subforum"}
                  </LoadingButton>
                </DialogActions>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </CustomDialog>
  );
};
