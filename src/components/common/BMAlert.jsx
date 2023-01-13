import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BMAlert = ({ message, setMessage, success }) => {
  return (
    <Snackbar
      open={Boolean(message)}
      autoHideDuration={2000}
      onClose={() => setMessage("")}
    >
      <Alert
        onClose={() => setMessage("")}
        severity={success ? "success" : "error"}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default BMAlert;
