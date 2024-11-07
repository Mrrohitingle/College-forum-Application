import { Box, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

export default function ProfileWidget() {
  const user = useSelector((state) => state.user);
  const fullName = `${
    user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)
  } ${user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}`;
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 4,
        backgroundColor: theme.palette.background.alt,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        py: 2,
        boxShadow: `-3px 10px 66px -58px ${theme.palette.Text}`,
      }}
    >
      <img
        src={`http://localhost:3001/assets/${user.picturePath}`}
        style={{
          width: "96px",
          height: "96px",
          objectFit: "cover",
          borderRadius: "50%",
          boxShadow: `10px 10px 28px -20px  ${theme.palette.Text}`,
        }}
      />
      <Typography variant="h4">{fullName}</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <Typography>Followers : {user.followers.length}</Typography>
        <Typography>Threads : {user.threads.length}</Typography>
      </Box>
    </Box>
  );
}
