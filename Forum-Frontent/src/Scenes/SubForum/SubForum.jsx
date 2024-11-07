import {
  Box,
  CircularProgress,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import LeftPanel from "../AppSection/LeftPanel/LeftPanel";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Post from "../../Components/Post/Post";
import AddThreadSubForum from "../AppSection/Widgets/AddThreadSubForum";
export default function Subforum() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [subForum, setsubForum] = useState();
  const theme = useTheme();
  const showAddThread = subForum?.createdBy?._id == user._id;
  console.log(subForum);
  useEffect(() => {
    setIsLoading(true);
    setsubForum(null);
    axios.get(`http://localhost:3001/subforum/${id}`).then((res) => {
      setsubForum(res.data.subForum);
      setIsLoading(false);
    });
  }, [id]);
  return subForum ? (
    <Box
      sx={{
        height: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(10,minmax(0,1fr))",
      }}
    >
      <LeftPanel />
      <Box
        sx={{
          gridColumn: "span 8",
          overflowY: "scroll",
          backgroundColor: theme.palette.Mantle,
        }}
      >
        {/* Banner */}
        <Box
          sx={{
            width: "100%",
            height: "10rem",
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: theme.palette.Teal,
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              position: "relative",
              bottom: "-50%",
              left: "5%",
              maxWidth: "min-content",
            }}
          >
            <img
              src={`http://localhost:3001/assets/${subForum.picturePath}`}
              style={{
                outline: `6px solid ${theme.palette.background.default}`,
                width: "10rem",
                height: "10rem",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </Box>
          {showAddThread && (
            <Box sx={{ position: "relative", bottom: "-110%", right: "5%" }}>
              <AddThreadSubForum subForumId={id} />
            </Box>
          )}
        </Box>
        {/* Banner End */}

        <Box
          sx={{
            position: "relative",
            mt: "5rem",
            display: "flex",
            flexDirection: "column",
            pt: 2,
            pl: 5,
          }}
        >
          <Typography sx={{ fontWeight: 500, fontSize: "2rem" }}>
            {subForum.name}
          </Typography>
          <Box
            sx={{
              display: "grid",
              maxWidth: "max-content",
              gap: 1,
              gridTemplateColumns: "repeat(2,minmax(0,1fr))",
              color: theme.palette.neutral.main,
              mb: 5,
            }}
          >
            <Typography sx={{ fontSize: "1rem", gridColumn: "span 2" }}>
              {subForum.description}
            </Typography>
            <Typography sx={{ fontWeight: "700", fontSize: "1rem" }}>
              {subForum.followers.length}{" "}
              <span style={{ fontWeight: "500" }}>Followers</span>
            </Typography>
            <Typography sx={{ fontSize: "1rem", fontWeight: "500" }}>
              {subForum.threads.length} Threads
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          {/* <Typography sx={{ fontSize: "1.2rem", fontWeight: 500 }}>
            Threads
          </Typography> */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {subForum.threads.length == 0 ? (
              <h1>No Threads</h1>
            ) : (
              subForum.threads.map((thread) => (
                <Post thread={thread} key={thread._id} />
              ))
            )}
          </Box>
        </Box>
        <Box sx={{ width: "100%", hieght: 5, p: 5 }}></Box>
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        hieght: "100vh",
        justifyContent: "center",
        alignItem: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
