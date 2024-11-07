import {
  Box,
  List,
  Typography,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  useTheme,
  Divider,
  Avatar,
  styled,
} from "@mui/material";
import {
  HomeTwoTone,
  ChatTwoTone,
  BookmarksTwoTone,
} from "@mui/icons-material";
import { ChatBubbleOutlineOutlined } from "@mui/icons-material";
import ForumTwoToneIcon from "@mui/icons-material/ForumTwoTone";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import JoinButton from "../../../Components/JoinGroupButton";
export default function SidePanel() {
  const user = useSelector((state) => state.user);
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = [
    theme.palette.Maroon,
    theme.palette.Peach,
    theme.palette.Sky,
    theme.palette.Yellow,
    theme.palette.Pink,
    theme.palette.Lavender,
  ];
  const subForums = useSelector((state) => state.user.joinedSubForum);
  const iconStyle = { fontSize: "1.4rem", color: theme.palette.Lavender };

  const listItems = [
    {
      label: "Home",
      icon: <HomeTwoTone sx={iconStyle} />,
      function: () => {
        navigate("/home");
      },
    },
    {
      label: "My Threads",
      icon: <ForumTwoToneIcon sx={iconStyle} />,
      function: () => {
        navigate(`/user/${user._id}`);
      },
    },
    {
      label: "Saved Threads",
      icon: <BookmarksTwoTone sx={iconStyle} />,
      function: () => {
        navigate("/saved");
      },
    },
  ];
  return (
    <Box
      sx={{
        height: "100%",
        gridColumn: "span 2",
        backgroundColor: "transparent",
      }}
    >
      <Box>
        <List>
          {listItems.map((item, i) => (
            <ListItem key={i} sx={{ width: "100%" }}>
              <ListItemButton
                sx={{
                  borderRadius: 3,
                  backgroundColor: theme.palette.Base,
                }}
                onClick={item.function}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 500,
                    }}
                  >
                    {item.label}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontSize: 20, fontWeight: 600, textAlign: "center", p: 1 }}
          >
            Sub Forums
          </Typography>
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              p: 2,
              gap: 1,
            }}
          >
            {subForums.length == 0 ? (
              <Typography
                sx={{
                  textAlign: "center",
                  p: 2,
                  color: theme.palette.text.disabled,
                  fontStyle: "italic",
                }}
              >
                You Havent Joined Any SubForum Yet
              </Typography>
            ) : (
              subForums.map((subforum) => (
                <CustomListItem
                  onClick={() => navigate(`/subforum/${subforum._id}`)}
                >
                  <ListItemIcon>
                    <Avatar
                      src={`http://localhost:3001/assets/${subforum.picturePath}`}
                    />
                  </ListItemIcon>

                  {subforum.name}
                </CustomListItem>
              ))
            )}
          </List>
          <JoinButton />
        </Box>
      </Box>
    </Box>
  );
}
const CustomListItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: theme.palette.background.alt,
  padding: 5,
  borderRadius: 7,
  border: `1px solid transparent`,
  color: theme.palette.text.main,
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: `${theme.palette.Peach} 0px 0px 0px`,
  "&:hover": {
    backgroundColor: theme.palette.background.alt,
    border: `1px solid ${theme.palette.neutral.dark}`,
    boxShadow: `${theme.palette.neutral.medium}  1px 2px 1px`,
  },
}));
