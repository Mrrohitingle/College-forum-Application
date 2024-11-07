import { styled } from "@mui/material/styles";
import { Dialog } from "@mui/material";

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    // backgroundColor: "red",
  },

  "& .MuiPaper-elevation": {
    backgroundColor: theme.palette.background.default,
    backgroundImage: "none !important",
  },
  "& .MuiModal-backdrop": {
    // backgroundColor: "transparent",

    backdropFilter: "blur(2px)",
  },
}));

export default CustomDialog;
