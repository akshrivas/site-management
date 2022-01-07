import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddOffer from './AddOffer';
import { useStyles } from './offerStyles';
import useOffers from './useOffers';
import Icon from '@mdi/react'
import { mdiPencilOutline } from '@mdi/js';
import { mdiDeleteOutline } from '@mdi/js';
import DeleteOffer from './DeleteOffer';

export default function Offers() {
    const classes = useStyles();
    const offers = useOffers();
    const [open, setOpen] = useState(false);
    const [activeOffer, setActiveOffer] = useState(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const handleAction = (action, item) => {
        setActiveOffer(item)
        if(action == 'edit'){
            setOpen(true)
        }
        else{
            setDeleteOpen(true)
        }
    }
    const handleModalClose = () => {
        setActiveOffer(null);
        setOpen(false);
    }
    const handleDeleteClose = () => {
        setActiveOffer(null);
        setDeleteOpen(false);
    }
    return (
        <Container fluid>
            <AddOffer open={open} handleClose={handleModalClose} activeOffer={activeOffer} />
            <DeleteOffer open={deleteOpen} handleClose={handleDeleteClose} activeOffer={activeOffer} />
            <Paper style={{ padding: '10px' }}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography variant="h6" gutterBottom>
                            Offers
                        </Typography>
                    </Grid>
                    <Grid item className={classes.actionItem}>
                        <Button variant="outlined" onClick={() => setOpen(true)}>Add Offer</Button>
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Search Term</TableCell>
                                    <TableCell>Start Date</TableCell>
                                    <TableCell>End Date</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {offers.map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell>{row.title}</TableCell>
                                        <TableCell>{row.term}</TableCell>
                                        <TableCell>{row.startDate}</TableCell>
                                        <TableCell>{row.endDate}</TableCell>
                                        <TableCell>
                                            <Icon
                                                onClick={() => handleAction('edit', row)}
                                                path={mdiPencilOutline}
                                                title="Edit Product"
                                                size={1}
                                                color="#434242"
                                                style={{ marginRight: 5, cursor: 'pointer' }}
                                            />
                                            <Icon
                                                onClick={() => handleAction('delete', row)}
                                                path={mdiDeleteOutline}
                                                title="Delete product"
                                                size={1}
                                                color="#434242"
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Paper>
        </Container>
    )
}
