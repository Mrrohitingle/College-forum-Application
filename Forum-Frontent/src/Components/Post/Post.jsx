import {
  Avatar,
  Box,
  Divider,
  Typography,
  useTheme,
  Button,
} from "@mui/material";
import { gsap } from "gsap";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { ModeCommentRounded } from "@mui/icons-material";
const scale = ({ currentTarget }) => {
  gsap.to(currentTarget, { scale: 1.01, duration: 0.1, ease: "easeInOut" });
};
const descale = ({ currentTarget }) => {
  gsap.to(currentTarget, { scale: 1, duration: 0.1, ease: "easeInOut" });
};
const Post = forwardRef(({ thread }, ref) => {
  const theme = useTheme();

  const navigate = useNavigate();
  return (
    <Box
      sx={{
        borderRadius: 3,
        backgroundColor: theme.palette.background.alt,
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        boxShadow: `4px 4px 37px -30px  ${theme.palette.neutral.medium}`,
      }}
      onMouseEnter={scale}
      onMouseLeave={descale}
      ref={ref}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "space-around",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate(`/thread/${thread._id}`);
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "1.5rem",
            color: theme.palette.mode === "dark" ? "white" : "black",
          }}
        >
          {thread.title}
        </Typography>
        {thread.picturePath === "undefined" || thread.picturePath === "" ? (
          <Typography>{thread.body}</Typography>
        ) : (
          <img
            src={`http://localhost:3001/assets/${thread.picturePath}`}
            style={{ height: "20rem", objectFit: "cover" }}
          />
        )}
      </Box>

      <Divider sx={{ borderColor: theme.palette.Rosewater }} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {thread.user ? (
            <Avatar
              src={`http://localhost:3001/assets/${thread.user.picturePath}`}
            />
          ) : (
            <Avatar
              src={`http://localhost:3001/assets/${thread.subForum.picturePath}`}
            />
          )}
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography sx={{ color: theme.palette.neutral.main }}>
              Posted by
            </Typography>
            <Typography
              sx={{
                color: theme.palette.secondary.main,
                "&hover": {},
                cursor: "pointer",
              }}
              onClick={() => {
                thread.user
                  ? navigate(`/user/${thread.user._id}`)
                  : navigate(`/subforum/${thread.subForum._id}`);
              }}
            >
              {thread.user
                ? `${thread.user.firstName} ${thread.user.lastName}`
                : `${thread.subForum.name}`}
            </Typography>
          </Box>
        </Box>
        <Box sx={{}}>
          <Button startIcon={<ModeCommentRounded />}>
            {thread.comments.length}
          </Button>
        </Box>
      </Box>
    </Box>
    // </Link>
  );
});
export default Post;
