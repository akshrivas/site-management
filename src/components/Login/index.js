import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthProvider';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from './loginStyles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



export default function Login() {
  const classes = useStyles();
  const [user] = useState({
    email: 'admin@homeo.com',
    password: 'admin1234'
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Enter a valid email.')
      .required('This field is required.'),
    password: yup
      .string()
      .required('This field is required.')
  });
  const { signInWithEmailAndPassword } = useAuth();
  const handleSubmit = (values) => {
    setLoading(true);
    signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        // setLoading(false);
        router.push('/dashboard');
      })
      .catch(() => {
        setLoading(false);
      });
  }
  const formik = useFormik({
    initialValues: { ...user },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  return (
    <>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              // autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              // autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {
                loading ?
                <CircularProgress color="white" style={{ height: '20px', width: '20px' }} />
                : 'Sign In'
              }
            </Button>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
