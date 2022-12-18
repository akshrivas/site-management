import React from "react";
import { useStyles } from "./dashboardStyles";
import Beds from "src/components/Beds";

export default function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Beds style={{ height: "100%" }} />
    </div>
  );
}
