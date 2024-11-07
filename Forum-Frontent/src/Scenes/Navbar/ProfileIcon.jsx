import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setLogout } from "../../states";
import { useState } from "react";

export default function ProfileIcon(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Avatar
        src={`http://localhost:3001/assets/${props.picturePath}`}
        onClick={handleClick}
        sx={{
          cursor: "pointer",
        }}
      />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            backgroundColor: theme.palette.background.main,
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            dispatch(setLogout());
          }}
        >
          <ListItemIcon>
            <Logout fontSize="2rem" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
