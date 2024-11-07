import { Avatar, Box, Typography, useTheme, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
const UserListItem = ({ user, handleClick }) => {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          p: 2,
          alignItems: "center",
          gap: 2,
          cursor: "pointer",
          borderRadius: 2,
          border: `1px solid #00000000`,
          transition: "all 0.1s ease-out",
          "&:hover": {
            border: `1px solid ${theme.palette.Red}`,
            backgroundColor: theme.palette.background.alt,
            boxShadow: theme.boxShadow.alt,
          },
        }}
        onClick={handleClick}
      >
        <Avatar
          src={`http://localhost:3001/assets/${user.picturePath}`}
          sx={{ width: 40, height: 40 }}
        />
        <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
          {user.firstName} {user.lastName}
        </Typography>
      </Box>
      <Divider />
    </>
  );
};

export default UserListItem;
