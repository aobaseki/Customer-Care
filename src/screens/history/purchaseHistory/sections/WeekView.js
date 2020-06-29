import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from "@material-ui/core/Box/Box";
import { withRouter } from "react-router-dom";

import SingleWeekView from './singleViews/SingleWeekView';
import ProductWeek from './singleViews/ProductWeek';
import CardsSection from '../../../../components/Sections/CardsSection';
import DateServiceHandler from "../../../../services/SystemDateHandler";
import PurchaseService from "../../../../services/PurchaseService";
import startOfWeek from "date-fns/startOfWeek";
import format from "date-fns/format";
import Empty from '../../../../assets/img/empty.png';
import Button from "@material-ui/core/Button/Button";
import paths from "../../../../utilities/paths";

const useStyles = makeStyles(theme => ({
    root: {
    flexGrow: 1,
    marginBottom: '4rem'
    }
}));

const values = new DateServiceHandler().getStoreWeeks();

const WeekView = props => {
    const classes = useStyles();
    const { history } = props;
    const [selectedWeek, setSelectedWeek] = React.useState(values[0].value);
    const [purchaseDetails , setPurchaseDetails] = useState(false);
    const [purchases , setPurchases] = useState([]);
    const pageName = props.pageName;
    const [name , setName] = useState('');

    const handleChange = event => {
        setSelectedWeek(event.target.value);
        getPurchaseDetails(event.target.value);
    };

    useEffect(() => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
        if (!purchaseDetails) {
            let activeHistoryIndex = localStorage.getItem("activeHistoryIndex") || '';

            if(activeHistoryIndex){
                const newDate = startOfWeek(
                    new Date(activeHistoryIndex) ,
                    { weekStartsOn: 1 }
                );
                setSelectedWeek(format(newDate, 'MM/dd/yyyy'));
                getPurchaseDetails(activeHistoryIndex);
                localStorage.removeItem("activeHistoryIndex")
            }else{
                getPurchaseDetails(selectedWeek);
            }
        }
    });

    const getPurchaseDetails = async (date) => {
        let response = [];

        if (pageName === true){
            const branchProduct = props.product[0];
            const newProduct = await branchProduct.product.fetch();
            setName(newProduct.name);
            response = await new PurchaseService().getProductPurchaseDetails('week', date, newProduct.id);
        }else {
            response = await new PurchaseService().getPurchaseDetails('week', date);
        }
        setPurchaseDetails(response);
        setPurchases(response.purchases);
    };

    const getChildrenDetails = (index) => {
        props.getChildrenView(index , 0)
    };

    return(
        <div className={classes.root}>

            <Grid container spacing={1}>
                <Grid item xs={4} >
                    <Typography
                        style={{fontSize: '14px', paddingTop: '20px'}}
                        className={`text-center text-dark`}
                    >
                        Purchased items
                    </Typography>
                </Grid>

                <Grid item xs={8}>
                    <TextField
                        id="outlined-select-receive-native"
                        select
                        size="small"
                        value={selectedWeek}
                        style={{width: '220px',  margin: '10px 0px', fontSize: '5px'}}
                        onChange={handleChange}
                        SelectProps={{
                            native: true,
                        }}
                        variant="outlined"
                        >
                        {values.map(option => (
                            <option key={option.value} value={option.value}>
                            {option.label}
                            </option>
                        ))}
                    </TextField>
                </Grid>
            </Grid>

            <CardsSection quantity={purchaseDetails.quantity} costPrice={purchaseDetails.costPrice} sellingPrice={purchaseDetails.sellingPrice} profit={purchaseDetails.profit} profitName="Expected profit" />
            {/* <CardsSection quantity='4' costPrice='20' sellingPrice='50' profit='30' profitName="Expected Profit" /> */}


            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {purchases.length === 0
                    ?
                    // <div className={`rounded mx-1 my-2 p-2 bordered`}>
                    //     <Grid container spacing={1} className={`py-1`}>
                    //         <Grid
                    //             item xs={12}
                    //             className={`text-left pl-2`}
                    //         >
                    //             <Typography
                    //                 component="h6"
                    //                 variant="h6"
                    //                 style={{fontSize: '16px'}}
                    //                 className={`text-center text-dark`}
                    //             >
                    //                 No purchases made
                    //             </Typography>
                    //         </Grid>
                    //     </Grid>
                    // </div>
                    <div>
                        <Box component="div" m={2} style={{marginTop: '-1rem'}} >
                            <img className="img100" src={Empty} alt={'payment'}/>
                        </Box>

                        
                        <Typography className='text-dark font-weight-bold' style={{ fontSize: '17px', padding: '0px 0px 10px 0px' }} >
                            Seems you have not bought any product
                        </Typography>
                        

                        <Typography className='font-weight-light mt-1' style={{ fontSize: '15px', marginBottom: '20px' }} >
                                Click on Add Stock to be able to view purchase history
                        </Typography>

                        <Button
                            variant="contained"
                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 40px', textTransform: 'none', fontSize:'17px'}}
                            onClick={() => history.push(paths.stock)}
                        >
                            Add stock
                        </Button>
                    </div>
                    :
                    pageName === false ?

                    purchases.map((purchase , index) =>
                        <div key={index} onClick={getChildrenDetails.bind(this, purchase.index)}>
                            <SingleWeekView key={index} purchase={purchase} />
                        </div>
                    )
                    :
                    purchases.map((purchase, index) =>
                        <div key={index} onClick={getChildrenDetails.bind(this, purchase.index)}>
                            <ProductWeek key={index} purchase={purchase} purchaseEntry={purchase} prodName={name} />
                        </div>
                    )
                }
            </Box>

            {/* <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {props.weekItem.map((item) => <SingleWeekView  key={item.day_id} weekItems={item}/>)}
            </Box> */}
        </div>
    )
};

export default withRouter(WeekView);
