import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import useUid from 'src/utils/useUid';
import { urlConstants } from  'src/config';

export default function DeleteCategory({
    categoryId,
    handleClose,
    open
}) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const uid = useUid();
    const handleClick = () => {
        axios.delete(`${urlConstants.categoryOps}/${categoryId}`, {
            data: {
                userId: uid
            }
        }).then(() => {
            handleClose();
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">{"Delete Category?"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this category.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleClick} color="primary" autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}