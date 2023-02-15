/* eslint-disable no-undef */
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
import { useFormik } from "formik";
import useUid from "src/utils/useUid";
import { urlConstants } from "src/config";
import UpsertBed from "../UpsertBed";
import validationSchema, { initialValues } from "../bedSchema";
import useSite from "src/hooks/useSite";
import PageSpinner from "src/components/PageSpinner";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddBed({ open, handleClose, bedNumber, type }) {
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
  const site = useSite();
  const handleSubmit = async (values) => {
    setSaving(true);
    if (type === "single") {
      axios
        .post(`${urlConstants.bedOps}`, {
          userId: uid,
          site,
          data: values,
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
    } else {
      const promises = [];
      for (let i = 0; i < values.bedCount; i++) {
        const a = {
          ...values,
          bedNumber: values.bedNumber + i,
        };
        const promise = axios.post(`${urlConstants.bedOps}`, {
          userId: uid,
          site,
          data: a,
        });
        promises.push(promise);
      }
      try {
        const responses = await Promise.all(promises);
        setSaving(false);
        for (const response of responses) {
          if (!response.data.id) {
            return handleClose();
          }
        }
        return handleClose();
      } catch (error) {
        return handleClose();
      }
    }
  };

  const loading = saving && open;

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
            Save
          </Button>
        </Toolbar>
      </AppBar>
      {loading && <PageSpinner />}
      {!loading && <UpsertBed formik={formik} type={type} />}
    </Dialog>
  );
}
