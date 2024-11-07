import { Box, CircularProgress } from "@mui/material";
import Post from "../../Components/Post/Post";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LeftPanel from "../AppSection/LeftPanel/LeftPanel";

export default function SavedThread() {
  const user = useSelector((state) => state.user);
  const [threads, setThreads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/getsavedThread/${user._id}`)
      .then((res) => {
        setThreads(res.data.saved);
        setIsLoading(false);
      });
  }, []);
  return (
    <Box
      sx={{
        height: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(10,minmax(0,1fr))",
      }}
    >
      <LeftPanel />
      {isLoading ? (
        <Box
          sx={{
            width: "100%",
            hieght: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gridColumn: "span 8",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            gridColumn: "span 8",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            overflowY: "scroll",
          }}
        >
          {threads &&
            threads.map((thread) => <Post thread={thread} key={thread._id} />)}
          <Box sx={{ height: "5rem", width: "100%", p: 5 }}></Box>
        </Box>
      )}
    </Box>
  );
}
