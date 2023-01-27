import Head from "next/head";
import React from "react";
import UserProvider from "src/context/UserProvider";
import MainHeader from "src/components/MainHeader";
import { Container } from "@mui/system";
import Profile from "src/components/Profile";

const Dashboard = () => {
  return (
    <UserProvider>
      <Head>
        <title>GST</title>
      </Head>
      <MainHeader />
      <Container>
        <Profile />
      </Container>
    </UserProvider>
  );
};

export default Dashboard;
