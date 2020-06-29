import React, {useState} from 'react';
import Tabs from "@material-ui/core/Tabs/Tabs";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Tab from "@material-ui/core/Tab/Tab";
import AppBar from "@material-ui/core/AppBar/AppBar";
import TabPanel from "../../../components/Tabs/TabPanel";
import SwipeableViews from "react-swipeable-views";
import Box from "@material-ui/core/Box/Box";
import {withRouter} from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import SectionNavbars from "../../../components/Sections/SectionNavbars";
import SecondaryButton from "../../../components/Buttons/SecondaryButton";
import AuditSearchMode from "./searchMode/AuditSearchMode";
import AuditBarcodeMode from "./barcodeMode/AuditBarcodeMode";
import Drawer from "../../../components/Drawer/Drawer";
import BottomDrawer from "../../../components/Drawer/BottomDrawer/BottomDrawer";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import Divider from '@material-ui/core/Divider';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { Grid } from '@material-ui/core';
import {makeStyles} from "@material-ui/core";
import paths from "../../../utilities/paths";
import AppsIcon from '@material-ui/icons/Apps';

const useStyles = makeStyles(theme => ({
    tabPrimaryColor: {
        backgroundColor: `#daab59 !important`,
        color: `#daab59 !important`,
    },
}));


const MainAuditView = props => {
    const { history } = props;
    const styles = useStyles();
    const branchProducts = props.branchProducts;
    const spCount = props.spCount;
    const [value , setValue] = useState(0);
    const [isDrawerShow , setIsDrawerShow] = useState(false);
    const [isShowDrawer , setIsShowDrawer] = useState(false);

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

    const setView = (view) => {
        props.setView(view);
    };

    return (
        <div
        >
            <SectionNavbars
                title={`Audit`}
                leftIcon={
                    <div onClick={() => setIsDrawerShow(true)}>
                        <MenuIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
                rightIcon={
                    <div onClick={() => history.push(paths.dashboard)}>
                        <AppsIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
                icons={
                    <div onClick={() => setIsShowDrawer(!isShowDrawer)}>
                        <MoreVertIcon
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

            <div
                onClick={() => setIsShowDrawer(false)}
                onKeyDown={() => setIsShowDrawer(false)}
            >
                <BottomDrawer isShow={isShowDrawer}>
                    <ListItem
                        button
                        key={8}
                        onClick={setView.bind(this , 3)}
                    >
                        <ListItemIcon><HistoryOutlinedIcon/></ListItemIcon>
                        <ListItemText primary="Audit history" />
                    </ListItem>
                    <Divider/>
                    <ListItem
                        button
                        key={10}
                        onClick={() => setIsShowDrawer(false)}
                    >
                        <ListItemIcon><CloseOutlinedIcon/></ListItemIcon>
                        <ListItemText primary="Cancel" />
                    </ListItem>
                </BottomDrawer>
            </div>

            <div
                className={`mb-6 mx-0 mt-6`}
            >
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        classes= {{
                            indicator: styles.tabPrimaryColor
                        }}
                    >
                        <Tab label="Search mode" {...a11yProps(0)} />
                        <Tab label="Barcode mode" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>

                <SwipeableViews
                    index={value}
                    onChangeIndex={handleChangeIndex}
                    style={{backgroundColor: '#F3F3F3'}}
                >
                    <TabPanel value={value} index={0}>
                        <AuditSearchMode branchProducts={branchProducts} setView={props.setView} searchHandler={props.searchHandler} productAdd={props.productAdd} products={props.products}/>
                    </TabPanel>
                    <TabPanel value={value} index={1} >
                        <AuditBarcodeMode product={props.product} setView={props.setView} searchBarcode={props.searchBarcode}/>
                    </TabPanel>
                </SwipeableViews>
            </div>

            <Box
                className={`shadow1 bg-white`}
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <div
                    onClick={() => props.setView(2)}
                >
                    <Grid container >
                        <Grid item xs={12} >
                            <SecondaryButton
                                classes={`capitalization font-weight-bold text-dark`}
                            >
                                View counted products
                                <span style={{
                                    fontSize: '12px',
                                    color: '#000000',
                                    position: 'absolute',
                                    top: -10,
                                    right: '5%',
                                    backgroundColor: '#FFFFFF',
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    fontWeight: '500'
                                }}
                                >
                                    {spCount}
                                </span>
                            </SecondaryButton>
                        </Grid>
                    </Grid>
                </div>
            </Box>
        </div>
    )
};

export default withRouter(MainAuditView);
