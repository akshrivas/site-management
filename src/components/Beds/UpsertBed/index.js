import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, InputLabel } from "@mui/material";
import statusOptions from "src/json/statusOptions.json";
import moment from "moment";
import { DATE_FORMAT_FIELDS } from "src/utils/constants";

export default function UpsertBed({ formik }) {
  const getWormCount = () =>
    (formik.values.bedLength * formik.values.bedWidth) / 4;

  return (
    <Grid container>
      <Grid item xs={12} sm={12}>
        <Card style={{ padding: 20 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <TextField
                  variant="outlined"
                  label="Bed Number"
                  id="bedNumber"
                  name="bedNumber"
                  type="number"
                  value={formik.values.bedNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.bedNumber && formik.errors.bedNumber}
                  helperText={
                    formik.touched.bedNumber && formik.errors.bedNumber
                  }
                  // disabled={uneditableAfterAdd}
                  fullWidth
                />
              </FormControl>
            </Grid>
            {/* <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <TextField
                  id="createDate"
                  label="Create Date"
                  variant="outlined"
                  type="date"
                  name="createDate"
                  value={formik.values.createDate}
                  onChange={formik.handleChange}
                  error={formik.touched.createDate && formik.errors.createDate}
                  helperText={
                    formik.touched.createDate && formik.errors.createDate
                  }
                  fullWidth
                  // disabled={uneditableAfterAdd}
                />
              </FormControl>
            </Grid> */}
            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status"
                  name="status"
                  label="status"
                  value={formik.values.status}
                  placeholder="Status"
                  onChange={formik.handleChange}
                  fullWidth
                >
                  {statusOptions.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText id="my-helper-text">
                  {formik.touched.status && formik.errors.status}
                </FormHelperText>
              </FormControl>
            </Grid>
            {!["Filled", "Empty"].includes(formik.values.status) && (
              <Grid item xs={12} md={6} lg={3}>
                <FormControl fullWidth>
                  <TextField
                    id="wormsAddedOn"
                    label="Worms Added On"
                    variant="outlined"
                    type="date"
                    name="wormsAddedOn"
                    value={moment(formik.values.wormsAddedOn).format(
                      DATE_FORMAT_FIELDS
                    )}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "wormsAddedOn",
                        moment(e.target.value).toISOString()
                      )
                    }
                    error={
                      formik.touched.wormsAddedOn && formik.errors.wormsAddedOn
                    }
                    helperText={
                      formik.touched.wormsAddedOn && formik.errors.wormsAddedOn
                    }
                    fullWidth
                  />
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <TextField
                  variant="outlined"
                  label="Width  (In Feet)"
                  id="bedWidth"
                  name="bedWidth"
                  type="number"
                  value={formik.values.bedWidth}
                  onChange={formik.handleChange}
                  error={formik.touched.bedWidth && formik.errors.bedWidth}
                  helperText={formik.touched.bedWidth && formik.errors.bedWidth}
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <TextField
                  variant="outlined"
                  label="Length (In Feet)"
                  id="bedLength"
                  name="bedLength"
                  type="number"
                  value={formik.values.bedLength}
                  onChange={formik.handleChange}
                  error={formik.touched.bedLength && formik.errors.bedLength}
                  helperText={
                    formik.touched.bedLength && formik.errors.bedLength
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <TextField
                  variant="outlined"
                  label="Required Worms (In KG)"
                  id="requiredWorms"
                  name="requiredWorms"
                  type="number"
                  value={formik.values.requiredWorms || getWormCount()}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.requiredWorms && formik.errors.requiredWorms
                  }
                  helperText={
                    formik.touched.requiredWorms && formik.errors.requiredWorms
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>

            {/* {!["Filled", "Empty"].includes(formik.values.status) && ( */}
            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="temperature-label">Temperature</InputLabel>
                <Select
                  labelId="temeprature-label"
                  id="temperature"
                  name="temperature"
                  label="temperature"
                  value={formik.values.temperature}
                  placeholder="temperature ?"
                  onChange={formik.handleChange}
                  fullWidth
                  error={
                    formik.touched.temperature && formik.errors.temperature
                  }
                  helperText={
                    formik.touched.temperature && formik.errors.temperature
                  }
                >
                  <MenuItem value="Cool">Cool</MenuItem>
                  <MenuItem value="Warm">Warm</MenuItem>
                  <MenuItem value="Hot">Hot</MenuItem>
                </Select>
                <FormHelperText
                  error={
                    formik.touched.temperature && formik.errors.temperature
                  }
                >
                  {formik.touched.temperature && formik.errors.temperature}
                </FormHelperText>
              </FormControl>
            </Grid>
            {/* )} */}
            {!["Filled", "Active", "Empty"].includes(formik.values.status) && (
              <Grid item xs={12} md={6} lg={3}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="wormCount-label">Worm Count</InputLabel>
                  <Select
                    labelId="wormCount-label"
                    id="wormCount"
                    name="wormCount"
                    label="wormCount"
                    value={formik.values.wormCount}
                    placeholder="wormCount ?"
                    onChange={formik.handleChange}
                    fullWidth
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                  <FormHelperText id="my-helper-text">
                    {formik.touched.wormCount && formik.errors.wormCount}
                  </FormHelperText>
                </FormControl>
              </Grid>
            )}
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}
