import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Icon from '@mdi/react'
import { mdiPencilOutline } from '@mdi/js'
import { mdiCartOutline } from '@mdi/js'
import { mdiDeleteOutline } from '@mdi/js'
import AddProducts from 'src/components/AddProducts';

import useGroups from './useGroups';
import ProductsList from '../ProductsList';


const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  appBar: {
    position: 'relative',
  },
  title: {
    // marginLeft: theme.spacing(2),
    flex: 1,
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [dialogs, setDialogs] = React.useState(false);

  const handleClickOpen = () => {
    setDialogs(true);
  };

  const handleClose = () => {
    setDialogs(false);
  };

  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>{row.description}</TableCell>
        <TableCell align="right">
            <Button autoFocus color="inherit" onClick={handleClose} size="small">
              Add Product
            </Button>
            <Button autoFocus color="inherit" onClick={handleClose} size="small">
              Edit
            </Button>
            <Button autoFocus color="inherit" onClick={handleClose} size="small">
              Delete
            </Button>
        </TableCell>
      </TableRow>
      <ProductsList row={row} open={open} handleClickOpen={handleClickOpen} />
      <Dialog fullScreen open={dialogs} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Add Products
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <AddProducts />
      </Dialog>
    </React.Fragment>
  );
}

export default function GroupList({ activeCategory }) {
  const groups = useGroups(activeCategory);
  return (
    <TableContainer component={Paper}>
      {
        groups && groups.length ?
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Group</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groups.map((row) => (
                <Row key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
          : 'No groups created'
      }
    </TableContainer>
  );
}