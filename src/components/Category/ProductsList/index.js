import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Icon from '@mdi/react'
import { mdiPencilOutline } from '@mdi/js';
import { mdiCartOutline } from '@mdi/js';
import { mdiDeleteOutline } from '@mdi/js';

export default function ProductsList({ row, open, handleClickOpen }) {
    return (
        <TableRow>
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
                                {[
                                    { date: '2020-01-05', customerId: '11091700', amount: 3 },
                                    { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
                                ].map((historyRow) => (
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
                                            <Icon
                                                onClick={handleClickOpen}
                                                path={mdiPencilOutline}
                                                title="Edit Product"
                                                size={1}
                                                color="#434242"
                                                style={{ marginRight: 5, cursor: 'pointer' }}
                                            />
                                            <Icon
                                                path={mdiCartOutline}
                                                title="Add to cart"
                                                size={1}
                                                color="#434242"
                                                style={{ marginRight: 5, cursor: 'pointer' }}
                                            />
                                            <Icon
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
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    )
}
