import Head from "next/head";
import React from "react";
import LoginComponent from "src/components/Login";

const Login = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <LoginComponent />
    </>
  );
};

export default Login;
