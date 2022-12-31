import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
    height: "100vh",
  },
  tabheight: {
    height: "calc(100vh - 48px)",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 5,
  },
}));
