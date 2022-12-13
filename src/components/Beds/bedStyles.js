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
    warm: {
      background: '#FEAF5E',
      color: '#000'
    },
    hot: {
      background: '#FF6500',
      color: '#000'
    },
    onlyWorms: {
      background: '#FF2E01',
      color: '#fff'
    }
}));