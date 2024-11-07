import { SearchOutlined } from "@mui/icons-material";
import {
  Box,
  Typography,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Dialog,
  TextField,
  Divider,
} from "@mui/material";
import CustomDialog from "../../Components/CustomDialog";
import { useState } from "react";
import UserListItem from "./UserListItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSearchModal } from "../../states";
const SearchModal = () => {
  const open = useSelector((state) => state.searchModal);
  console.log(open);
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [res, setRes] = useState([]);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleChange = (e) => {
    if (e.target.value === "") {
      return setRes([]);
    }
    axios
      .get(`http://localhost:3001/u/search/${e.target.value}`)
      .then((res) => res.data)
      .then((res) => setRes(res.user));
  };
  return (
    <CustomDialog
      open={open}
      onClose={() => {
        dispatch(setSearchModal());
        setRes([]);
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
          gap: 2,
        }}
      >
        <TextField
          sx={{ width: "100%" }}
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment>
                <Box
                  sx={{
                    border: `1px solid ${theme.palette.secondary.main}`,
                    px: 0.7,
                    textTransform: "lowercase",
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 400,
                      // fontFamily: theme.typography.fontFamily,
                    }}
                  >
                    esc
                  </Typography>
                </Box>
              </InputAdornment>
            ),
          }}
          autoFocus
          onChange={handleChange}
        />
        <Divider />
        <Box
          sx={{
            // border: `1px solid ${theme.palette.Blue}`,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            borderRadius: 2,
            overflow: "scroll",
          }}
        >
          {res.map((item) => (
            <UserListItem
              user={item}
              key={item._id}
              handleClick={() => {
                dispatch(setSearchModal());
                navigate(`/user/${item._id}`);
              }}
            />
          ))}
          {res.length == 0 && (
            <Typography
              sx={{ textAlign: "center", fontSize: 20, fontWeight: 600 }}
            >
              No User Found....
            </Typography>
          )}
        </Box>
      </Box>
    </CustomDialog>
  );
};

export default SearchModal;
