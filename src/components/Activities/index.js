import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import useActivities from "src/components/Activities/useActivities";
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import axios from "axios";
import { urlConstants } from "src/config";
import {
  DATE_FORMAT,
  FINAL_HARVEST,
  FIRST_HARVEST,
  SECOND_HARVEST,
  RAKE,
} from "src/utils/constants";

const actionMap = {
  [FINAL_HARVEST]: "finalHarvestDate",
  [SECOND_HARVEST]: "secondHarvestDate",
  [FIRST_HARVEST]: "firstHarvestDate",
  [RAKE]: "rakeDate",
};

export default function Activities() {
  const router = useRouter();
  const d = router.query.activityDate || moment().format("YYYY-MM-DD");
  const activities = useActivities();
  const handleDateChange = (e) => {
    router.push({
      pathname: router.pathname,
      query: {
        activityDate: e.target.value,
      },
    });
  };
  const onComplete = (activity) => {
    // console.log(activity, actionMap[activity.action]);
    console.log(activity, {
      [actionMap[activity.action]]: moment().format(DATE_FORMAT),
    });
    axios
      .put(`${urlConstants.bedOps}/${activity.id}`, {
        [actionMap[activity.action]]: moment().format(DATE_FORMAT),
      })
      .then((response) => {
        // setSaving(false);
        // if (response.status === 200) {
        //   handleEditClose();
        // }
      })
      .catch(() => {
        // setSaving(false);
      });
  };
  return (
    <Container fluid sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Typography variant="h5" color="primary">
          Activities
        </Typography>
        <TextField
          id="activitiyDate"
          label="Select Date"
          variant="outlined"
          type="date"
          name="activitiyDate"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
            width: 200,
          }}
          value={d}
          onChange={handleDateChange}
          fullWidth
        />
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        {activities?.length > 0 && (
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Bed Number</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Delay</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activities.map((activity) => {
                  return (
                    <TableRow key={activity.bedNumber}>
                      <TableCell>{activity.bedNumber}</TableCell>
                      <TableCell>{activity.action}</TableCell>
                      <TableCell>{activity.dueDate}</TableCell>
                      <TableCell>{activity.age}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          onClick={() => onComplete(activity)}
                        >
                          Complete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Container>
  );
}
