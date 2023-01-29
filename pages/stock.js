import Head from "next/head";
import React from "react";
import UserProvider from "src/context/UserProvider";
import MainHeader from "src/components/MainHeader";
import { Container } from "@mui/system";
import Stock from "src/components/Stock";

const Dashboard = () => {
  return (
    <UserProvider>
      <Head>
        <title>Stock</title>
      </Head>
      <MainHeader />
      <Container>
        <Stock />
      </Container>
    </UserProvider>
  );
};

export default Dashboard;
