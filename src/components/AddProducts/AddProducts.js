import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from './AddProductStyles';
import useUid from 'src/utils/useUid';
import storage from 'src/utils/storage';
import { urlConstants } from 'src/config';
import Switch from '@material-ui/core/Switch';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function AddProducts({
  dialogs,
  handleClose,
  categoryId,
  groupId,
  activeProduct,
  groupName,
  categoryName,
}) {
  const classes = useStyles();
  const uid = useUid();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    subtitle: '',
    availableUnits: 0,
    description: '',
    discount: 0,
    mrp: 0,
    price: 0,
    sku: '',
    image: '',
    active: true,
    tags: '',
  });
  useEffect(() => {
    if (activeProduct) {
      formik.setValues({ ...activeProduct }, false);
    } else {
      formik.setValues({ ...product }, false);
    }
  }, [dialogs]);

  const validationSchema = yup.object({
    name: yup.string().required('This field is required.'),
    subtitle: yup.string(),
    availableUnits: yup.number(),
    description: yup.string(),
    discount: yup.number(),
    mrp: yup.number().required('This field is required.'),
    price: yup.number().required('This field is required.'),
    sku: yup.string(),
    image: yup.string().required('This field is required.'),
    active: yup.boolean().required('This field is required.'),
    tags: yup.string(),
  });

  const handleSubmit = (values) => {
    console.log(`submitted with ${JSON.stringify(values)}`);
    setSaving(true);
    if (activeProduct) {
      axios
        .put(`${urlConstants.productOps}/${activeProduct.id}`, {
          product: {
            ...values,
            groupName,
            categoryName,
          },
          userId: uid,
          categoryId,
          groupId,
        })
        .then(() => {
          setSaving(false);
          formik.setValues({ ...product }, false);
          handleClose();
        })
        .catch((err) => {
          setSaving(false);
          console.log(err);
        });
    } else {
      axios
        .post(urlConstants.productOps, {
          data: {
            product: {
              ...values,
              groupName,
              categoryName,
            },
            userId: uid,
            categoryId,
            groupId,
          },
        })
        .then((response) => {
          setSaving(false);
          if (response.data.id) {
            formik.setValues({ ...product }, false);
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
  const formik = useFormik({
    initialValues: { ...product },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  return (
    <Dialog
      fullScreen
      open={dialogs}
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
            {activeProduct ? 'Edit Product' : 'Add Product'}
          </Typography>
          <Button autoFocus color='inherit' onClick={formik.handleSubmit}>
            {saving ? (
              <CircularProgress
                color='white'
                style={{ height: '20px', width: '20px' }}
              />
            ) : activeProduct ? (
              'Update'
            ) : (
              'Save'
            )}
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              <Card style={{ padding: 20 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6} lg={3}>
                    <TextField
                      variant='outlined'
                      id='standard-select-currency'
                      label='Product Name'
                      id='name'
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && formik.errors.name}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <TextField
                      id='outlined-basic'
                      label='Subtitle'
                      variant='outlined'
                      id='subtitle'
                      value={formik.values.subtitle}
                      onChange={formik.handleChange}
                      error={formik.touched.subtitle && formik.errors.subtitle}
                      helperText={
                        formik.touched.subtitle && formik.errors.subtitle
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <TextField
                      id='outlined-basic'
                      label='Available Units'
                      variant='outlined'
                      id='availableUnits'
                      type='number'
                      value={formik.values.availableUnits}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.availableUnits &&
                        formik.errors.availableUnits
                      }
                      helperText={
                        formik.touched.availableUnits &&
                        formik.errors.availableUnits
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <TextField
                      id='outlined-basic'
                      label='Description'
                      variant='outlined'
                      id='description'
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.description && formik.errors.description
                      }
                      helperText={
                        formik.touched.description && formik.errors.description
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <TextField
                      id='outlined-basic'
                      label='Original Price'
                      variant='outlined'
                      id='mrp'
                      type='number'
                      value={formik.values.mrp}
                      onChange={formik.handleChange}
                      error={formik.touched.mrp && formik.errors.mrp}
                      helperText={formik.touched.mrp && formik.errors.mrp}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <TextField
                      id='outlined-basic'
                      label='Discount(%)'
                      variant='outlined'
                      id='discount'
                      type='number'
                      value={formik.values.discount}
                      onChange={formik.handleChange}
                      error={formik.touched.discount && formik.errors.discount}
                      helperText={
                        formik.touched.discount && formik.errors.discount
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <TextField
                      id='outlined-basic'
                      label='Price'
                      variant='outlined'
                      id='price'
                      type='number'
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      error={formik.touched.price && formik.errors.price}
                      helperText={formik.touched.price && formik.errors.price}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <TextField
                      id='outlined-basic'
                      label='SKU'
                      variant='outlined'
                      id='sku'
                      value={formik.values.sku}
                      onChange={formik.handleChange}
                      error={formik.touched.sku && formik.errors.sku}
                      helperText={formik.touched.sku && formik.errors.sku}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <TextField
                      id='outlined-basic'
                      label='Tags'
                      variant='outlined'
                      id='tags'
                      value={formik.values.tags}
                      onChange={formik.handleChange}
                      error={formik.touched.tags && formik.errors.tags}
                      helperText={formik.touched.tags && formik.errors.tags}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <FormControl
                      component='fieldset'
                      id='active'
                      error={formik.touched.active && formik.errors.active}
                    >
                      {/* <FormLabel component='legend'>Active</FormLabel>
                      <RadioGroup
                        row
                        aria-label='gender'
                        name='active'
                        value={formik.values.active}
                        onChange={formik.handleChange}
                      >
                        <FormControlLabel
                          value='show'
                          control={<Radio />}
                          label='Show'
                        />
                        <FormControlLabel
                          value='hide'
                          control={<Radio />}
                          label='Hide'
                        />
                      </RadioGroup>
                      <FormHelperText id='my-helper-text'>
                        {formik.touched.active && formik.errors.active}
                      </FormHelperText> */}
                      <FormControlLabel
                        label='Active'
                        control={
                          <Switch
                            id='active'
                            value={formik.values.tags}
                            onChange={formik.handleChange}
                            defaultChecked
                          />
                        }
                      />
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
        </form>
      </div>
    </Dialog>
  );
}
