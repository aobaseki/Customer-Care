import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography/Typography";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import SwipeableViews from "react-swipeable-views";
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import { withRouter } from "react-router-dom";

import SectionNavbars from "../../../components/Sections/SectionNavbars";
import Drawer from "../../../components/Drawer/Drawer";
import TabPanel from "../../../components/Tabs/TabPanel";
import Collections from './Collections';
import Expenses from './Expenses';

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

const MainPage = props => {

    const classes = useStyles();
    const [isDrawerShow , setIsDrawerShow] = useState(false);
    const [value , setValue] = useState(0);

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

    const historyHandler = (event) => {
        props.setView(1);
    };

    return (
        <div>
            <SectionNavbars
                title="Accounting"
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
                    <Tab label="Collections" className={classes.tabs}  {...a11yProps(0)} />
                    <Tab label="Expenses" className={classes.tabs}  {...a11yProps(1)} />
                </Tabs>
            </AppBar>

            <SwipeableViews
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} >
                    <Collections collection={props.collection} />
                </TabPanel>

                <TabPanel value={value} index={1} >
                    <Expenses  expense={props.collection} />
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
                    style={{backgroundColor:'#DAAB59' , color: '#333333', padding: '5px 40px', textTransform: 'none', fontSize:'15px'}}
                    onClick={historyHandler.bind(this)}
                >
                    View history
                </Button> 
                
            </Box>

        </div>
    )
}

export default withRouter(MainPage);
