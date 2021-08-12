import Head from 'next/head';
import React from 'react';
import UserProvider from 'src/context/UserProvider';
import DashboardComponent from 'src/components/Dashboard';

const Dashboard = () => {
  return (
    <UserProvider>
      <Head>
        <title>Dashboard</title>
      </Head>
      <DashboardComponent />
    </UserProvider>
  );
};

export default Dashboard;