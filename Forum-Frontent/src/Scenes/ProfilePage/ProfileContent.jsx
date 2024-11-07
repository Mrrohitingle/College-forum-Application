import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import UserThreads from "./UserThreads";
import UserComments from "./UserComments";

export default function ProfileContent({ user }) {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%", px: 2 }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} fullWidth>
            <Tab label="Threads" value="1" />
            <Tab label="Comments" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <UserThreads user={user} />
        </TabPanel>
        <TabPanel value="2">
          <UserComments user={user} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
