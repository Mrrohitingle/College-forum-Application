import {
  Box,
  Typography,
  useTheme,
  IconButton,
  useMediaQuery,
  TextField,
  InputAdornment,
} from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { MenuOutlined } from "@mui/icons-material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMode } from "../../states";
import ProfileIcon from "./ProfileIcon";
import Search from "./Search";
function Navbar() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const mode = useSelector((state) => state.mode);
  const user = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const handleSearch = () => {};
  return (
    <>
      <Box
        sx={{
          backgroundColor: theme.palette.background.alt,
          px: 4,
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {
          <MenuOutlined
            sx={{ fontSize: "2rem", display: { xs: "block", sm: "none" } }}
            onClick={() => setIsOpen(!isOpen)}
          />
        }
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "2rem",
          }}
        >
          Forum
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "2vw",
            alignItems: "center",
          }}
        >
          <Search />
          <IconButton onClick={() => dispatch(setMode())}>
            {mode === "light" ? (
              <LightMode sx={{ fontSize: "1.5rem" }} />
            ) : (
              <DarkMode sx={{ fontSize: "1.5rem" }} />
            )}
          </IconButton>
          {isMobile ? null : <ProfileIcon picturePath={user.picturePath} />}
        </Box>
      </Box>
    </>
  );
}
export default Navbar;
