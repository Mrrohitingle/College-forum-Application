import { Box, Button, TextField, useTheme } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import AddThreadSubForumModel from "./AddThreadSubForumModel";
export default function AddThreadSubForum({ subForumId }) {
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
      <AddThreadSubForumModel
        setOpen={setOpen}
        open={open}
        subForumId={subForumId}
      />
    </Box>
  );
}
