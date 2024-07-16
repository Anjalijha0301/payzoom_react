import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React from "react";
import { useState } from "react";
import AdminInMassegeView from "./AdminInMassegeView";
import AdminOutMassegeView from "./AdminOutMassegeView";
import AdminWebhookView from "./AdminWebhookView";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";

const AdminMessageView = () => {
  const authCtx = useContext(AuthContext);
  const user = authCtx?.user;
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="In Message" value="1" />
            {user?.id.toString() === "1" && (
              <Tab label="Out Message" value="2" />
            )}
            <Tab label="WebHook" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1" className="tab-panel">
          <AdminInMassegeView />
        </TabPanel>
        {user?.id.toString() === "1" && (
          <TabPanel value="2" className="tab-panel">
            <AdminOutMassegeView />
          </TabPanel>
        )}
        <TabPanel value="3" className="tab-panel">
          <AdminWebhookView />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default AdminMessageView;
