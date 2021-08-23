import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from '@material-ui/core/Button';
import AddProducts from 'src/components/AddProducts';
import DeleteProduct from '../DeleteProduct';

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
    flex: 1,
  },
});

function Row(props) {
  const { row, categoryId, handleClick } = props;
  const [open, setOpen] = useState(false);
  const [dialogs, setDialogs] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleClickOpen = () => {
    setDialogs(true);
  };

  const handleClose = () => {
    setDialogs(false);
    setActiveProduct(null);
  };

  const handleAction = (action, item) => {
    setActiveProduct({ ...item });
    if (action === 'edit') {
      handleClickOpen();
    }
    else {
      setDeleteOpen(true);
    }
  }

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
          <Button autoFocus color="inherit" onClick={handleClickOpen} size="small">
            Add Product
          </Button>
          <Button autoFocus color="inherit" onClick={() => handleClick('edit', row)} size="small">
            Edit
          </Button>
          <Button autoFocus color="inherit" onClick={() => handleClick('delete', row)} size="small">
            Delete
          </Button>
        </TableCell>
      </TableRow>
      <ProductsList row={row} open={open} handleClickOpen={handleClickOpen} categoryId={categoryId}
        handleAction={handleAction}
      />
      <AddProducts handleClose={handleClose} dialogs={dialogs} categoryId={categoryId} groupId={row.id}
        activeProduct={activeProduct}
      />
      <DeleteProduct open={deleteOpen} handleClose={() => setDeleteOpen(false)}
        categoryId={categoryId} groupId={row.id}
        activeProduct={activeProduct}
      />
    </React.Fragment>
  );
}

export default function GroupList({ activeCategory, handleAction }) {
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
                <Row key={row.id} row={row} categoryId={activeCategory.id} handleClick={handleAction} />
              ))}
            </TableBody>
          </Table>
          : <div style={{ textAlign: 'center', padding: '20px' }}>
            No Groups Created
          </div>
      }
    </TableContainer>
  );
}