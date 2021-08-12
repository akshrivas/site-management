import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '../src/Link';

function Index() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Homeo App
        </Typography>
        <Link href="/login" color="secondary">
          You're being redirected to login page
        </Link>
      </Box>
    </Container>
  );
}

export async function getStaticProps() {
  return {
    redirect: {
      permanent: false,
      destination: "/login"
    }
  }
}

export default Index;