import React, { useState } from "react";
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

import { red } from "@mui/material/colors";

import {
  DATE_FORMAT,
  FINAL_HARVEST,
  FIRST_HARVEST,
  SECOND_HARVEST,
  RAKE,
} from "src/utils/constants";
import useUid from "src/utils/useUid";
import useSite from "src/hooks/useSite";
import BMAlert from "../common/BMAlert";
import PageSpinner from "../PageSpinner";

const actionMap = {
  [FINAL_HARVEST]: "finalHarvestDate",
  [SECOND_HARVEST]: "secondHarvestDate",
  [FIRST_HARVEST]: "firstHarvestDate",
  [RAKE]: "rakeDate",
};

export default function Activities() {
  const [message, setMessage] = useState(false);
  const router = useRouter();
  const d = router.query.activityDate || moment().format("YYYY-MM-DD");
  const { data: activities, isLoading } = useActivities();
  const uid = useUid();
  const site = useSite();
  const handleDateChange = (e) => {
    router.push({
      pathname: router.pathname,
      query: {
        activityDate: e.target.value,
      },
    });
  };
  const onComplete = (activity) => {
    axios
      .put(`${urlConstants.bedOps}/${activity.id}`, {
        userId: uid,
        site,
        data: { [actionMap[activity.action]]: moment().format(DATE_FORMAT) },
      })
      .then(() => {
        setMessage("Activity completed successfully!");
      })
      .catch(() => {});
  };

  const getRowColor = (delay) => {
    if (delay <= 2) {
      return red[50];
    } else if (delay <= 10) {
      return red[100];
    } else if (delay <= 20) {
      return red[200];
    } else {
      return red[400];
    }
  };

  if (isLoading) return <PageSpinner />;
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
        {activities?.length === 0 && (
          <Typography
            variant="h4"
            color="primary"
            align="center"
            sx={{
              width: "100%",
              mt: 5,
            }}
          >
            No pending activity
          </Typography>
        )}
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
                    <TableRow
                      key={activity.bedNumber}
                      // className={getRowClass(activity.delay)}
                      sx={{
                        background: getRowColor(activity.delay),
                      }}
                    >
                      <TableCell>{activity.bedNumber}</TableCell>
                      <TableCell>{activity.action}</TableCell>
                      <TableCell>
                        {moment(activity.dueDate).format(DATE_FORMAT)}
                      </TableCell>
                      <TableCell>{activity.delay}</TableCell>
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
      <BMAlert message={message} setMessage={setMessage} success />
    </Container>
  );
}
