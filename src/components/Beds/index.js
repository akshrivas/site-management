import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddBed from "./AddBed";
import { useStyles } from "./bedStyles";
import useBeds from "./useBeds";
import Icon from "@mdi/react";
import { mdiPencilOutline } from "@mdi/js";
import { mdiDeleteOutline } from "@mdi/js";
import EditBed from "./EditBed";
import moment from "moment";
import axios from "axios";
import { urlConstants } from "src/config";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export default function Beds() {
  const classes = useStyles();
  const beds = useBeds();
  const [open, setOpen] = useState(false);
  const [selectedBed, setSelectedBed] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const updatedBeds = beds.map((bed) => {
    const activeDate = moment(bed.wormsAddedOn, "YYYY-MM-DD");
    const today = moment();
    const age = today.diff(activeDate, "days");
    return {
      ...bed,
      age,
    };
  });

  const handleDelete = () => {
    axios
      .delete(`${urlConstants.bedOps}/${selectedBed.id}`, {
        id: selectedBed.id,
      })
      .then((response) => {
        setConfirmDelete(false);
      })
      .catch(() => {});
  };

  updatedBeds.sort((a, b) => Number(b.age) - Number(a.age));

  const handleAction = (action, item) => {
    setSelectedBed(item);
    if (action === "edit") {
      setEditOpen(true);
    } else if (action === "delete") {
      setEditOpen(true);
    } else {
      setOpen(true);
    }
  };

  const handleModalClose = () => {
    setSelectedBed(null);
    setOpen(false);
  };

  const handleEditClose = () => {
    setSelectedBed(null);
    setEditOpen(false);
  };

  const rowClassMapWithTemperature = {
    Warm: classes.warm,
    Hot: classes.hot,
  };

  const rowClassMapWithStatus = {
    "Only Worms": classes.onlyWorms,
  };

  return (
    <Container fluid>
      <AddBed
        open={open}
        handleClose={handleModalClose}
        bedNumber={updatedBeds.length + 1}
      />
      {selectedBed && (
        <EditBed
          open={editOpen}
          handleEditClose={handleEditClose}
          selectedBed={selectedBed}
        />
      )}
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h6" gutterBottom>
            Beds
          </Typography>
        </Grid>
        <Grid item className={classes.actionItem}>
          <Button variant="outlined" onClick={() => setOpen(true)}>
            Add Bed
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        {updatedBeds.length > 0 && (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Bed Number</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Age In Days</TableCell>
                  <TableCell>Worms Added On</TableCell>
                  <TableCell>Temperature</TableCell>
                  <TableCell>Worm Count</TableCell>
                  <TableCell>Update</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {updatedBeds.map((bed) => {
                  return (
                    <TableRow
                      key={bed.bedNumber}
                      className={`${
                        rowClassMapWithTemperature[bed.temperature]
                      } ${rowClassMapWithStatus[bed.status]} ${
                        Number(bed.age) >= 60 ? classes.hot : ""
                      }
                        ${Number(bed.age) >= 30 ? classes.warm : ""}`}
                    >
                      <TableCell>{bed.bedNumber}</TableCell>
                      <TableCell>{bed.status}</TableCell>
                      <TableCell>{isNaN(bed.age) ? 0 : bed.age}</TableCell>
                      <TableCell>
                        {bed.wormsAddedOn
                          ? moment(bed.wormsAddedOn).format("DD-MM-YY")
                          : "-"}
                      </TableCell>
                      <TableCell>{bed.temperature}</TableCell>
                      <TableCell>{bed.wormCount}</TableCell>
                      <TableCell>
                        <Icon
                          onClick={() => handleAction("edit", bed)}
                          path={mdiPencilOutline}
                          title="Edit Product"
                          size={1}
                          color="#434242"
                          style={{ marginRight: 5, cursor: "pointer" }}
                        />
                        <Icon
                          onClick={() => {
                            setSelectedBed(bed);
                            setConfirmDelete(true);
                          }}
                          path={mdiDeleteOutline}
                          title="Edit Product"
                          size={1}
                          color="#434242"
                          style={{ marginRight: 5, cursor: "pointer" }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
      <Dialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Delete bed
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to delete bed number {selectedBed?.bedNumber}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => setConfirmDelete(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={() => handleDelete()} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
