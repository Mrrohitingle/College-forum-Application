import { Box, Button, TextField, useTheme } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import AddThreadModel from "./AddThreadModel";
export default function AddThread({ setObserver }) {
  const [open, setOpen] = useState(false);

  const theme = useTheme();

  return (
    <Box>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        Add Thread
      </Button>
      <AddThreadModel setOpen={setOpen} open={open} setObserver={setObserver} />
    </Box>
  );
}

//<Box
//   sx={{
//     backgroundColor: theme.palette.background.alt,
//     p: 1.5,
//     px: 1.5,
//     borderRadius: 2,
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//   }}
// >
//   <TextField
//     placeholder="Add Thread"
//     sx={{ width: "100%" }}
//     onFocus={handleClickOpen}
//   />
//   <AddThreadModel setOpen={setOpen} open={open} />
// </Box>
