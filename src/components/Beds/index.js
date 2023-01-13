import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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
} from "@mui/material";
import { Box } from "@mui/system";
import { DATE_FORMAT } from "src/utils/constants";
import useSite from "src/hooks/useSite";
import useUid from "src/utils/useUid";
import PageSpinner from "../PageSpinner";

export default function Beds() {
  const classes = useStyles();
  const { beds, isLoading } = useBeds();
  const [open, setOpen] = useState(false);
  const [selectedBed, setSelectedBed] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const updatedBeds = beds?.map((bed) => {
    const activeDate = moment(bed.wormsAddedOn);
    const today = moment();
    const age = today.diff(activeDate, "days");
    return {
      ...bed,
      age,
    };
  });
  const site = useSite();
  const uid = useUid();

  const handleDelete = () => {
    axios
      .delete(`${urlConstants.bedOps}/${selectedBed.id}`, {
        data: {
          userId: uid,
          site,
          data: {},
        },
      })
      .then(() => {
        setConfirmDelete(false);
      })
      .catch(() => {});
  };

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

  if (isLoading) return <PageSpinner />;

  return (
    <Container fluid sx={{ p: 2 }}>
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Typography variant="h5" color="primary">
          Beds
        </Typography>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Add Bed
        </Button>
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        {beds?.length === 0 && (
          <Typography
            variant="h4"
            color="primary"
            align="center"
            sx={{
              width: "100%",
              mt: 5,
            }}
          >
            No Beds Available
          </Typography>
        )}
        {updatedBeds.length > 0 && (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Bed Number</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Active Since</TableCell>
                  <TableCell>Age In Days</TableCell>
                  <TableCell>Update</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {updatedBeds.map((bed) => {
                  return (
                    <TableRow
                      key={bed.id}
                      className={`${
                        rowClassMapWithTemperature[bed.temperature]
                      } ${rowClassMapWithStatus[bed.status]} ${
                        Number(bed.age) >= 60 ? classes.hot : ""
                      }
                        ${Number(bed.age) >= 30 ? classes.warm : ""}`}
                    >
                      <TableCell>{bed.bedNumber}</TableCell>
                      <TableCell>{bed.status}</TableCell>
                      <TableCell>
                        {bed.wormsAddedOn
                          ? moment(bed.wormsAddedOn).format(DATE_FORMAT)
                          : "-"}
                      </TableCell>
                      <TableCell>{isNaN(bed.age) ? 0 : bed.age}</TableCell>
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
