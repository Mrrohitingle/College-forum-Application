import * as React from "react";
import { styled } from "@mui/material/styles";
import { Button, ButtonBase, useTheme } from "@mui/material";
// const _theme = useTheme();
const CustomButton = styled(Button)(({ theme }) => ({
  height: 20,
  // backgroundColor: theme.palette.primary.main,
  border: `1px solid ${theme.palette.primary.main}`,
  color: theme.palette.text.primary,
  padding: "1rem 1rem",
  gap: 2,
  // backgroundColor: "red",
  "&:hover, &.Mui-focusVisible": {
    boxShadow: theme.boxShadow.main,
    // backgroundColor: theme.palette.primary.main,
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.8,
      // backgroundColor: "red",
    },
    "& .MuiImageMarked-root": {
      opacity: 0.7,
    },
  },
}));
export default CustomButton;
