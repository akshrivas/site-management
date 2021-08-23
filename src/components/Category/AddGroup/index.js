import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
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

export default function AddGroup({
    handleClose,
    open,
    categoryId,
    activeGroup
}) {
    const [group, setGroup] = useState({
        name: '',
        description: '',
        active: true
    });
    const [saving, setSaving] = useState(false);
    useEffect(() => {
        if (activeGroup) {
            formik.setValues({ ...activeGroup }, false);
        }
        else {
            formik.setValues({ ...group }, false);
        }
    }, [open])
    const uid = useUid();
    const validationSchema = yup.object({
        name: yup
            .string()
            .required('This field is required.'),
        description: yup
            .string()
            .required('This field is required.'),
        active: yup
            .bool()
            .required('This field is required.')
    });
    const handleSubmit = (values) => {
        console.log(`submitted with ${JSON.stringify(values)}`);
        setSaving(true);
        if (activeGroup) {
            axios.put(`${urlConstants.groupOps}/${activeGroup.id}`, {
                group: values,
                userId: uid,
                categoryId
            }).then(() => {
                setSaving(false);
                formik.setValues({ ...group }, false);
                handleClose();
            }).catch((err) => {
                console.log(err);
                setSaving(false);
            })
        }
        else {
            axios.post(urlConstants.groupOps, {
                data: {
                    group: values,
                    userId: uid,
                    categoryId
                }
            }).then((response) => {
                if (response.data.id) {
                    setSaving(false);
                    formik.setValues({ ...group }, false);
                    handleClose()
                }
                else {
                    console.log(response)
                    setSaving(false);
                }
            }).catch((err) => {
                console.log(err)
                setSaving(false);
            })
        }
    }
    const formik = useFormik({
        initialValues: { ...group },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });
    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                {activeGroup ? 'Edit Group' : 'Create Group'}
            </DialogTitle>
            <DialogContent dividers>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField label="Group Name" variant="outlined"
                                id="name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && formik.errors.name}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl component="fieldset" id="active" error={formik.touched.active && formik.errors.active}>
                                <FormControlLabel
                                    control={<Switch size="small" checked={formik.values.active} onChange={formik.handleChange} />}
                                    label="Active"
                                />
                                <FormHelperText id="my-helper-text">{formik.touched.active && formik.errors.active}</FormHelperText>
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
                    {
                        saving ?
                            <CircularProgress style={{ height: '20px', width: '20px' }} />
                            : activeGroup ? 'Update' : 'Save'
                    }
                </Button>
            </DialogActions>
        </Dialog>
    )
}
