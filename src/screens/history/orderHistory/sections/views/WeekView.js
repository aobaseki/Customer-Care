import React, {useEffect, useState}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withRouter } from "react-router-dom";

import SingleWeekView from './singleView/SingleWeekView';
import OrderWeek from './singleView/OrderWeek';
import BoxDefault from '../../../../../components/Box/BoxDefault';
import CardsSection from '../../../../../components/Sections/CardsSection';
import OrderService from '../../../../../services/OrderService';
import SystemDateHandler from "../../../../../services/SystemDateHandler";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    }
  }));

  const values = new SystemDateHandler().getStoreWeeks()

  const WeekView = props => {
    // console.log(new SystemDateHandler().getStoreWeeks());

    const classes = useStyles();
    const [selectedWeek, setSelectedWeek] = React.useState(values[0].value);
    const pageName = props.pageName;
    const [name , setName] = useState('');

    const handleChange = event => {
        setSelectedWeek(event.target.value);
        getOrderDetails(event.target.value);
    };

    const [orderDetails , setOrderDetails] = useState(false);
    const [orders , setOrders] = useState([]);

    useEffect(() => {
      // You need to restrict it at some point
      // This is just dummy code and should be replaced by actual
        if (!orderDetails) {
            getOrderDetails(selectedWeek);
        }
    });

    const getOrderDetails = async (date) => {
        const response = await new OrderService().getOrderDetails('week' , date);
        if (pageName === true){
            const branchSupplier = props.supplier[0];
            const newSupplier = await branchSupplier.supplier.fetch();
            setName(newSupplier.name);
        }
        setOrderDetails(response);
        setOrders(response.orders);
        console.log(response)
    };

    return(
        <div className={classes.root}>

            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Typography style={{fontSize: '14px', paddingTop: '20px', marginRight: '50px'}} >
                        Purchased items
                    </Typography>
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        id="outlined-select-receive-native"
                        select
                        size="small"
                        value={selectedWeek}
                        style={{width: '150px',  margin: '10px 0px', fontSize: '7px'}}
                        onChange={handleChange}
                        color="#DAAB59"
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

            <CardsSection quantity={orderDetails.quantity} costPrice={orderDetails.costPrice} sellingPrice={orderDetails.sellingPrice} profit={orderDetails.profit} profitName="Expected profit" />
            
            {orders.length === 0
                ?
                <BoxDefault
                    bgcolor="background.paper"
                    p={1}
                    className={'boxDefault'}
                    style={{marginTop: '5px' }}
                >
                    <div className={`rounded mx-1 my-2 p-2 bordered`}>
                        <Grid container spacing={1} className={`py-1`}>
                            <Grid
                                item xs={12}
                                className={`text-left pl-2`}
                            >
                                <Typography
                                    component="h6"
                                    variant="h6"
                                    style={{fontSize: '16px'}}
                                    className={`text-center text-dark`}
                                >
                                    No sales made
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                </BoxDefault>
                :
                pageName === false ?

                orders.map((order) => <SingleWeekView  key={order.id} order={order} />)
                :
                orders.map((order) => <OrderWeek  key={order.id} order={order} prodName={name} />)
                
            }


        </div>
    )

  }

  export default withRouter(WeekView);
