import React, {useEffect , useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card/Card";
import Grid from "@material-ui/core/Grid/Grid";
import EditIcon from '@material-ui/icons/Edit';
import MainDialog from '../../../../../components/Dialog/ProductDialog';
import AppBar from '@material-ui/core/AppBar';
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import SwipeableViews from "react-swipeable-views";
import TabPanel from '../../../../../components/Tabs/TabPanel';
import Dates from '../../../../../components/Date/Date';
import Button from "@material-ui/core/Button/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import QuantityInput from "../../../../Components/Input/QuantityInput";
import {faCalculator} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Paper from "@material-ui/core/Paper/Paper";
import InputBase from "@material-ui/core/InputBase/InputBase";
import fromUnixTime from 'date-fns/fromUnixTime';
import Avatar from "@material-ui/core/Avatar/Avatar";

import format from "date-fns/format";
import BranchStockService from '../../../../../services/BranchStockService';
import ProductServiceHandler from "../../../../../services/ProductServiceHandler";
import SwapHorizOutlinedIcon from '@material-ui/icons/SwapHorizOutlined';
import UnitCost from '../../../../Components/Input/UnitCost';

const useStyles = makeStyles(theme => ({
    root: {
        width: '90%',
        display: 'flex',
        padding: '2px 5px',
        alignItems: 'center',
        borderRadius: '5px',
        height: '35px',
        border: '1px solid #ced4da',
        fontSize: '0.9rem',
        lineHeight: '1.5',
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        textAlign: 'center',
    },
    iconButton: {
        padding: 10,
    },
    tabs: {
        textTransform: 'none',
        fontWeight: 'bold',
        color: '#333333',
    }
  }));

const SingleDayView = props => {
    const classes = useStyles();
    const [mainDialog, setMainDialog] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const purchase = props.purchase;
    const [quantity , setQuantity] = useState(false);
    const [costPrice , setCostPrice] = useState(false);
    const [name , setName] = useState(false);
    const [image , setImage] = useState(false);
    const [product, setProduct] = useState(false);
    const [selectedDate , setSelectedDate] = useState('')
    const [unitCost , setUnitCost] = useState("");
    const [formFields , setFormFields] = useState({
        quantity: 1,
    });
    const [priceFields , setPriceFields] = useState({
        costPrice: '',
    });

    function a11yProps(index) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }

    const closeDialogHandler = (event) => {
        setMainDialog(false);
    };

    const openDialogHandler = (event) => {
        setMainDialog(true);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    const handleChangeIndex = index => {
        setValue(index);
    };

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!quantity) {
            getProduct();
        }
    });

    const getProduct = async () => {
        /*
        * @todo get entries via query on model
        * */
        const newProduct = await props.purchaseEntry.product.fetch();
        setProduct(newProduct);
        setImage(new ProductServiceHandler(product).getProductImage());
        setName(newProduct.name);
        const costP = await BranchStockService.getStockEntryCostPriceById(purchase.id);
        const quant = await BranchStockService.getStockProductQuantity(purchase.id);
        setCostPrice(costP);
        setQuantity(quant);

    };

    // const setInputValue = (name , value) => {
    //     const {...oldFormFields} = formFields;
    //     setQuantity(value);
    //     setCostPrice(value * purchase.costPrice);
    //     oldFormFields['quantity'] = value;
    //     setFormFields(oldFormFields);
    // };

    // const setPriceValue = (event) => {
    //     const {...oldFormFields} = priceFields;
    //     setCostPrice(event.target.value);
    //     oldFormFields['costPrice'] = event.target.value / quantity;
    //     setPriceFields(oldFormFields);
    // };

    const setInputValue = (name , value) => {
        const {...oldFormFields} = formFields;
        const {...oldPriceFields} = priceFields;

        if(name === 'costPrice'){
            setCostPrice((value * quantity).toFixed(2));
            oldPriceFields[name] = value;
            setPriceFields(oldPriceFields);
        }else if(name === 'quantity'){
            setCostPrice((value *  purchase.costPrice).toFixed(2));
            setQuantity(value);
            oldFormFields[name] = value;
            setFormFields(oldFormFields);
        }

    };

    const setTotalPriceHandler = event => {
        if(event.target.value === "" && typeof event.target.value !== 'number'){
            setCostPrice("");
            return true;
        }
        setCostPrice((event.target.value));
        setInputValue(event.target.name , event.target.value);
        const cp = (parseFloat(event.target.value) / quantity);

        const {...oldFormFields} = priceFields;

        oldFormFields['costPrice'] = cp.toFixed(2);

        setPriceFields(oldFormFields);
        setUnitCost(cp.toFixed(2));

    };

    const deleteHistoryHandler = (pId , event) => {
        setMainDialog(false);

        const response = props.deleteStoreProduct(pId , event);

        if(response){
            setSelectedDate('');
        }
    };

    const updateStockQuantity = () => {
        const response = props.updateStockQuantity(purchase.id, formFields);

        if(response){
            setSelectedDate('');
            setMainDialog(false);
        }
    };

    const setDateValue = (value) => {
        setSelectedDate(value)
    }

    const updateDateEntry = () => {
        const response = props.updateEntryDate(purchase.id , selectedDate);

        if(response){
            setSelectedDate('');
            setMainDialog(false);
        }
    };

    const updatePriceEntry = () => {
        console.log(priceFields)
        props.updatePriceEntry(purchase.id, priceFields);
        setMainDialog(false);
    };

    return(
        <div>
            <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
                <Grid item xs={3}>
                    <Avatar
                        alt={image}
                        src={image}
                        style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            margin: '10px auto',
                            textAlign: 'center',
                        }}
                    />
                </Grid>
                <Grid item xs={6} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                    <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                        <span className='text-dark font-weight-bold' >{name}</span>
                        <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Quantity: {quantity}</div>
                        <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Cost: GHC {costPrice}</div>
                    </div>
                </Grid>

                <Grid item xs={3} style={{height: '60px', margin: '10px 0px 0px 0px'}}>
                    <span className='text-dark font-weight-bold' >{format(new Date(purchase.createdAt) , "h:mm a")}</span>
                    <EditIcon
                        onClick={openDialogHandler.bind(this)}
                        style={{fontSize: '30px', color: '#DAAB59', textAlign: 'right'}}
                    />
                </Grid>
            </Grid>

            <MainDialog handleDialogClose={closeDialogHandler.bind(this)} states={mainDialog} >
                <div className="row pt-0 mx-auto text-center w-100" >
                    <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
                        <Grid item xs={3}>
                            <Avatar
                                alt={image}
                                src={image}
                                style={{
                                    width: "60px",
                                    height: "60px",
                                    borderRadius: "50%",
                                    margin: '10px auto',
                                    textAlign: 'center',
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                            <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                                <span className='text-dark font-weight-bold' >{name}</span>
                                <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Quantity: {quantity}</div>
                                <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Cost: GHC {costPrice}</div>
                            </div>
                        </Grid>
                        <Grid item xs={3} style={{marginTop: '30px'}}>
                            <DeleteIcon
                                onClick={deleteHistoryHandler.bind(this , purchase.id)}
                                style={{fontSize: '30px', color: '#DAAB59', textAlign: 'right'}}
                            />
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
                            <Tab className={classes.tabs} label="Change date"  {...a11yProps(0)} />
                            <Tab className={classes.tabs} label="Change quantity"  {...a11yProps(1)} />
                            <Tab className={classes.tabs} label="Change cost"  {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>

                    <SwipeableViews
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0} >

                            <label className={`text-dark py-2 text-center`} style={{fontSize: '18px', fontWeight: '600', paddingTop: '100px'}}> Pick new date </label>

                            <Dates initialValue={fromUnixTime(purchase.stockDate)} getValue={setDateValue.bind(this)} style={{margin: '5px 40px 0px 40px', border: '1px solid #e5e5e5', backgroundColor: '#FFFFFF', width: '150px'}} />

                            <Grid container spacing={1} style={{marginTop: '50px'}}>
                                <Grid item xs={6}>
                                    <Button
                                        variant="outlined"
                                        style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 30px', textTransform: 'none', fontSize:'15px'}}
                                        onClick={closeDialogHandler.bind(this)}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>

                                <Grid item xs={6}>
                                    <Button
                                        disabled={!selectedDate}
                                        variant="contained"
                                        style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 15px', textTransform: 'none', fontSize:'15px'}}
                                        onClick={updateDateEntry.bind(this)}
                                    >
                                        Save changes
                                    </Button>
                                </Grid>
                            </Grid>

                        </TabPanel>

                        <TabPanel value={value} index={1}  >

                            <QuantityInput style={{width: '100%', margin: '50px', paddingBottom: '30px'}} label={`Quantity`} inputName="quantity" getValue={setInputValue.bind(this)} startValue={quantity}/>

                            <Grid container spacing={1} style={{marginTop: '50px'}}>
                                <Grid item xs={6}>
                                    <Button
                                        variant="outlined"
                                        style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 30px', textTransform: 'none', fontSize:'15px'}}
                                        onClick={closeDialogHandler.bind(this)}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>

                                <Grid item xs={6}>
                                    <Button
                                        variant="contained"
                                        style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 15px', textTransform: 'none', fontSize:'15px'}}
                                        onClick={updateStockQuantity.bind(this)}
                                    >
                                        Save changes
                                    </Button>
                                </Grid>
                            </Grid>

                        </TabPanel>

                        <TabPanel value={value} index={2}  >

                            {/* <label className={`text-dark py-2 text-center`} style={{fontSize: '18px', fontWeight: '600', marginTop: '100px'}}> New cost price </label>

                            <Paper className={classes.root} id="selling_price" >
                                <InputBase
                                    className={`${classes.input} search-box text-center`}
                                    type="tel"

                                    value={costPrice}
                                    name='costPrice'
                                    onChange={(event) => setPriceValue(event)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                edge="end"
                                            >
                                                <FontAwesomeIcon  icon={faCalculator} fixedWidth />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </Paper> */}

                            <Grid container spacing={1} className={`my-2`}>
                                <Grid
                                    item xs={5}
                                >
                                    <label className={`text-dark py-2 text-center`} style={{fontSize: '18px', fontWeight: '600'}}> Total cost</label>

                                    <Paper className={classes.root} id="left_input" >
                                        <InputBase
                                            className={`${classes.input} search-box text-center`}
                                            type="tel"
                                            classes={{
                                                input: classes.center
                                            }}
                                            defaultValue=''
                                            value={costPrice}
                                            name="totalCost"
                                            onChange={(event) => setTotalPriceHandler(event)}
                                        />

                                    </Paper>
                                </Grid>
                                <Grid
                                    item xs={2}
                                >
                                    <SwapHorizOutlinedIcon
                                        className={`mt-4`}
                                        style={{fontSize: '25px'}}
                                    />
                                </Grid>
                                <Grid
                                    item xs={5}
                                >
                                    <UnitCost product={product} id="right_input" label={`Unit cost`} inputName="costPrice" initialValue={costPrice/quantity} getValue={setInputValue.bind(this)} >
                                        <FontAwesomeIcon icon={faCalculator} fixedWidth />
                                    </UnitCost>
                                </Grid>
                            </Grid>

                            <Grid container spacing={1} style={{marginTop: '50px'}}>
                                <Grid item xs={6}>
                                    <Button
                                        variant="outlined"
                                        style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 30px', textTransform: 'none', fontSize:'15px'}}
                                        onClick={closeDialogHandler.bind(this)}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>

                                <Grid item xs={6}>
                                    <Button
                                        variant="contained"
                                        style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 15px', textTransform: 'none', fontSize:'15px'}}
                                        onClick={updatePriceEntry.bind(this)}
                                    >
                                        Save changes
                                    </Button>
                                </Grid>
                            </Grid>

                        </TabPanel>

                    </SwipeableViews>

                </div>
            </MainDialog>

        </div>

    );
};

export default SingleDayView;
