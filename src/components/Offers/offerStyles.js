import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    actionItem: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    table: {
        minWidth: '100%',
    },
}));