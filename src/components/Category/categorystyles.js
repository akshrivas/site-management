import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      // backgroundColor: theme.palette.background.paper,
      height:'100%'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    categorySearch: {
      display: 'flex'
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    button: {
      width: '100%',
      marginTop: '10px'
    },
    actionItem: {
      '& > *': {
        margin: theme.spacing(1),
      },
    }
}));