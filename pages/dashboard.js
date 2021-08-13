import Head from 'next/head';
import React from 'react';
import axios from 'axios';
import UserProvider from 'src/context/UserProvider';
import DashboardComponent from 'src/components/Dashboard';

const Dashboard = ({ cities }) => {
  console.log(cities);
  return (
    <UserProvider>
      <Head>
        <title>Dashboard</title>
      </Head>
      <DashboardComponent />
    </UserProvider>
  );
};

export async function getServerSideProps() {
  const res = await axios.get(`http://localhost:3000/api/cities`)
  const { cities } = res.data;

  if (!cities) {
    return {
      notFound: true,
    }
  }

  return {
    props: { cities }, // will be passed to the page component as props
  }
}

export default Dashboard;