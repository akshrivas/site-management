import Head from "next/head";
import React from "react";
import UserProvider from "src/context/UserProvider";
import Beds from "src/components/Beds";
import MainHeader from "src/components/MainHeader";
import LeftMenu from "src/components/LeftMenu";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  main: {
    width: "100%",
    minHeight: "100vh",
    border: "solid 1px red",
    backgroundColor: theme.palette.background.paper,
  },
  leftContainer: {
    border: {
      xs: "solid 1px yellow",
    },
  },
  container: {
    padding: 5,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  return (
    <UserProvider>
      <Head>
        <title>Beds</title>
      </Head>
      <MainHeader />
      <Grid container className={classes.main}>
        <Grid item xs={3}>
          <LeftMenu />
        </Grid>
        <Grid xs={9} className={classes.container}>
          <Beds />
        </Grid>
      </Grid>
    </UserProvider>
  );
};

export default Dashboard;
