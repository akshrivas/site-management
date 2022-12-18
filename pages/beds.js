import Head from "next/head";
import React from "react";
import UserProvider from "src/context/UserProvider";
import Beds from "src/components/Beds";
import MainHeader from "src/components/MainHeader";

const Dashboard = () => {
  return (
    <UserProvider>
      <Head>
        <title>Beds</title>
      </Head>
      <MainHeader />
      <Beds />
    </UserProvider>
  );
};

export default Dashboard;
