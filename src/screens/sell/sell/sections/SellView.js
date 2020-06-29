import React, {useState} from 'react';
import SystemDate from "../../../../components/Date/SystemDate";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import AppBar from "@material-ui/core/AppBar/AppBar";
import TabPanel from "../../../../components/Tabs/TabPanel";
import SwipeableViews from "react-swipeable-views";
import Box from "@material-ui/core/Box/Box";
import {withRouter} from 'react-router-dom';
import paths from "../../../../utilities/paths";
import SellSearchMode from "./SearchMode/SellSearchMode";
import MenuIcon from '@material-ui/icons/Menu';
import SectionNavbars from "../../../../components/Sections/SectionNavbars";
import BarcodeMode from "./BarcodeMode/BarcodeMode";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import BottomDrawer from "../../../../components/Drawer/BottomDrawer/BottomDrawer";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import SecondaryButton from "../../../../components/Buttons/SecondaryButton";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import RemoveShoppingCartOutlinedIcon from '@material-ui/icons/RemoveShoppingCartOutlined';
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import Divider from '@material-ui/core/Divider';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Drawer from "../../../../components/Drawer/Drawer";
import CardDefault from "../../../../components/Cards/CardDefault";
import Typography from "@material-ui/core/Typography/Typography";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import MainDialog from "../../../../components/Dialog/MainDialog";
import Grid from "@material-ui/core/Grid/Grid";
import Switch from '@material-ui/core/Switch';
import AppsIcon from '@material-ui/icons/Apps';
import EditIcon from '@material-ui/icons/Edit';
import Button from "@material-ui/core/Button/Button";

import LocalInfo from "../../../../services/LocalInfo";
import {makeStyles , withStyles} from "@material-ui/core";

const PrimarySwitch = withStyles({
    switchBase: {
        color: `#009688 !important`,
        '&$checked': {
            color: `#009688 !important`,
        },
        '&$checked + $track': {
            backgroundColor: `#009688 !important`,
        },
    },
    root: {
        float: `right !important`,
    },
    checked: {},
    track: {},
})(Switch);

const useStyles = makeStyles({
    backgroundColor: {
        backgroundColor: `#009688 !important`
    },
    tabPrimaryColor: {
        backgroundColor: `#daab59 !important`,
        color: `#daab59 !important`,
    },
});

const SellView = props => {
    const classes = useStyles();

    const { history } = props;
    const [settingsState, setSettingsState] = useState({
        aggregateSales: LocalInfo.aggregateSales,
        checkoutSales: LocalInfo.checkoutSales,
    });

    const branchProducts = props.branchProducts;
    const salesMade = (parseFloat(props.salesTodayDetails.total)).toFixed(2);
    const profitMade = (parseFloat(props.salesTodayDetails.profit)).toFixed(2);
    const spCount = props.spCount;
    const [value , setValue] = useState(0);
    const [isShowDrawer , setIsShowDrawer] = useState(false);
    const [isDrawerShow , setIsDrawerShow] = useState(false);
    const [openSettingsState , setOpenSettingsState] = useState(false);
    const a11yProps = (index) => {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
        props.searchHandler(' ');
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    const getDateValue = (date) => {
        props.getDateSaleDetails(date);
    };

    const handleSettingsChange = (event) => {
        event.persist();
        setSettingsState({ ...settingsState, [event.target.name]: event.target.checked });
        LocalInfo.branchSettings(event);
    };

    return (
        <div
        >
            <SectionNavbars
                title={`Sales`}
                icons={
                    <div onClick={() => setIsShowDrawer(!isShowDrawer)}>
                        <MoreVertIcon
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

            <div
                onClick={() => setIsShowDrawer(false)}
                onKeyDown={() => setIsShowDrawer(false)}
            >
                <BottomDrawer isShow={isShowDrawer}>
                    <ListItem
                        button
                        key={1}
                        onClick={() => history.push(paths.sales_history)}
                    >
                        <ListItemIcon><HistoryOutlinedIcon/></ListItemIcon>
                        <ListItemText primary="Sales history" />
                    </ListItem>
                    <ListItem
                        button
                        key={2}
                        onClick={() => history.push(paths.invoice_history)}
                    >
                        <ListItemIcon><ReceiptIcon /></ListItemIcon>
                        <ListItemText primary="Invoices" />
                    </ListItem>
                    <ListItem
                        button
                        key={3}
                        onClick={() => history.push(paths.credit_sales)}
                    >
                        <ListItemIcon><AccountBalanceWalletIcon /></ListItemIcon>
                        <ListItemText primary="Credit view" />
                    </ListItem>
                    <ListItem
                        button
                        key={4}
                        onClick={() => history.push(paths.admin_customers)}
                    >
                        <ListItemIcon><PeopleIcon /></ListItemIcon>
                        <ListItemText primary="Customers" />
                    </ListItem>
                    <ListItem
                        button
                        key={5}
                        onClick={() => history.push(paths.sales_returns)}
                    >
                        <ListItemIcon><RemoveShoppingCartOutlinedIcon/></ListItemIcon>
                        <ListItemText primary="Sales returns" />
                    </ListItem>
                    <ListItem
                        button
                        key={6}
                        onClick={() => setOpenSettingsState(true)}
                    >
                        <ListItemIcon><SettingsIcon/></ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItem>
                    <ListItem
                        button
                        key={7}
                        onClick={() => history.push(paths.change_price)}
                    >
                        <ListItemIcon><EditIcon/></ListItemIcon>
                        <ListItemText primary="Change price" />
                    </ListItem>
                    <Divider/>
                    <ListItem
                        button
                        key={8}
                        onClick={() => setIsShowDrawer(false)}
                    >
                        <ListItemIcon><CloseOutlinedIcon/></ListItemIcon>
                        <ListItemText primary="Cancel" />
                    </ListItem>
                </BottomDrawer>
            </div>

            <div
                className={`mb-7 mx-0 mt-6`}
            >
                <SystemDate returnValue={true} getValue={getDateValue}/>

                <div
                    style={{
                        display: 'flex',
                        width: '85%',
                        alignItems: 'center',
                        margin: 'auto',
                        marginBottom: '10px' ,
                    }}
                >
                    <div
                        style={{
                            marginTop: '0px' ,
                            flex: 1,
                            marginRight: '10px',
                            borderRadius: '15px',
                        }}
                        onClick={() => history.push(paths.sales_history)}>
                        <CardDefault>
                            <Typography
                                component="p"
                                variant="h6"
                                style={{fontWeight: '300', fontSize: '0.9rem'}}
                                className="italize"
                            >
                                Sales
                            </Typography>

                            <Typography
                                component="p"
                                variant="h6"
                                style={{fontWeight: '700', fontSize: '1.0rem'}}
                            >
                                GHC {salesMade}
                            </Typography>

                        </CardDefault>
                    </div>

                    <div
                        style={{
                            marginTop: '0px' ,
                            flex: 1,
                            marginLeft: '10px',
                            borderRadius: '15px',
                        }}
                        onClick={() => history.push(paths.sales_history)}>
                        <CardDefault>
                            <Typography
                                component="p"
                                variant="h6"
                                style={{fontWeight: '300', fontSize: '0.9rem'}}
                                className="italize"
                            >
                                Profit
                            </Typography>

                            <Typography
                                component="p"
                                variant="h6"
                                style={{fontWeight: '700', fontSize: '1.0rem'}}
                            >
                                GHC {profitMade}
                            </Typography>
                        </CardDefault>
                    </div>
                </div>

                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        classes= {{
                            indicator: classes.tabPrimaryColor
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
                    <SellSearchMode addToCart={props.addToCart} undoProductAdd={props.undoProductAdd} savedCartCount={props.savedCartCount} branchProducts={branchProducts} setView={props.setView} searchHandler={props.searchHandler} productAdd={props.productAdd} products={props.products}/>
                </TabPanel>
                <TabPanel value={value} index={1} >
                    <BarcodeMode product={props.product} setView={props.setView} searchBarcode={props.searchBarcode}/>
                </TabPanel>
            </SwipeableViews>

            </div>

            <MainDialog
                title={`Settings`}
                handleDialogClose={() => setOpenSettingsState(false)}
                states={openSettingsState}
            >
                <Grid container spacing={1} className={`mb-3`}>
                    <Grid item xs={12} className={`bordered px-2`} style={{ margin: '10px 0px 0px 0px'}} >
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography
                                    component="h6"
                                    variant="h6"
                                    className={`py-2 text-left`}
                                    style={{fontSize: '18px' , margin: '0px 0px' , fontWeight: '600'}}
                                >
                                    Checkout
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <PrimarySwitch
                                    size={`medium`}
                                    checked={settingsState.checkoutSales}
                                    onChange={handleSettingsChange}
                                    name="checkoutSales"
                                />
                            </Grid>
                        </Grid>

                        <Typography
                            component="p"
                            variant="h6"
                            className={`py-2 text-left`}
                            style={{fontSize: '16px' , margin: '0px 0px'}}
                        >
                            Switch on to use the checkout feature or if you record sales individually.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={`bordered px-2`} style={{ margin: '10px 0px 0px 0px'}} >
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography
                                    component="h6"
                                    variant="h6"
                                    className={`py-2 text-left`}
                                    style={{fontSize: '18px' , margin: '0px 0px' , fontWeight: '600'}}
                                >
                                    Aggregate
                                </Typography>
                            </Grid>
                            <Grid item xs={6} style={{float: 'right'}}>
                                <PrimarySwitch
                                    size={`medium`}
                                    checked={settingsState.aggregateSales}
                                    onChange={handleSettingsChange}
                                    name="aggregateSales"
                                />
                            </Grid>
                        </Grid>

                        <Typography
                            component="p"
                            variant="h6"
                            className={`py-2 text-left`}
                            style={{fontSize: '16px' , margin: '0px 0px'}}
                        >
                            Switch on to record different instances of a product separately in cart.
                        </Typography>
                    </Grid>
                </Grid>

                <div onClick={() => setOpenSettingsState(false)}>
                    <SecondaryButton
                        classes={`capitalization font-weight-bold text-dark`}
                    >
                        Finish
                    </SecondaryButton>
                </div>

            </MainDialog>

            <Box
                className={`shadow1 bg-white`}
                p={1}
                style={{ height: '2.5rem', position: "fixed", padding: '5px 5%', bottom:"0", width:"96%" , display: 'flex' , alignItems: 'center', justifyContent: 'space-around'}}
            >
                <div style={{flex: 1}}
                     onClick={() => history.push(paths.stock)}
                >
                    <Button
                        variant="outlined"
                        style={{border: '1px solid #DAAB59', color: '#333333', padding: '5px 30px', textTransform: 'none', fontSize:'17px', float: 'right', marginRight: '5px'}}
                    >
                        Add stock
                    </Button>
                </div>
                <div
                    style={{flex: 1}}
                    onClick={() => history.push(paths.cart)}
                >
                    <Button
                        variant="contained"
                        style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 20px', textTransform: 'none', fontSize:'17px', float: 'left', marginLeft: '5px'}}
                    >
                        View cart
                        <ShoppingCartOutlinedIcon
                            style={{paddingLeft: '10px' , fontSize: '20px'}}
                        />
                        <span style={{
                            fontSize: '15px',
                            color: '#000000',
                            position: 'absolute',
                            top: -10,
                            right: '5%',
                            backgroundColor: '#FFFFFF',
                            width: '25px',
                            height: '25px',
                            borderRadius: '50%',
                            fontWeight: '500'
                        }}
                        >
                            {spCount}
                        </span>
                    </Button>
                </div>
            </Box>
        </div>
    )
};

export default withRouter(SellView);
