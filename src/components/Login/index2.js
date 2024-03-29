import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthProvider";
import * as yup from "yup";
import { useFormik } from "formik";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useStyles } from "./loginStyles";
import { LoadingButton } from "@mui/lab";
import BMAlert from "../common/BMAlert";
import Image from "next/image";
import logo from "public/icons/152.png";

export default function Login() {
  const classes = useStyles();
  const [user] = useState({
    email: "admin@homeo.com",
    password: "admin1234",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const router = useRouter();
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email.")
      .required("This field is required."),
    password: yup.string().required("This field is required."),
  });
  const { signInWithEmailAndPassword } = useAuth();
  const handleSubmit = (values) => {
    setLoading(true);
    signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        setLoading(false);
        router.push("/beds");
      })
      .catch((e) => {
        setMessage(e.message);
        setLoading(false);
      });
  };
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
            <Image src={logo} alt="Logo" />
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
            {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {loading ? (
                <CircularProgress
                  color="white"
                  style={{ height: "20px", width: "20px" }}
                />
              ) : (
                "Sign In"
              )}
            </Button> */}
            <LoadingButton
              loading={loading}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </LoadingButton>
          </form>
        </div>
        <BMAlert message={message} setMessage={setMessage} />
      </Container>
    </>
  );
}
