import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
export default function AddComment({ threadId, parentId, setObserver }) {
  const user = useSelector((state) => state.user);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const postComment = async (body, parentId = null) => {
    return axios
      .post(`http://localhost:3001/postComment`, {
        threadId: threadId,
        userId: user._id,
        parentId: parentId,
        content: body,
      })
      .then((res) => setStatus(res.status));
  };
  const handleSubmit = () => {
    if (newComment === "") {
      setError(true);
    } else {
      setStatus(-1);
      postComment(newComment, parentId);
    }
  };
  useEffect(() => {
    if (status == -1) {
      setLoading(true);
    } else {
      setLoading(false);
      setNewComment("");
    }
    if (status == 200) {
      setObserver((state) => state + 1);
    }
  }, [status]);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Typography>
        Comment as{" "}
        <span style={{ color: theme.palette.secondary.main }}>
          {user.firstName} {user.lastName}
        </span>
      </Typography>

      <Box>
        <TextField
          onFocus={() => {
            setError(false);
            setStatus(0);
          }}
          placeholder="Add Comment here"
          fullWidth
          error={error}
          helperText={error ? "Add Something Here" : null}
          multiline
          rows={4}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
      </Box>
      <Box display={"flex"} justifyContent={"flex-end"} sx={{ px: 2 }}>
        <LoadingButton
          variant="outlined"
          onClick={handleSubmit}
          loading={loading}
        >
          {status == 0 ? "Comment" : status == 200 ? "Done" : "Error"}
        </LoadingButton>
      </Box>
    </Box>
  );
}
