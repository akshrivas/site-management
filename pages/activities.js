import Head from "next/head";
import React from "react";
import UserProvider from "src/context/UserProvider";
import Actions from "src/components/Activities";
import MainHeader from "src/components/MainHeader";
import { Container } from "@mui/system";

const Dashboard = () => {
  return (
    <UserProvider>
      <Head>
        <title>Actions</title>
      </Head>
      <MainHeader />
      <Container>
        <Actions />
      </Container>
    </UserProvider>
  );
};

export default Dashboard;
