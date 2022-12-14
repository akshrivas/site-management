import React, { useState } from "react";
import axios from "axios";
import { useStyles } from "./addBedStyles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import CircularProgress from "@mui/material/CircularProgress";
import { useFormik } from "formik";
import useUid from "src/utils/useUid";
import { urlConstants } from "src/config";
import UpsertBed from "../UpsertBed";
import validationSchema, { initialValues } from "../bedSchema";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddBed({ open, handleClose, bedNumber }) {
  const classes = useStyles();
  const uid = useUid();
  const [saving, setSaving] = useState(false);

  const formik = useFormik({
    initialValues: {
      ...initialValues,
      bedNumber,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    axios
      .post(urlConstants.bedOps, {
        data: {
          ...values,
          userId: uid,
        },
      })
      .then((response) => {
        setSaving(false);
        if (response.data.id) {
          handleClose();
        }
      })
      .catch(() => {
        setSaving(false);
      });
  };
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            size="large"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Add Bed
          </Typography>
          <Button autoFocus color="inherit" onClick={formik.handleSubmit}>
            {saving ? (
              <CircularProgress
                color="white"
                style={{ height: "20px", width: "20px" }}
              />
            ) : (
              "Save"
            )}
          </Button>
        </Toolbar>
      </AppBar>
      <UpsertBed handleSubmit={handleSubmit} formik={formik} action="add" />
    </Dialog>
  );
}
