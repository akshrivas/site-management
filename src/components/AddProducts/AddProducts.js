import React from 'react';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {  useStyles } from './AddProductStyles';

const currencies = [
    {
      value: 'USD',
      label: 'Tomoto',
    },
    {
      value: 'EUR',
      label: 'Tomoto',
    },
    {
      value: 'BTC',
      label: 'Tomoto',
    },
    {
      value: 'JPY',
      label: 'Tomoto',
    },
];

export default function addProducts() {
 // eslint-disable-next-line react-hooks/rules-of-hooks
 const classes = useStyles();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value, setValue] = React.useState('show');

  const handleChangeProduct = (event) => {
    setValue(event.target.value);
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currency, setCurrency] = React.useState('EUR');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <>
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
            <Card style={{padding: 20}}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={3}>
                <TextField
                variant="outlined"
                id="standard-select-currency"
                select
                label="Product Name"
                value={currency}
                onChange={handleChange}
                helperText="Please select your currency"
                >
                {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </TextField>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                <TextField id="outlined-basic" label="Subtitle" variant="outlined" />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                <TextField id="outlined-basic" label="Units" variant="outlined" />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                <TextField id="outlined-basic" label="Decryption" variant="outlined" />
                </Grid>   
                <Grid item xs={12} md={6} lg={3}>
                <TextField id="outlined-basic" label="Discount(%)" variant="outlined" />
                </Grid>  
                <Grid item xs={12} md={6} lg={3}>
                <TextField id="outlined-basic" label="Original Price" variant="outlined" />
                </Grid>  
                <Grid item xs={12} md={6} lg={3}>
                <TextField id="outlined-basic" label="Price" variant="outlined" />
                </Grid>  
                <Grid item xs={12} md={6} lg={3}>
                <TextField id="outlined-basic" label="SKU" variant="outlined" />
                </Grid>  
                <Grid item xs={12} md={6} lg={3}>
                <FormControl component="fieldset">
                <FormLabel component="legend">Visibility in Homeo App</FormLabel>
                <RadioGroup row  aria-label="gender" name="gender1" value={value} onChange={handleChangeProduct}>
                    <FormControlLabel value="show" control={<Radio />} label="Show" />
                    <FormControlLabel value="hide" control={<Radio />} label="Hide" />
                    {/* <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
                </RadioGroup>
                </FormControl>
                </Grid>  
            </Grid>
            </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
            <Grid container>
            <Card className={classes.placeholder}>
                <CardMedia
                className={classes.media}
                image="http://tomatosphere.letstalkscience.ca/Portals/5/Resource-Images/5768.jpg"
                title="Contemplative Reptile"
                />
            </Card>
            </Grid>
        </Grid>

      
      </Grid>
    </div>

    {/* <div className={classes.root}>   
      <div>
        <TextField
          label="With normal TextField"
          id="outlined-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
          }}
          variant="outlined"
        />
        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-weight"
            value={values.weight}
            onChange={handleChange('weight')}
            endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
            labelWidth={0}
          />
          <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText>
        </FormControl>
        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
        
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={values.amount}
            onChange={handleChange('amount')}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            labelWidth={60}
          />
        </FormControl> 
      </div>
    </div>*/}
    </>
  );
}
