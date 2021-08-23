import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { urlConstants } from 'src/config';
import useUid from 'src/utils/useUid';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function AddCategory({
    handleClose,
    open,
    activeCategory
}) {
    const [category, setCategory] = useState({
        name: '',
        description: '',
        visible: 'show'
    });
    useEffect(() => {
        if(activeCategory){
            formik.setValues({...activeCategory}, false);
        }
        else{
            formik.setValues({ ...category }, false);
        }
    }, [activeCategory])
    const uid = useUid();
    const validationSchema = yup.object({
        name: yup
            .string()
            .required('This field is required.'),
        description: yup
            .string()
            .required('This field is required.'),
        visible: yup
            .string()
            .required('This field is required.')
    });
    const handleSubmit = (values) => {
        console.log(`submitted with ${JSON.stringify(values)}`);
        if(activeCategory){
            axios.put(`${urlConstants.categoryOps}/${activeCategory.id}`, {
                    category: values,
                    userId: uid
            }).then(() => {
                    handleClose()
                    formik.setValues({
                        name: '',
                        description: '',
                        visible: 'show'
                    });
            }).catch((err) => {
                console.log(err)
            }) 
        }
        else{
            axios.post(urlConstants.addCategory, {
                data: {
                    category: values,
                    userId: uid
                }
            }).then((response) => {
                if(response.data.id){
                    handleClose()
                    formik.setValues({
                        name: '',
                        description: '',
                        visible: 'show'
                    }, false);
                }
                else{
                    console.log(response)
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    }
    const formik = useFormik({
        initialValues: { ...category },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });
    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Create Category
            </DialogTitle>
            <DialogContent dividers>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField label="Category Name" variant="outlined"
                            id="name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && formik.errors.name}
                            helperText={formik.touched.name && formik.errors.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl component="fieldset" id="visible" error={formik.touched.visible && formik.errors.visible}>
                                <FormLabel component="legend">Visibility in Homeo App</FormLabel>
                                <RadioGroup row aria-label="gender" name="visible" value={formik.values.visible} onChange={formik.handleChange}>
                                    <FormControlLabel value="show" control={<Radio />} label="Show" />
                                    <FormControlLabel value="hide" control={<Radio />} label="Hide" />
                                    {/* <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
                                </RadioGroup>
                                <FormHelperText id="my-helper-text">{formik.touched.visible && formik.errors.visible}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Description" variant="outlined" 
                                id="description"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={formik.touched.description && formik.errors.description}
                                helperText={formik.touched.description && formik.errors.description}
                            />
                        </Grid>
                    </Grid>

                </form>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={formik.handleSubmit} color="primary" type="submit">
                    {activeCategory ? 'Update' : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
