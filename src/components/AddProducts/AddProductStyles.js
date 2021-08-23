import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f4f4ff',
    '& .MuiTextField-root': {
      width: '100%',
    },
  },
  //   margin: {
  //     margin: theme.spacing(1),
  //   },
  //   withoutLabel: {
  //     marginTop: theme.spacing(3),
  //   },
  //   textField: {
  //     width: '25ch',
  //   },
  paper: {
    padding: theme.spacing(2),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  placeholder: {
    width: '100%',
    height: '100%',
    // margin: '20px'
  },
  media: {
    height: 350,
  },
  mediaDiv:{
    height: 350,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    display: 'none'
  },
  appBar: {
    position: 'relative',
  },
  title: {
    flex: 1,
  },
}));
