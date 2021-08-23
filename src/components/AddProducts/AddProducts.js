import React, { useState } from 'react';
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddProducts({
  dialogs,
  handleClose,
  categoryId,
  groupId
}) {
  const classes = useStyles();
  const uid = useUid();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    subtitle: '',
    units: '',
    description: '',
    discount: '',
    originalPrice: '',
    price: '',
    sku: '',
    image: '',
    visible: 'show'
  });
  const validationSchema = yup.object({
    name: yup
      .string()
      .required('This field is required.'),
    subtitle: yup
      .string()
      .required('This field is required.'),
    units: yup
      .string()
      .required('This field is required.'),
    description: yup
      .string()
      .required('This field is required.'),
    discount: yup
      .string()
      .required('This field is required.'),
    originalPrice: yup
      .string()
      .required('This field is required.'),
    price: yup
      .string()
      .required('This field is required.'),
    sku: yup
      .string()
      .required('This field is required.'),
    image: yup
      .string()
      .required('This field is required.'),
    visible: yup
      .string()
      .required('This field is required.'),
  });
  const handleSubmit = (values) => {
    console.log(`submitted with ${JSON.stringify(values)}`);
    axios.post(urlConstants.productOps, {
        data: {
            product: values,
            userId: uid,
            categoryId,
            groupId
        }
    }).then((response) => {
        if(response.data.id){
            handleClose()
        }
        else{
            console.log(response)
        }
    }).catch((err) => {
        console.log(err)
    })
  }
  const handleUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const ref = storage.ref(`/${uid}/${file.name}`);
    const uploadTask = ref.put(file);
    setLoading(true);
    uploadTask.on("state_changed", console.log, console.error, () => {
      ref
        .getDownloadURL()
        .then((url) => {
          setLoading(false);
          formik.setFieldValue('image', url);
        });
    });
  }
  const formik = useFormik({
    initialValues: { ...product },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  return (
    <Dialog fullScreen open={dialogs} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Add Products
          </Typography>
          <Button autoFocus color="inherit" onClick={formik.handleSubmit}>
            Save
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
                    <TextField variant="outlined" id="standard-select-currency" label="Product Name"
                      id="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && formik.errors.name}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <TextField id="outlined-basic" label="Subtitle" variant="outlined"
                      id="subtitle"
                      value={formik.values.subtitle}
                      onChange={formik.handleChange}
                      error={formik.touched.subtitle && formik.errors.subtitle}
                      helperText={formik.touched.subtitle && formik.errors.subtitle}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <TextField id="outlined-basic" label="Units" variant="outlined"
                      id="units"
                      value={formik.values.units}
                      onChange={formik.handleChange}
                      error={formik.touched.units && formik.errors.units}
                      helperText={formik.touched.units && formik.errors.units}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <TextField id="outlined-basic" label="Description" variant="outlined"
                      id="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      error={formik.touched.description && formik.errors.description}
                      helperText={formik.touched.description && formik.errors.description}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <TextField id="outlined-basic" label="Discount(%)" variant="outlined"
                      id="discount"
                      value={formik.values.discount}
                      onChange={formik.handleChange}
                      error={formik.touched.discount && formik.errors.discount}
                      helperText={formik.touched.discount && formik.errors.discount}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <TextField id="outlined-basic" label="Original Price" variant="outlined"
                      id="originalPrice"
                      value={formik.values.originalPrice}
                      onChange={formik.handleChange}
                      error={formik.touched.originalPrice && formik.errors.originalPrice}
                      helperText={formik.touched.originalPrice && formik.errors.originalPrice}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <TextField id="outlined-basic" label="Price" variant="outlined"
                      id="price"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      error={formik.touched.price && formik.errors.price}
                      helperText={formik.touched.price && formik.errors.price}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <TextField id="outlined-basic" label="SKU" variant="outlined"
                      id="sku"
                      value={formik.values.sku}
                      onChange={formik.handleChange}
                      error={formik.touched.sku && formik.errors.sku}
                      helperText={formik.touched.sku && formik.errors.sku}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <FormControl component="fieldset" id="visible" error={formik.touched.visible && formik.errors.visible}>
                      <FormLabel component="legend">Visibility in Homeo App</FormLabel>
                      <RadioGroup row aria-label="gender" name="visible" value={formik.values.visible} onChange={formik.handleChange}>
                        <FormControlLabel value="show" control={<Radio />} label="Show" />
                        <FormControlLabel value="hide" control={<Radio />} label="Hide" />
                      </RadioGroup>
                      <FormHelperText id="my-helper-text">{formik.touched.visible && formik.errors.visible}</FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Grid container>
                <Card className={classes.placeholder}>
                  {
                    loading?
                    <div className={classes.mediaDiv}>
                      <CircularProgress />
                    </div>
                    : <CardMedia
                    className={classes.media}
                    image={formik.values.image ? formik.values.image : "https://archive.org/download/no-photo-available/no-photo-available.png"}
                    title="Contemplative Reptile"
                  /> 
                  }
                  <div style={{ padding: '10px', textAlign: 'center' }}>
                    <FormControl component="fieldset" id="image-input" error={formik.touched.image && formik.errors.image}>
                      <input
                        accept="image/*"
                        className={classes.input}
                        id="image"
                        multiple
                        type="file"
                        onChange={handleUpload}
                      />
                      <label htmlFor="image" style={{}}>
                        <Button variant="contained" color="primary" component="span">
                          Upload
                        </Button>
                      </label>
                      <FormHelperText id="my-helper-text">{formik.touched.image && formik.errors.image}</FormHelperText>
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
