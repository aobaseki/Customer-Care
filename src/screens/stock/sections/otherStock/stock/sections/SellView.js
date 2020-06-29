import React, {useState} from 'react';
import SystemDate from "../../../../../../components/Date/SystemDate";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import AppBar from "@material-ui/core/AppBar/AppBar";
import TabPanel from "../../../../../../components/Tabs/TabPanel";
import SwipeableViews from "react-swipeable-views";
import Box from "@material-ui/core/Box/Box";
import {withRouter} from 'react-router-dom';
import paths from "../../../../../../utilities/paths";
import SellSearchMode from "./SearchMode/SellSearchMode";
import SectionNavbars from "../../../../../../components/Sections/SectionNavbars";
import BarcodeMode from "./BarcodeMode/BarcodeMode";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import SecondaryButton from "../../../../../../components/Buttons/SecondaryButton";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    tabPrimaryColor: {
        backgroundColor: `#daab59 !important`,
        color: `#daab59 !important`,
    },
}));

const SellView = props => {
    const { history } = props;
    const styles = useStyles();
    const branchProducts = props.branchProducts;
    const spCount = props.spCount;
    const [value , setValue] = useState(0);

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

    return (
        <div
        >
            <SectionNavbars
                title={`Other stock`}
                icons={
                    <div onClick={() => history.push(paths.purchase_history)}>
                        <AccessTimeIcon
                            style={{fontSize: '2rem'}}
                        /><br />
                        <div style={{fontSize: '10px', marginTop: '-5px'}} >History</div>
                    </div>
                }
                leftIcon={
                    <div onClick={() => history.goBack()} >
                        <ArrowBackIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
            />

            <div
                className={`mb-7 mx-0 mt-7`}
            >
                <SystemDate/>

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
                    <SellSearchMode addToCart={props.addToCart} undoProductAdd={props.undoProductAdd} savedCartCount={props.savedCartCount} branchProducts={branchProducts} setView={props.setView} searchHandler={props.searchHandler} productAdd={props.productAdd} products={props.products}/>
                </TabPanel>
                <TabPanel value={value} index={1} >
                    <BarcodeMode product={props.product} setView={props.setView} searchBarcode={props.searchBarcode}/>
                </TabPanel>
            </SwipeableViews>

            </div>

            <Box
                className={`shadow1 bg-white`}
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <div
                    onClick={() => history.push(paths.other_cart)}
                >
                    <SecondaryButton
                        classes={`capitalization font-weight-bold text-dark`}
                    >
                        View cart
                        <ShoppingCartOutlinedIcon
                            style={{paddingLeft: '10px' , fontSize: '16px'}}
                        />
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
                </div>
            </Box>
        </div>
    )
};

export default withRouter(SellView);
