import React, { useState, useEffect } from 'react';
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
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddOffer({ open, handleClose, activeOffer }) {
    const classes = useStyles();
    const uid = useUid();
    const [categoryId, setCategoryId] = useState(null);
    const [offer, setOffer] = useState({
        name: '',
        itemName: '',
        itemType: '',
        startDate: '',
        endDate: '',
        image: '',
        visible: 'show'
    });
    useEffect(() => {
        if (activeOffer) {
            formik.setValues({ ...activeOffer, itemName: activeOffer.itemId }, false);
        }
        else {
            formik.setValues({ ...offer }, false);
        }
    }, [open])
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(false);
    const validationSchema = yup.object({
        name: yup
            .string()
            .required('This field is required.'),
        itemName: yup
            .string()
            .required('This field is required.'),
        itemType: yup
            .string()
            .required('This field is required.'),
        startDate: yup
            .string()
            .required('This field is required.'),
        endDate: yup
            .string()
            .required('This field is required.'),
        image: yup
            .string()
            .required('This field is required.'),
        visible: yup
            .string()
            .required('This field is required.'),
    });
    const formik = useFormik({
        initialValues: { ...offer },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values)
            handleSubmit(values)
        },
    });
    const categories = useCategories();
    const groups = useGroups(categoryId ? { id: categoryId } : null);
    const products = useProducts();
    const handleUpload = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const ref = storage.ref(`/${uid}/${file.name}-${Date.now()}`);
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
    const handleSubmit = (values) => {
        setSaving(true);
        let link = '', itemName = '';
        if (values.itemType == 'category') {
            itemName = categories.find((item) => item.id == values.itemName).name;
            link = `/categories/${values.itemName}`
        }
        else if (values.itemType == 'group') {
            itemName = groups.find((item) => item.id == values.itemName).name;
            link = `/categories/${categoryId}?groupId=${values.itemName}`
        }
        else if (values.itemType == 'product') {
            itemName = products.find((item) => item.id == values.itemName).name;
            link = `/products/${values.itemName}`
        }
        let valuesObj = {
            ...values,
            itemId: values.itemName,
            itemName,
            link
        }
        if (activeOffer) {
            axios.put(`${urlConstants.offerOps}/${activeOffer.id}`, {
                product: {
                    ...valuesObj,
                },
                userId: uid,
            }).then(() => {
                setSaving(false);
                formik.setValues({ ...offer }, false);
                handleClose()
            }).catch((err) => {
                setSaving(false);
                console.log(err)
            })
        }
        else {
            axios.post(urlConstants.offerOps, {
                data: {
                    offer: {
                        ...valuesObj
                    },
                    userId: uid
                }
            }).then((response) => {
                setSaving(false);
                if (response.data.id) {
                    formik.setValues({ ...offer }, false);
                    handleClose()
                }
                else {
                    console.log(response)
                }
            }).catch((err) => {
                setSaving(false);
                console.log(err)
            })
        }
    }
    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Add Offer
                    </Typography>
                    <Button autoFocus color="inherit" onClick={formik.handleSubmit}>
                        {
                            saving ?
                                <CircularProgress color="white" style={{ height: '20px', width: '20px' }} />
                                : 'Save'
                        }
                    </Button>
                </Toolbar>
            </AppBar>
            <Grid
                container
            >
                <Grid item xs={12} sm={8}>
                    <Card style={{ padding: 20 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={3}>
                                <TextField variant="outlined" id="standard-select-currency" label="Product Name"
                                    id="name"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && formik.errors.name}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <FormControl variant="outlined" style={{ width: '100%' }} error={formik.touched.itemType && formik.errors.itemType}>
                                    <InputLabel id="item-type-select">Type</InputLabel>
                                    <Select
                                        labelId="item-type-select"
                                        id="itemType"
                                        name="itemType"
                                        value={formik.values.itemType}
                                        onChange={formik.handleChange}
                                        label="Type"
                                    >
                                        <MenuItem value={'category'}>Category</MenuItem>
                                        <MenuItem value={'group'}>Group</MenuItem>
                                        <MenuItem value={'product'}>Product</MenuItem>
                                    </Select>
                                    <FormHelperText id="my-helper-text">{formik.touched.itemType && formik.errors.itemType}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <TextField id="outlined-basic" label="Start Date" variant="outlined"
                                    id="startDate"
                                    type="date"
                                    name="startDate"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={formik.values.startDate}
                                    onChange={formik.handleChange}
                                    error={formik.touched.startDate && formik.errors.startDate}
                                    helperText={formik.touched.startDate && formik.errors.startDate}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <TextField id="outlined-basic" label="End Date" variant="outlined"
                                    id="endDate"
                                    name="endDate"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={formik.values.endDate}
                                    onChange={formik.handleChange}
                                    error={formik.touched.endDate && formik.errors.endDate}
                                    helperText={formik.touched.endDate && formik.errors.endDate}
                                />
                            </Grid>
                            {
                                formik.values.itemType ?
                                    formik.values.itemType == 'category' ?
                                        <Grid item xs={12} md={6} lg={3}>
                                            <FormControl variant="outlined" style={{ width: '100%' }} error={formik.touched.itemName && formik.errors.itemName}>
                                                <InputLabel id="category-select">Category</InputLabel>
                                                <Select
                                                    labelId="category-select"
                                                    id="itemName"
                                                    name="itemName"
                                                    value={formik.values.itemName}
                                                    onChange={formik.handleChange}
                                                    label="Type"
                                                >
                                                    {
                                                        categories.map((item) => {
                                                            return (
                                                                <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                                                            )
                                                        })
                                                    }
                                                </Select>
                                                <FormHelperText id="my-helper-text">{formik.touched.itemName && formik.errors.itemName}</FormHelperText>
                                            </FormControl>
                                        </Grid>
                                        : formik.values.itemType == 'group' ?
                                            <>
                                                <Grid item xs={12} md={6} lg={3}>
                                                    <FormControl variant="outlined" style={{ width: '100%' }}>
                                                        <InputLabel id="category-select">Category</InputLabel>
                                                        <Select
                                                            labelId="category-select"
                                                            id="category"
                                                            name="category"
                                                            value={categoryId}
                                                            onChange={(e) => setCategoryId(e.target.value)}
                                                            label="Type"
                                                        >
                                                            {
                                                                categories.map((item) => {
                                                                    return (
                                                                        <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                                                                    )
                                                                })
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={6} lg={3}>
                                                    <FormControl variant="outlined" style={{ width: '100%' }} error={formik.touched.itemName && formik.errors.itemName}>
                                                        <InputLabel id="group-select">Group</InputLabel>
                                                        <Select
                                                            labelId="group-select"
                                                            id="itemName"
                                                            name="itemName"
                                                            value={formik.values.itemName}
                                                            onChange={formik.handleChange}
                                                            label="Type"
                                                        >
                                                            {
                                                                groups.map((item) => {
                                                                    return (
                                                                        <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                                                                    )
                                                                })
                                                            }
                                                        </Select>
                                                        <FormHelperText id="my-helper-text">{formik.touched.itemName && formik.errors.itemName}</FormHelperText>
                                                    </FormControl>
                                                </Grid>
                                            </>
                                            : formik.values.itemType == 'product' ?
                                                <Grid item xs={12} md={6} lg={3}>
                                                    <FormControl variant="outlined" style={{ width: '100%' }} error={formik.touched.itemName && formik.errors.itemName}>
                                                        <InputLabel id="product-select">Product</InputLabel>
                                                        <Select
                                                            labelId="product-select"
                                                            id="itemName"
                                                            name="itemName"
                                                            value={formik.values.itemName}
                                                            onChange={formik.handleChange}
                                                            label="Type"
                                                        >
                                                            {
                                                                products.map((item) => {
                                                                    return (
                                                                        <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                                                                    )
                                                                })
                                                            }
                                                        </Select>
                                                        <FormHelperText id="my-helper-text">{formik.touched.itemName && formik.errors.itemName}</FormHelperText>
                                                    </FormControl>
                                                </Grid>
                                                : null
                                    : null
                            }
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
                                loading ?
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
        </Dialog>
    )
}
