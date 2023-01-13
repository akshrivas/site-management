import React, { useState } from "react";
import axios from "axios";
import { useStyles } from "./editBedStyles";
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
import validationSchema from "../bedSchema";
import useSite from "src/hooks/useSite";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditBed({ open, handleEditClose, selectedBed }) {
  const classes = useStyles();
  const uid = useUid();
  const [saving, setSaving] = useState(false);
  const site = useSite();

  const formik = useFormik({
    initialValues: selectedBed,
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  if (!selectedBed) return null;

  const handleSubmit = (values) => {
    axios
      .put(`${urlConstants.bedOps}/${selectedBed.id}`, {
        userId: uid,
        site,
        data: values,
      })
      .then((response) => {
        setSaving(false);
        if (response.status === 200) {
          handleEditClose();
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
      onClose={handleEditClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleEditClose}
            aria-label="close"
            size="large"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Edit Bed
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
      <UpsertBed
        handleSubmit={handleSubmit}
        formik={formik}
        action="Edit"
        initialValues={formik.initialValues}
      />
    </Dialog>
  );
}
