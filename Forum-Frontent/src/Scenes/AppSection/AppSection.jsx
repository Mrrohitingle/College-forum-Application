import { Box } from "@mui/material";
import Feed from "./Feed/Feed";
import LeftPanel from "./LeftPanel/LeftPanel";
import RightPanel from "./RightPanel/RightPanel";
import { useState } from "react";
export default function AppSection() {
  const [observer, setObserver] = useState(1);
  return (
    <Box
      sx={{
        height: "100%",
        display: { xs: "flex", sm: "grid" },
        gridTemplateColumns: "repeat(10,minmax(0,1fr))",
      }}
    >
      <LeftPanel />
      <Feed observer={observer} />
      <RightPanel setObserver={setObserver} />
    </Box>
  );
}
