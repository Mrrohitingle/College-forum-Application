import { Box } from "@mui/material";
import AddThread from "../Widgets/AddThread";
import ProfileWidget from "../../../Components/Post/ProfileWidget";
import { useLocation } from "react-router-dom";
export default function SidePanel() {
  const location = useLocation();
  return (
    <Box
      sx={{
        gridColumn: "span 2",
        display: { xs: "none", sm: "flex" },
        flexDirection: "column",
        alignItems: "center",
        p: 2,
        gap: 4,
      }}
    >
      <AddThread />
      <ProfileWidget />
    </Box>
  );
}
