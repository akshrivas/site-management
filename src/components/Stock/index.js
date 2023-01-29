import React, { createElement } from "react";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import {
  AppBar,
  Button,
  Divider,
  Drawer,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import moment from "moment";

import { DATE_FORMAT, DATE_FORMAT_FIELDS } from "src/utils/constants";
import CountUp from "react-countup";
import stockIconMap from "src/utils/stockIconMap";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import axios from "axios";
import { urlConstants } from "src/config";
import useUid from "src/utils/useUid";
import useSite from "src/hooks/useSite";
import useStock from "./useStock";

export default function Stock() {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const { data, details } = useStock();

  const handleVisibility = React.useCallback(() => {
    setOpenDrawer(!openDrawer);
  }, [openDrawer]);
  const uid = useUid();
  const site = useSite();

  const handleSubmit = (values) => {
    const updatedValues = { ...values };
    if (updatedValues.type === "OUT") {
      updatedValues.packets = -updatedValues.packets;
    }
    axios
      .post(`${urlConstants.stockOps}`, {
        userId: uid,
        site,
        data: updatedValues,
      })
      .then((response) => {
        if (response.data.id) {
          handleVisibility();
          // handleClose();
        }
      })
      .catch(() => {
        // setSaving(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      date: moment(),
      type: "IN",
      packets: null,
    },
    enableReinitialize: false,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

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
          Stock
        </Typography>
        <Button variant="outlined" onClick={handleVisibility}>
          Update
        </Button>
      </Box>
      {data?.length === 0 && (
        <Typography
          variant="h4"
          color="primary"
          align="center"
          sx={{
            width: "100%",
            mt: 5,
          }}
        >
          No data available
        </Typography>
      )}
      {data?.length > 0 && (
        <>
          <Grid container rowSpacing={3}>
            {Object.keys(stockIconMap).map((item) => {
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
                        end={details[item]}
                        separator=","
                        duration={1}
                      ></CountUp>
                    </Typography>

                    {createElement(
                      stockIconMap[item].icon,
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
                      {stockIconMap[item].title}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
          <Divider sx={{ m: 2 }} />
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Packets</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => {
                  return (
                    <TableRow key={data.id}>
                      <TableCell>
                        {moment(item.date).format(DATE_FORMAT)}
                      </TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.packets}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      {openDrawer && (
        <Drawer anchor="right" open={openDrawer} onClose={handleVisibility}>
          <AppBar
            position="relative"
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              height: 65,
            }}
          >
            <Typography variant="h6">Update Stock</Typography>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleVisibility}
              color="inherit"
              sx={{
                width: 20,
              }}
            >
              <CloseIcon />
            </IconButton>
          </AppBar>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gridGap: 20,
              flexWrap: "wrap",
              mt: {
                xs: 2,
              },
              width: 350,
              justifyContent: "center",
              alignItems: "center",
              p: 2,
            }}
            noValidate
            autoComplete="off"
            onSubmit={formik.handleSubmit}
          >
            <Grid container>
              <Grid item xs={12} sm={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <TextField
                        id="date"
                        label="Date"
                        variant="outlined"
                        type="date"
                        name="date"
                        value={moment(formik.values.date).format(
                          DATE_FORMAT_FIELDS
                        )}
                        onChange={(e) =>
                          formik.setFieldValue(
                            "date",
                            moment(e.target.value).toISOString()
                          )
                        }
                        error={formik.touched.date && formik.errors.date}
                        fullWidth
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="type-label">Type</InputLabel>
                      <Select
                        labelId="type-label"
                        id="type"
                        name="type"
                        label="type"
                        value={formik.values.type}
                        placeholder="type ?"
                        onChange={formik.handleChange}
                        fullWidth
                        error={formik.touched.type && formik.errors.type}
                      >
                        <MenuItem value="IN">IN</MenuItem>
                        <MenuItem value="OUT">OUT</MenuItem>
                      </Select>
                      <FormHelperText
                        error={formik.touched.type && formik.errors.type}
                      >
                        {formik.touched.type && formik.errors.type}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        variant="outlined"
                        label="Packets"
                        id="packets"
                        name="packets"
                        type="number"
                        value={formik.values.packets}
                        onChange={formik.handleChange}
                        error={formik.touched.packets && formik.errors.packets}
                        helperText={
                          formik.touched.packets && formik.errors.packets
                        }
                        fullWidth
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!formik.dirty}
            >
              Save
            </Button>
          </Box>
        </Drawer>
      )}
    </Container>
  );
}
