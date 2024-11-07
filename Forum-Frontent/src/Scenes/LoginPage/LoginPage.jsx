import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../../states";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Login } from "./Login";
import Signup from "./SignUp";
import { useEffect } from "react";
export default function LoginPage() {
  const [pageType, setPageType] = useState("login");
  const isMobile = useMediaQuery("(max-width:600px)");
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user) != null ? true : false;
  const navigate = useNavigate();
  const theme = useTheme();
  useEffect(() => {
    if (isAuth) {
      navigate("/home");
    }
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100dvh",
        width: "100%",
        px: 2,
        alignItems: "center",
        gap: pageType === "login" ? "5rem" : "0rem",
        // justifyContent: "space-between",
      }}
    >
      <Box
        component={"header"}
        sx={{
          py: 3,
          px: 3,
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Typography
          fontWeight={700}
          fontSize={"2rem"}
          color={theme.palette.primary.main}
        >
          Forum
        </Typography>
        <IconButton onClick={() => dispatch(setMode())}>
          {theme.palette.mode === "dark" ? (
            <DarkMode sx={{ fontSize: "25px" }} />
          ) : (
            <LightMode sx={{ fontSize: "25px" }} />
          )}
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: "2rem",
          flexDirection: "column",
          width: isMobile ? "90%" : pageType === "signup" ? "50%" : "40%",
        }}
      >
        {pageType === "login" ? (
          <Login setPageType={setPageType} />
        ) : (
          <Signup setPageType={setPageType} />
        )}
      </Box>
    </Box>
  );
}
