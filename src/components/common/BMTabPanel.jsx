import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/system";
import { useState } from "react";
import { Badge, Stack, Typography } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const BMTabPanel = ({ tabs, children, onTabChange }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    onTabChange(newValue);
  };
  return (
    <>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          maxWidth: "100vw",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map(({ key, title, data }, index) => (
            <Tab
              key={key}
              label={
                <Stack direction="row" spacing={2}>
                  <Typography>{title}</Typography>{" "}
                  <Badge badgeContent={data.length} color="primary" />
                </Stack>
              }
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      {tabs.map(({ key }, index) => {
        return (
          <TabPanel key={key} value={value} index={index}>
            {children[value]}
          </TabPanel>
        );
      })}
    </>
  );
};

export default BMTabPanel;
