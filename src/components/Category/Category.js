import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import SaveIcon from '@material-ui/icons/Save';

import FormLabel from '@material-ui/core/FormLabel';
import {useStyles} from './categorystyles';
import CategoryList from './CategoryList';
import GroupList from './GroupList';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function Category() {
  const classes = useStyles();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [value, setValue] = React.useState('show');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <>
    <div className={classes.root}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{display: 'none'}}>
       Create Category
      </Button>


      <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} sm={3}>
            <div>
            <Paper component="form" className={classes.categorySearch}>
              <InputBase
                className={classes.input}
                placeholder="Search Google Maps"
                inputProps={{ 'aria-label': 'search google maps' }}
              />
              <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
            </div>
            <div style={{marginTop: '10px'}}>
              <Paper>
                <CategoryList />
              </Paper>
              
            </div>
            <div>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<SaveIcon />}
              onClick={handleClickOpen}
            >
              Add Category
            </Button>
            </div>
          </Grid>
          <Grid item xs={12} sm={9} >
            <Paper style={{padding: '10px'}}>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
              <Grid item>
              <Typography variant="h6" gutterBottom>
                Category Title
              </Typography>
              <Typography variant="p" gutterBottom>
                Category Description here
              </Typography>
              </Grid>
              <Grid item className={classes.actionItem}>
                <Button variant="outlined" onClick={handleClickOpen}>Add Group</Button>
                <Button variant="outlined" onClick={handleClickOpen}>Edit</Button> 
                <Button variant="outlined">Delete</Button>
              </Grid>
              </Grid>
            </Paper>
            <div style={{marginTop: '10px'}}>
            <GroupList />
            </div>
          </Grid>
      </Grid>


      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Create Category
        </DialogTitle>
        <DialogContent dividers>
        <form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField id="outlined-basic" label="Category Name" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Visibility in Homeo App</FormLabel>
              <RadioGroup row  aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                <FormControlLabel value="show" control={<Radio />} label="Show" />
                <FormControlLabel value="hide" control={<Radio />} label="Hide" />
                {/* <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField id="outlined-basic" label="Description" variant="outlined" />
          </Grid>
        </Grid>
        
        </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
           Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </>
  );
}
