import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {useStyles} from './dashboardStyles';
import Category from '../Category';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  

  
  export default function Dashboard() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Order" {...a11yProps(0)} />
            <Tab label="Delivered" {...a11yProps(1)} />
            <Tab label="Category" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel className={classes.tabheight} value={value} index={0}>
          Order
        </TabPanel>
        <TabPanel className={classes.tabheight} value={value} index={1}>
          Delivered
        </TabPanel>
        <TabPanel className={classes.tabheight} value={value} index={2}>
          <Category style={{height: '100%'}} />
        </TabPanel>
      </div>
    );
  }