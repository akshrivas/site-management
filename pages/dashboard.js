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

// export async function getServerSideProps() {
//   let userId = `dQ5UsfoCpYVed1NjeAJOXqx9lNt1`;
//   const res = await axios.get(`http://localhost:3002/api/users/${userId}`)
//   const { data } = res;

//   if (!data) {
//     return {
//       notFound: true,
//     }
//   }

//   return {
//     props: { data }, // will be passed to the page component as props
//   }
// }

export default Dashboard;