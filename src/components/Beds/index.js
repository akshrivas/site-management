import React, { createElement, useState } from "react";
import Paper from "@mui/material/Paper";
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
  Divider,
  Grid,
  Menu,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import { DATE_FORMAT } from "src/utils/constants";
import useSite from "src/hooks/useSite";
import useUid from "src/utils/useUid";
import PageSpinner from "../PageSpinner";
import BMTabPanel from "../common/BMTabPanel";
import CountUp from "react-countup";
import bedIconMap from "src/utils/bedIconMap";
import BasicMenu from "../common/BMMenu";
import { get } from "lodash";

export default function Beds() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onTabChange = (val) => {
    setSelectedTab(val);
  };
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedBedId, setSelectedBedId] = useState(null);
  const { beds, isLoading, tabs, statistics, selectedBed, noRecords } =
    useBeds(selectedBedId);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmComplete, setConfirmComplete] = useState(false);
  const site = useSite();
  const uid = useUid();
  const handleDelete = () => {
    axios
      .delete(`${urlConstants.bedOps}/${selectedBedId}`, {
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

  const handleRestart = () => {
    axios
      .put(`${urlConstants.bedOps}/${selectedBedId}`, {
        userId: uid,
        site,
        data: selectedBed,
        action: "Complete",
      })
      .then((response) => {
        if (response.status === 200) {
          setConfirmComplete(false);
        }
      })
      .catch(() => {});
  };

  const handleModalClose = () => {
    setSelectedBedId(null);
    setOpen(false);
  };

  const handleEditClose = () => {
    setSelectedBedId(null);
    setEditOpen(false);
  };

  const handleMenuActions = (e) => {
    // console.log(e.target.value);
    const action = get(e, "target.dataset.action");
    const bed = get(e, "target.dataset.bed");
    setSelectedBedId(bed);
    if (action === "Edit") {
      setEditOpen(true);
    } else if (action === "Complete") {
      setConfirmComplete(true);
    }
  };

  const getActionItems = (status) => {
    return [
      {
        title: "Edit",
        key: "Edit",
        onClick: handleMenuActions,
      },
      {
        title: "Complete",
        key: "Complete",
        disabled: status !== "InActive",
        onClick: handleMenuActions,
      },
    ];
  };

  const handleAdd = (type) => {
    setOpen(type);
    handleClose();
  };

  if (isLoading) return <PageSpinner />;

  return (
    <Container fluid sx={{ p: 2 }}>
      <AddBed
        open={open}
        handleClose={handleModalClose}
        bedNumber={beds.length + 1}
        type={open}
      />
      {selectedBed && (
        <EditBed
          open={editOpen}
          handleEditClose={handleEditClose}
          selectedBed={{
            id: selectedBedId,
            ...selectedBed,
          }}
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
        <Button variant="outlined" onClick={handleClick}>
          Add Bed
        </Button>
      </Box>

      {noRecords && (
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
      {beds.length > 0 && (
        <>
          <Grid container rowSpacing={3}>
            {Object.keys(bedIconMap).map((item) => {
              return (
                <Grid item key={item} xs={4}>
                  <Box
                    key={item}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="h6" align="center" color="primary">
                      <CountUp
                        start={0}
                        end={statistics[item]}
                        separator=","
                        duration={1}
                      ></CountUp>
                    </Typography>
                    {/* {item} */}

                    {createElement(
                      bedIconMap[item].icon,
                      {
                        fontSize: "small",
                        color: "primary",
                      },
                      null
                    )}
                    <Typography
                      variant="body1"
                      color="primary"
                      noWrap
                      sx={{
                        maxWidth: "100%",
                      }}
                    >
                      {bedIconMap[item].title}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
          <Divider sx={{ m: 2 }} />
        </>
      )}

      {beds.length > 0 && (
        <BMTabPanel tabs={tabs} onTabChange={onTabChange}>
          {tabs.map((tab) => (
            <TableContainer component={Paper} key={tab.key}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Bed Number</TableCell>
                    <TableCell>Bed Size</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Active Since</TableCell>
                    <TableCell>Age In Days</TableCell>
                    <TableCell>Update</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tabs[selectedTab].data.map((bed) => {
                    return (
                      <TableRow key={bed.id}>
                        <TableCell>{bed.bedNumber}</TableCell>
                        <TableCell>{bed.size}</TableCell>
                        <TableCell>{bed.status}</TableCell>
                        <TableCell>
                          {bed.wormsAddedOn
                            ? moment(bed.wormsAddedOn).format(DATE_FORMAT)
                            : "-"}
                        </TableCell>
                        <TableCell>{isNaN(bed.age) ? 0 : bed.age}</TableCell>
                        <TableCell>
                          <BasicMenu
                            title="Actions"
                            items={getActionItems(bed.status)}
                            bed={bed.id}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          ))}
        </BMTabPanel>
      )}
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
      <Dialog
        open={confirmComplete}
        onClose={() => setConfirmComplete(false)}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Complete Bed
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            COMPLETING a bed means that it has been fully harvested and is now
            empty. Are you sure to COMPLETE BED {selectedBed?.bedNumber}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => setConfirmComplete(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={() => handleRestart()} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleAdd("single")}>Single Bed</MenuItem>
        <MenuItem onClick={() => handleAdd("multiple")}>Multiple Beds</MenuItem>
      </Menu>
    </Container>
  );
}
