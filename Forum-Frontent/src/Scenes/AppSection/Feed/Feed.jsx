import { Box, Divider, LinearProgress, useTheme } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Post from "../../../Components/Post/Post";
import axios from "axios";
export default function Feed({ observer, setObserver }) {
  const LIMIT = 10;
  const theme = useTheme();
  const { ref, inView } = useInView();
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    hasNextPage: true,
    currPage: 1,
    threads: [],
  });
  const fetchThreads = async () => {
    setIsLoading(true);
    axios
      .get(
        `http://localhost:3001/thread/getThreads?page=${state.currPage}&limit=${LIMIT}`,
      )
      .then((res) => {
        setState((state) => ({
          hasNextPage: res.data.hasNextPage,
          currPage: res.data.nextPage,
          threads: state.threads.concat(res.data.threads),
        }));
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchThreads();
  }, []);
  useEffect(() => {
    if (state.hasNextPage && inView) {
      fetchThreads();
    }
  }, [inView, state.hasNextPage]);
  return (
    <Box
      sx={{
        gridColumn: "span 6",
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        overflowY: "scroll",
        overflowClipMargin: "10px",
        borderLeft: `1px solid ${theme.palette.neutral.main}`,
        borderRight: `1px solid ${theme.palette.neutral.main}`,
      }}
    >
      {state.threads.map((thread, i) => {
        if (i == state.threads.length - 1)
          return <Post thread={thread} key={i} ref={ref} />;
        return <Post thread={thread} key={i} />;
      })}
      <Box sx={{ width: "100%" }}>
        {isLoading && <LinearProgress color="secondary" />}
      </Box>
      <Box sx={{ height: "5rem", width: "100%", p: 2 }}></Box>
    </Box>
  );
}
