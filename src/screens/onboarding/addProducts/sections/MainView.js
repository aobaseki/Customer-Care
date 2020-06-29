import React, {useState} from 'react';
import AppBar from "@material-ui/core/AppBar/AppBar";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import SwipeableViews from "react-swipeable-views";
import TabPanel from "../../../../components/Tabs/TabPanel";
import SearchMode from "./search/SearchMode";
import BarcodeMode from "./barcode/BarcodeMode";
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import MainDialog from "../../../../components/Dialog/MainDialog";
import Typography from "@material-ui/core/Typography/Typography";
import MenuIcon from '@material-ui/icons/Menu';
import SectionNavbars from "../../../../components/Sections/SectionNavbars";
import PrimaryLoader from "../../../../components/Loader/Loader";
import Drawer from "../../../../components/Drawer/Drawer";
import Grid from "@material-ui/core/Grid/Grid";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {makeStyles} from "@material-ui/core";
import BottomDrawer from "../../../../components/Drawer/BottomDrawer/BottomDrawer";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ListItemText from '@material-ui/core/ListItemText';
import paths from "../../../../utilities/paths";
import {withRouter} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    tabPrimaryColor: {
        backgroundColor: `#daab59 !important`,
        color: `#daab59 !important`,
    },
}));

const MainView = props => {
    const { history } = props;
    const [value , setValue] = useState(0);
    const [mainDialog, setMainDialog] = useState(false);
    const [isShowDrawer , setIsShowDrawer] = useState(false);
    const [isDrawerShow , setIsDrawerShow] = useState(false);

    const a11yProps = (index) => {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    };

    const addProduct = (pId , event) => {
        props.productAdd(pId , 1);
    };

    const removeProduct = (pId , event) => {
        props.removeProduct(pId);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
        props.searchHandler(' ');
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    const openDialogHandler = (event) => {
        const returnPage = localStorage.getItem('redirectPath') || '';

        if(returnPage){
            props.finishAddProducts();
        }else{
            setMainDialog(true);
        }
    };

    const closeDialogHandler = (event) => {
        setMainDialog(false);
    };

    const finsihHandler = (event) => {
        props.finishAddProducts();
    };

    const openMenu = () => {
        const addedProducts = localStorage.getItem("branchProductsAdded") || "";

        if(addedProducts){
            openDialogHandler()
        }else{
            setIsDrawerShow(true)
        }
    };

    const styles = useStyles();

    return(
        <div>
            <SectionNavbars
                title={`Add Product`}
                leftIcon={
                    <div onClick={openMenu}>
                        <MenuIcon
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
                        key={1}
                        onClick={() => history.push(paths.category_setup)}
                    >
                        <ListItemIcon><AddCircleOutlineIcon style={{color: '#707070'}} /></ListItemIcon>
                        <ListItemText primary="Add category" />
                    </ListItem>
                </BottomDrawer>
            </div>

            <p style={{marginTop: '70px', fontSize: '16px', fontWeight: '400', color: '#616161'}}>Select all the products you have in your shop</p>

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

            <MainDialog handleDialogClose={closeDialogHandler.bind(this)} states={mainDialog}>
                <div className="row p-3 pt-0 mx-auto text-center">

                    <Typography
                        component="p"
                        variant="h6"
                        style={{fontSize: '16px' , margin: '0px 0px', padding: '16px', lineHeight: '1.3'}}
                        className={`text-center mb-2 mx-auto text-dark font-weight-bold`}
                    >
                        You have not stocked up all the products in the list.
                    </Typography>

                    <div className="text-center mx-auto">
                        <label style={{fontWeight: '500'}}>I want to complete stock info.</label>
                        <Button
                            variant="outlined"
                            style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 80px'}}
                            onClick={closeDialogHandler.bind(this)}
                            className={`capitalization mt-2`}
                            disabled={props.loading}
                        >
                            Go back
                        </Button>
                    </div>

                    <div className="text-center mx-auto my-4">
                        <label style={{fontWeight: '500'}}>I have finished adding products.</label>
                        <Button
                            variant="outlined"
                            style={{'backgroundColor': '#DAAB59' , border: '1px solid #DAAB59', color: '#000000', padding: '7px 86px'}}
                            onClick={finsihHandler.bind(this)}
                            className={`capitalization mt-2`}
                            disabled={props.loading}
                        >
                            {
                                props.loading ?
                                    <PrimaryLoader
                                        style={{width: '30px' , height: '2.5rem'}}
                                        color="#FFFFFF"
                                        type="Oval"
                                        className={`mt-1`}
                                        width={25}
                                        height={25}
                                    />
                                    :
                                    'Finish'
                            }
                        </Button>
                    </div>
                </div>
            </MainDialog>

            <SwipeableViews
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0}>
                    <SearchMode setView={props.setView} searchValue={props.searchValue} searchHandler={props.searchHandler} optionFilter={props.optionFilter} products={props.products} productAdd={addProduct.bind(this)} removeProduct={removeProduct.bind(this)}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <BarcodeMode product={props.product} setView={props.setView} searchBarcode={props.searchBarcode} />
                </TabPanel>
            </SwipeableViews>
            <Box
                className={`shadow1 bg-white`}
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Grid container >
                    <Grid item xs={12} >
                        <Button
                            variant="contained"
                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '7px 80px', fontSize: '14px'}}

                            className={`capitalization font-weight-bold text-dark`}
                            onClick={openDialogHandler.bind(this)}
                        >
                            Finish
                            {/*<span className={`btnPCount`}>
                                {props.spCount}
                            </span>*/}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
};

export default withRouter(MainView);
