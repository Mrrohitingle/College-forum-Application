import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import ThumbUpAltTwoToneIcon from "@mui/icons-material/ThumbUpAltTwoTone";
import { ModeCommentTwoTone } from "@mui/icons-material";
import { forwardRef } from "react";
import ModeCommentTwoToneIcon from "@mui/icons-material/ModeCommentTwoTone";
import { TreeItem, useTreeItem } from "@mui/lab";
import { useNavigate } from "react-router-dom";

const customComment = forwardRef(function customComment(props, ref) {
  const navigate = useNavigate();
  const theme = useTheme();
  const { label, nodeId } = props;
  const { handleExpansion, handleSelection, preventSelection } =
    useTreeItem(nodeId);
  const dontExpand = (event) => {
    preventSelection(event);
  };
  const Expand = (event) => {
    handleExpansion(event);
    handleSelection(event);
  };
  return (
    <Box
      ref={ref}
      onClick={dontExpand}
      sx={{
        backgroundColor: theme.palette.Base,
        border: `1px solid ${theme.palette.Rosewater}`,
        p: 1,
        px: 2,
        my: 2,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          // borderBottom: `1px solid red`,
        }}
      >
        <Avatar
          src={`http://localhost:3001/assets/${label.user.picturePath}`}
        />
        <Typography
          onClick={() => navigate(`/user/${label.user._id}`)}
          sx={{ cursor: "pointer" }}
        >
          {label.user.firstName} {label.user.lastName}
        </Typography>
      </Box>
      <Divider />
      <Box>
        <Typography>{label.content}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        {!label.parent && (
          <IconButton onClick={Expand}>
            <ModeCommentTwoToneIcon />
            <Typography>{label.child.length}</Typography>
          </IconButton>
        )}
      </Box>
    </Box>
  );
});
function Comment(props) {
  return <TreeItem ContentComponent={customComment} {...props} />;
}
export default Comment;
