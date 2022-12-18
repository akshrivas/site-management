import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useStyles } from "./dashboardStyles";
import { useAuth } from "../../context/AuthProvider";
import Beds from "src/components/Beds";

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
      {value === index && (
        <Box p={1}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function Dashboard() {
  const classes = useStyles();

  const { signOut } = useAuth();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Button
          onClick={signOut}
          color="inherit"
          style={{ marginRight: "10px" }}
        >
          Logout
        </Button>
      </AppBar>
      <Beds style={{ height: "100%" }} />
    </div>
  );
}
