import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useStyles } from './addofferStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import * as yup from 'yup';
import { useFormik } from 'formik';
import useUid from 'src/utils/useUid';
import storage from 'src/utils/storage';
import { urlConstants } from 'src/config';
import useCategories from 'src/components/Category/useCategories';
import useGroups from 'src/components/Category/GroupList/useGroups';
import useProducts from './useProducts';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function AddOffer({ open, handleClose, activeOffer }) {
  const classes = useStyles();
  const uid = useUid();
  const [categoryId, setCategoryId] = useState(null);
  const [offer, setOffer] = useState({
    title: '',
    term: '',
    startDate: '',
    endDate: '',
    image: '',
    active: true,
  });
  useEffect(() => {
    if (activeOffer) {
      formik.setValues({ ...activeOffer, itemName: activeOffer.itemId }, false);
    } else {
      formik.setValues({ ...offer }, false);
    }
  }, [open]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const validationSchema = yup.object({
    title: yup.string().required('This field is required.'),
    term: yup.string().required('This field is required.'),
    startDate: yup.string().required('This field is required.'),
    endDate: yup.string().required('This field is required.'),
    image: yup.string().required('This field is required.'),
    active: yup.bool().required('This field is required.'),
  });
  const formik = useFormik({
    initialValues: { ...offer },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      handleSubmit(values);
    },
  });
  const categories = useCategories();
  console.log(categories);
  const groups =
    useMemo(
      () => categories?.find(({ id }) => id === categoryId)?.groups,
      [categoryId, categories]
    ) || [];
  const products = useProducts();
  const handleUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const ref = storage.ref(`/${uid}/${file.name}-${Date.now()}`);
    const uploadTask = ref.put(file);
    setLoading(true);
    uploadTask.on('state_changed', console.log, console.error, () => {
      ref.getDownloadURL().then((url) => {
        setLoading(false);
        formik.setFieldValue('image', url);
      });
    });
  };
  const handleSubmit = (values) => {
    setSaving(true);

    if (activeOffer) {
      axios
        .put(`${urlConstants.offerOps}/${activeOffer.id}`, {
          product: {
            ...values,
          },
          userId: uid,
        })
        .then(() => {
          setSaving(false);
          formik.setValues({ ...offer }, false);
          handleClose();
        })
        .catch(() => {
          setSaving(false);
        });
    } else {
      axios
        .post(urlConstants.offerOps, {
          data: {
            offer: {
              ...values,
            },
            userId: uid,
          },
        })
        .then((response) => {
          setSaving(false);
          if (response.data.id) {
            formik.setValues({ ...offer }, false);
            handleClose();
          } else {
            console.log(response);
          }
        })
        .catch((err) => {
          setSaving(false);
          console.log(err);
        });
    }
  };
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={handleClose}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Add Offer
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
      <Grid container>
        <Grid item xs={12} sm={8}>
          <Card style={{ padding: 20 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={3}>
                <TextField
                  variant='outlined'
                  id='standard-select-currency'
                  label='Title'
                  id='title'
                  name='title'
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  error={formik.touched.title && formik.errors.title}
                  helperText={formik.touched.title && formik.errors.title}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <TextField
                  variant='outlined'
                  id='standard-select-currency'
                  label='Search Term'
                  id='term'
                  name='term'
                  value={formik.values.term}
                  onChange={formik.handleChange}
                  error={formik.touched.term && formik.errors.term}
                  helperText={formik.touched.term && formik.errors.term}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <TextField
                  id='outlined-basic'
                  label='Start Date'
                  variant='outlined'
                  id='startDate'
                  type='date'
                  name='startDate'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  error={formik.touched.startDate && formik.errors.startDate}
                  helperText={
                    formik.touched.startDate && formik.errors.startDate
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <TextField
                  id='outlined-basic'
                  label='End Date'
                  variant='outlined'
                  id='endDate'
                  name='endDate'
                  type='date'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formik.values.endDate}
                  onChange={formik.handleChange}
                  error={formik.touched.endDate && formik.errors.endDate}
                  helperText={formik.touched.endDate && formik.errors.endDate}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <FormControl
                  component='fieldset'
                  id='active'
                  error={formik.touched.active && formik.errors.active}
                >
                  <FormLabel component='legend'>
                    Visibility in Homeo App
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-label='active'
                    name='active'
                    value={formik.values.active}
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label='True'
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label='False'
                    />
                  </RadioGroup>
                  <FormHelperText id='my-helper-text'>
                    {formik.touched.active && formik.errors.active}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Grid container>
            <Card className={classes.placeholder}>
              {loading ? (
                <div className={classes.mediaDiv}>
                  <CircularProgress />
                </div>
              ) : (
                <CardMedia
                  className={classes.media}
                  image={
                    formik.values.image
                      ? formik.values.image
                      : 'https://archive.org/download/no-photo-available/no-photo-available.png'
                  }
                  title='Contemplative Reptile'
                />
              )}
              <div style={{ padding: '10px', textAlign: 'center' }}>
                <FormControl
                  component='fieldset'
                  id='image-input'
                  error={formik.touched.image && formik.errors.image}
                >
                  <input
                    accept='image/*'
                    className={classes.input}
                    id='image'
                    multiple
                    type='file'
                    onChange={handleUpload}
                  />
                  <label htmlFor='image' style={{}}>
                    <Button
                      variant='contained'
                      color='primary'
                      component='span'
                    >
                      Upload
                    </Button>
                  </label>
                  <FormHelperText id='my-helper-text'>
                    {formik.touched.image && formik.errors.image}
                  </FormHelperText>
                </FormControl>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}
