import Head from 'next/head';
import React from 'react';
import DashboardComponent from 'src/components/Dashboard';

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <DashboardComponent />
    </>
  );
};

export default Dashboard;