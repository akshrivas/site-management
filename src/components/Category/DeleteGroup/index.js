import React, { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import useUid from 'src/utils/useUid';
import { urlConstants } from 'src/config';

export default function DeleteCategory({
    categoryId,
    handleClose,
    open,
    groupId
}) {
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const uid = useUid();
    const handleClick = () => {
        setLoading(true);
        axios.delete(`${urlConstants.groupOps}/${groupId}`, {
            data: {
                userId: uid,
                categoryId
            }
        }).then(() => {
            setLoading(false);
            handleClose();
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        })
    }
    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">{"Delete Group?"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this group.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleClick} color="primary" autoFocus>
                    {
                        loading ?
                            <CircularProgress style={{ height: '20px', width: '20px' }} />
                            : 'Yes'
                    }
                </Button>
            </DialogActions>
        </Dialog>
    );
}