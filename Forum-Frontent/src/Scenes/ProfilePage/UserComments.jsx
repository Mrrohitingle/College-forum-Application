import { Box } from "@mui/material";
import CommentCard from "../Thread/CommentCard";
export default function UserComments({ user }) {
  const userComments = user.comments.map((comment) => {
    comment.user = user;
    return comment;
  });
  console.log(userComments);
  return (
    <Box>
      {userComments.map((comment) => (
        <CommentCard label={comment} key={comment._id} />
      ))}
      {userComments.length == 0 ? <h1>No Comments</h1> : null}
    </Box>
  );
}
