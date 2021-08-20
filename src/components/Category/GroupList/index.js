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
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
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
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell>{row.description}</TableCell>
        <TableCell align="center">{row.carbs}</TableCell>
        {/* <TableCell align="right">{row.protein}</TableCell> */}
      </TableRow>
      {/* <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Products
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Added date</TableCell>
                    <TableCell align="right">Units</TableCell>
                    <TableCell>Decryption</TableCell>
                    <TableCell align="right">Original Price</TableCell>
                    <TableCell align="right">Discount(%)</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell>SKU</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell>
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                      <TableCell align="right">{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.customerId}</TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell>
                        <Icon onClick={handleClickOpen} path={mdiPencilOutline}
                        title="User Profile"
                        size={1}
                        color="#434242"
                        style={{marginRight: 5}}
                        />
                        <Icon path={mdiCartOutline}
                        title="User Profile"
                        size={1}
                        color="#434242"
                        style={{marginRight: 5}}
                        />
                        <Icon path={mdiDeleteOutline}
                        title="User Profile"
                        size={1}
                        color="#434242"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow> */}
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

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('Vegetables', 1, "All Fresh products", 24,),
  createData('Fruits', 4, "All Fresh products", 24,),

];

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
                <TableCell align="right">No. of Products</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="center">Action</TableCell>
                {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {groups.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
          : 'No groups created'
      }
    </TableContainer>
  );
}