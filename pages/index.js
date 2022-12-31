import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/Link';

function Index() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Homeo App
        </Typography>
        <Link href="/login" color="secondary">
          You are being redirected to login page
        </Link>
      </Box>
    </Container>
  );
}

export async function getServerSideProps() {
  return {
    redirect: {
      permanent: false,
      destination: "/login"
    }
  }
}

export default Index;