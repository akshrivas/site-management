import Head from "next/head";
import React from "react";
import UserProvider from "src/context/UserProvider";
import Beds from "src/components/Beds";
import MainHeader from "src/components/MainHeader";
import { Container } from "@mui/system";

const Dashboard = () => {
  return (
    <UserProvider>
      <Head>
        <title>Beds</title>
      </Head>
      <MainHeader />
      <Container>
        <Beds />
      </Container>
    </UserProvider>
  );
};

export default Dashboard;
