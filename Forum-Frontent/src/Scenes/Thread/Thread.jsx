import { Box, useTheme } from "@mui/material";
import LeftPanel from "../AppSection/LeftPanel/LeftPanel";
import ThreadSection from "./ThreadSection";
import RightPanel from "../AppSection/RightPanel/RightPanel";
export default function Thread() {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          height: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(10,minmax(0,1fr))",
        }}
      >
        <LeftPanel />
        <ThreadSection />
        <RightPanel />
      </Box>
    </>
  );
}
