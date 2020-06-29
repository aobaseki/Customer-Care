import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SectionNavbar from '../../../components/Sections/SectionNavbars';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import SwipeableViews from "react-swipeable-views";
import TabPanel from "../../../components/Tabs/TabPanel";
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import Drawer from "../../../components/Drawer/Drawer";

import ViewCashIn from './ViewCashIn';
import ViewReport from './ViewReport';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop: '70px',
      marginBottom: '3px',
    },
    title: {
        fontSize: '11px',
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
    },
    money: {
        fontSize: '17px',
        
    },
    tabs: {
        textTransform: 'none',
    }
}));

const cashInValues = [
    {
      value: 'Sales',
      label: 'Sales',
    },
    {
      value: 'Credit',
      label: 'Credit',
    },
    {
      value: 'Loan',
      label: 'Loan',
    },
    {
      value: 'Owner',
      label: 'Owner',
    },
    {
      value: 'Reconciliation',
      label: 'Reconciliation',
    },
  ];

  const cashOutValues = [
    {
      value: 'Offloading',
      label: 'Offloading fee',
    },
    {
      value: 'Food',
      label: 'Food',
    },
    {
      value: 'Transport',
      label: 'Transport',
    },
    {
      value: 'Cleaning',
      label: 'Cleaning services',
    },
    {
      value: 'Software',
      label: 'Software expenses',
    },
    {
        value: 'Staff',
        label: 'Staff salary',
    },
    {
        value: 'Electricity',
        label: 'Electricity',
    },
    {
        value: 'Water',
        label: 'Water',
    },
    {
        value: 'Local',
        label: 'Local authority',
    },
    {
        value: 'Business',
        label: 'Business operating fee',
    },
    {
        value: 'Fuel',
        label: 'Fuel',
    },
    {
        value: 'Rent',
        label: 'Rent',
    },
    {
        value: 'Gift',
        label: 'Gift',
    },
    {
        value: 'Owner',
        label: 'Owners salary',
    }
];


const MainView = props => {
    const classes = useStyles();
    const [value , setValue] = useState(0);
    const [isDrawerShow , setIsDrawerShow] = useState(false);
    const a11yProps = (index) => {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
  
    const handleChangeIndex = index => {
        setValue(index);
    };

    const deleteHandlerIn = (event) => {
        props.deleteCashIn(event);
    };

    const deleteHandlerOut = (event) => {
        props.deleteCashOut(event);
    };

    const addNewItem = (event) => {
        props.addCashIn(event);
    };

    const addAnotherItem = (event) => {
        props.addCashOut(event);
    };

    const changeIn = (event) => {
        props.changesCashIn(event);
    };

    const changeOut = (event) => {
        props.changesCashOut(event);
    };

    const handAnotherCashIn = (event) => {
        props.handleEditIn(event);
    };

    const handAnotherCashOut = (event) => {
        props.handleEditOut(event);
    };

    return(
        <div>
            <SectionNavbar 
                title="Accounting"
                icons={
                    <MoreVertIcon
                    style={{fontSize: '2rem'}}
                />
                }
                leftIcon={
                    <div onClick={() => setIsDrawerShow(true)}>
                        <MenuIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
            />

            <div
                onClick={() => setIsDrawerShow(false)}
                onKeyDown={() => setIsDrawerShow(false)}
            >
                <Drawer isShow={isDrawerShow} />
            </div>

            <Grid container spacing={1} className={classes.root} >
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Today's sales
                        </Typography>
                        <Typography className={classes.money} component="h1" variant="h6" >
                            GHC 500.00
                        </Typography>
                    </Paper>
                </Grid>
                
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Today's purchases
                        </Typography>
                        <Typography className={classes.money} component="h1" variant="h6" >
                            GHC 100.00
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Credit sales
                        </Typography>
                        <Typography className={classes.money} component="h1" variant="h6" >
                            GHC 0.00
                        </Typography>
                    </Paper>
                </Grid>

            </Grid>

            <AppBar position="static" color="white">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Cash in" className={classes.tabs}  {...a11yProps(0)} />
                    <Tab label="Cash out" className={classes.tabs}  {...a11yProps(1)} />
                    <Tab label="Report" className={classes.tabs}  {...a11yProps(2)} />
                </Tabs>
            </AppBar>

            <SwipeableViews
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} >
                    <ViewCashIn 
                        addItem={addNewItem.bind(this)} 
                        handAchange={handAnotherCashIn.bind(this)}
                        handle={changeIn.bind(this)} 
                        deleteCollection={deleteHandlerIn.bind(this)}
                        amtValue={props.amountValCashIn} 
                        items={props.listOfCashInItems} 
                        defaultUser="Sales"
                        topic="Collections for today"
                        labels="Received from"
                        values={cashInValues}
                    />
                </TabPanel>

                <TabPanel value={value} index={1} >
                    <ViewCashIn 
                        addItem={addAnotherItem.bind(this)} 
                        handAchange={handAnotherCashOut.bind(this)}
                        handle={changeOut.bind(this)} 
                        deleteCollection={deleteHandlerOut.bind(this)}
                        amtValue={props.amountValCashOut} 
                        items={props.listOfCashOutItems} 
                        defaultUser="Offloading fee"
                        topic="Expenses for today"
                        labels="Paid to"
                        values={cashOutValues}
                    />
                </TabPanel>
                <TabPanel value={value} index={2} >
                    
                    <ViewReport 
                        CashInItems={props.listOfCashInItems}
                        CashOutItems={props.listOfCashOutItems}
                    />
                </TabPanel>
            </SwipeableViews>

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
             
                <Button
                    variant="contained"
                    style={{backgroundColor:'#DAAB59' , color: '#333333', padding: '5px 40px', textTransform: 'none', fontSize:'17px'}}
                >
                    View cash in
                </Button> 
                
            </Box>


        </div>

    )

}

export default MainView;