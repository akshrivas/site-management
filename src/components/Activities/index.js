import React, { useState } from "react";
import Paper from "@mui/material/Paper";
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
import { Button, Divider, TextField } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import axios from "axios";
import { urlConstants } from "src/config";
import PersonIcon from "@mui/icons-material/Person";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

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
import { transformActivityTabs } from "src/utils/betActivities";
import BMTabPanel from "../common/BMTabPanel";
import CountUp from "react-countup";

const actionMap = {
  [FINAL_HARVEST]: "finalHarvestDate",
  [SECOND_HARVEST]: "secondHarvestDate",
  [FIRST_HARVEST]: "firstHarvestDate",
  [RAKE]: "rakeDate",
};

export default function Activities() {
  const [selectedTab, setSelectedTab] = useState(0);
  const onTabChange = (val) => {
    setSelectedTab(val);
  };
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
      return red[50];
    } else if (delay <= 20) {
      return red[100];
    } else {
      return red[200];
    }
  };

  if (isLoading) return <PageSpinner />;

  const tabs = transformActivityTabs(activities);
  return (
    <Container fluid sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 0,
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
          sx={{
            width: 200,
          }}
          value={d}
          onChange={handleDateChange}
          fullWidth
        />
      </Box>
      {tabs.length > 0 && (
        <Box
          direction="row"
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            gridGap: 30,
            color: "primary",
            mb: 2,
          }}
        >
          <Box
            sx={{
              width: 100,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h4" align="center" color="primary">
              <CountUp
                start={0}
                end={tabs[selectedTab].labour}
                separator=","
                duration={1}
              ></CountUp>
            </Typography>
            <PersonIcon
              sx={{
                fontSize: 50,
              }}
              color="primary"
            />
          </Box>
          <Box
            sx={{
              width: 100,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h4" align="center" color="primary">
              <CountUp
                start={0}
                end={tabs[selectedTab].cost}
                separator=","
                duration={1}
              ></CountUp>
            </Typography>
            <CurrencyRupeeIcon
              sx={{
                fontSize: 50,
              }}
              color="primary"
            />
          </Box>
        </Box>
      )}
      <Divider sx={{ m: 2 }} />

      {tabs?.length === 0 && (
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
      {tabs.length > 0 && (
        <BMTabPanel tabs={tabs} onTabChange={onTabChange}>
          {tabs.map((tab) => {
            return (
              <TableContainer component={Paper} key={tab.key}>
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
                    {tabs[selectedTab].data.map((activity) => {
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
            );
          })}
        </BMTabPanel>
      )}
      <BMAlert message={message} setMessage={setMessage} success />
    </Container>
  );
}
