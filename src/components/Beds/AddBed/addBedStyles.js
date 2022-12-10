import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    input: {
        display: 'none'
    },
    placeholder: {
        width: '100%',
        height: '100%',
        // margin: '20px'
    },
    media: {
        height: 350,
    },
    mediaDiv: {
        height: 350,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
}));