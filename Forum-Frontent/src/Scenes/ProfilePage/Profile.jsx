import {
  Box,
  CircularProgress,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import LeftPanel from "../AppSection/LeftPanel/LeftPanel";
import { useSelector } from "react-redux";
import ProfileContent from "./ProfileContent";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Profile() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const theme = useTheme();
  useEffect(() => {
    axios.get(`http://localhost:3001/u/${id}`).then((res) => {
      setUser(res.data);
      setIsLoading(false);
    });
  }, []);
  return user ? (
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
          backgroundColor: theme.palette.Crust,
          // opacity: 0.9,
        }}
      >
        {/* Banner */}
        <Box
          sx={{
            width: "100%",
            height: "10rem",
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
              src={`http://localhost:3001/assets/${user.picturePath}`}
              style={{
                outline: `6px solid ${theme.palette.background.default}`,
                width: "10rem",
                height: "10rem",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </Box>
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
            {user.firstName} {user.lastName}
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
            <Typography sx={{ fontSize: "1rem" }}>{user.department}</Typography>
            <Typography sx={{ fontSize: "1rem" }}>{user.year}</Typography>
            <Typography sx={{ fontWeight: "700", fontSize: "1rem" }}>
              {user.followers.length}{" "}
              <span style={{ fontWeight: "500" }}>Followers</span>
            </Typography>
            <Typography sx={{ fontSize: "1rem", fontWeight: "500" }}>
              {user.threads.length} Threads
            </Typography>
          </Box>
        </Box>
        {/* <Divider /> */}
        <ProfileContent user={user} />
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
