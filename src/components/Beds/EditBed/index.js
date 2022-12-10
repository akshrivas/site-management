import React, { useState } from 'react';
import axios from 'axios';
import { useStyles } from './editBedStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useFormik } from 'formik';
import useUid from 'src/utils/useUid';
import { urlConstants } from 'src/config';
import UpsertBed from '../UpsertBed';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function EditBed({ open, handleEditClose, selectedBed }) {
  const classes = useStyles();
  const uid = useUid();
  const [saving, setSaving] = useState(false);
  
  
  const formik = useFormik({
    initialValues: {...selectedBed},
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  if(!selectedBed) return null;
  

  const handleSubmit = (values) => {
    axios
      .put(`${urlConstants.bedOps}/${selectedBed.id}`, {
        ...values,
        userId: uid,
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
            edge='start'
            color='inherit'
            onClick={handleEditClose}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Edit Bed
          </Typography>
          <Button autoFocus color='inherit' onClick={formik.handleSubmit}>
            {saving ? (
              <CircularProgress
                color='white'
                style={{ height: '20px', width: '20px' }}
              />
            ) : (
              'Save'
            )}
          </Button>
        </Toolbar>
      </AppBar>
      <UpsertBed handleSubmit={handleSubmit} formik={formik} />
    </Dialog>
  );
}
