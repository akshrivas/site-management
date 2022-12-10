import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { FormControl, InputLabel } from '@material-ui/core';

export default function UpsertBed({ formik }) {
  return (
    <Grid container>
      <Grid item xs={12} sm={12}>
        <Card style={{ padding: 20 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <TextField
                  variant='outlined'
                  label='Bed Number'
                  id='bedNumber'
                  name='bedNumber'
                  type='number'
                  value={formik.values.bedNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.bedNumber && formik.errors.bedNumber}
                  helperText={formik.touched.bedNumber && formik.errors.bedNumber}
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <TextField
                  variant='outlined'
                  label='Width  (In Feet)'
                  id='bedWidth'
                  name='bedWidth'
                  type='number'
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
                  variant='outlined'
                  label='Length (In Feet)'
                  id='bedLength'
                  name='bedLength'
                  type='number'
                  value={formik.values.bedLength}
                  onChange={formik.handleChange}
                  error={formik.touched.bedLength && formik.errors.bedLength}
                  helperText={formik.touched.bedLength && formik.errors.bedLength}
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <TextField
                  id='fillDate'
                  label='Fill Date'
                  variant='outlined'
                  type='date'
                  name='fillDate'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formik.values.fillDate}
                  onChange={formik.handleChange}
                  error={formik.touched.fillDate && formik.errors.fillDate}
                  helperText={
                    formik.touched.fillDate && formik.errors.fillDate
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <TextField
                  id='wormsAddedOn'
                  label='Worms Added On'
                  variant='outlined'
                  type='date'
                  name='wormsAddedOn'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formik.values.wormsAddedOn}
                  onChange={formik.handleChange}
                  error={formik.touched.wormsAddedOn && formik.errors.wormsAddedOn}
                  helperText={
                    formik.touched.wormsAddedOn && formik.errors.wormsAddedOn
                  }
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="temprature-label">Temperature</InputLabel>
                <Select
                  labelId="temprature-label"
                  id="temprature"
                  name="temperature"
                  label="temprature"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formik.values.temprature}
                  placeholder="temprature ?"
                  onChange={formik.handleChange}
                  fullWidth
                >
                  <MenuItem value="Cool">Cool</MenuItem>
                  <MenuItem value="Warm">Warm</MenuItem>
                  <MenuItem value="Hot">Hot</MenuItem>
                </Select>
                <FormHelperText id='my-helper-text'>
                  {formik.touched.temprature && formik.errors.temprature}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="wormCount-label">Worm Count</InputLabel>
                <Select
                  labelId="wormCount-label"
                  id="wormCount"
                  name="wormCount"
                  label="wormCount"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formik.values.wormCount}
                  placeholder="wormCount ?"
                  onChange={formik.handleChange}
                  fullWidth
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
                <FormHelperText id='my-helper-text'>
                  {formik.touched.wormCount && formik.errors.wormCount}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <TextField
                  variant='outlined'
                  label='Rake Reminder (In Days)'
                  id='rakeReminder'
                  name='rakeReminder'
                  type='number'
                  value={formik.values.rakeReminder}
                  onChange={formik.handleChange}
                  error={formik.touched.rakeReminder && formik.errors.rakeReminder}
                  helperText={formik.touched.rakeReminder && formik.errors.rakeReminder}
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth>
                <TextField
                  variant='outlined'
                  label='Harvesting Reminder (In Days)'
                  id='harvestingReminder'
                  name='harvestingReminder'
                  type='number'
                  value={formik.values.harvestingReminder}
                  onChange={formik.handleChange}
                  error={formik.touched.harvestingReminder && formik.errors.harvestingReminder}
                  helperText={formik.touched.harvestingReminder && formik.errors.harvestingReminder}
                  fullWidth
                />
              </FormControl>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}
