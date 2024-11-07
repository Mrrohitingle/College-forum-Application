import { Box } from "@mui/material";
import Post from "../../Components/Post/Post";
export default function UserThreads({ user }) {
  const userThread = user.threads.map((thread) => {
    thread.user = user;
    return thread;
  });
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {userThread.map((thread) => (
        <Post thread={thread} key={thread._id} />
      ))}
    </Box>
  );
}
