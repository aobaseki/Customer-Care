import React, {useEffect , useState} from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Button from "@material-ui/core/Button/Button";
import MainDialog from '../../../../../../components/Dialog/NewDialog';
import Box from "@material-ui/core/Box/Box";
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import DaySupplier from './DaySupplier';
import format from "date-fns/format";
import SupplierService from "../../../../../../services/SupplierService";

const SingleDayView = props => {
    /*
    * @todo format receipt number as required...
    * */
    const order = props.order;
    const [supplier , setSupplier] = useState(false);
    const [total , setTotal] = useState(false);
    const [mainDialog, setMainDialog] = React.useState(false);
    const [owedAmount , setOwedAmount] = useState('');

    const preventDefault = event => event.preventDefault();

    const closeDialogHandler = (event) => {
        setMainDialog(false);
    };

    const openDialogHandler = (event) => {
        setMainDialog(true);
    };

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!supplier || !total) {
            getSupplier();
        }
    });

    const getSupplier = async () => {
        const response = await order.supplier.fetch();
        /*
        * @todo get entries via query on model
        * */
        setSupplier(response);
        setTotal(order.costPrice);
        const amountOwed = await SupplierService.getSuppliedAmountOwed(supplier.orders() , supplier.payments());
        setOwedAmount(amountOwed);
    };

    const deleteProductHandler = (event) => {
        props.deleteProduct(event);
    };

    return(
        <div>
            <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
                <Grid item xs={2} style={{ margin: '30px 0px 0px 0px'}} >
                    <AccessTimeIcon />
                </Grid>

                <Grid item xs={6} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                    <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                        <span className='text-dark font-weight-bold' >{`${supplier.name}`}</span>
                        <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>{format(new Date(order.createdAt) , "eeee, MMMM do, yyyy")} | {format(new Date(order.createdAt) , "h:mm a")}</div>
                        <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>GHC {total}</div>
                    </div>
                </Grid>

                <Grid item xs={4} style={{ margin: '30px 0px 0px 0px'}}>  
                    <Button
                        variant="outlined"
                        style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 10px', textTransform: 'none', fontSize:'13px'}}
                        onClick={openDialogHandler.bind(this)}
                    >
                        View more  
                    </Button>
                </Grid>
            </Grid>

            <MainDialog 
                handleDialogClose={closeDialogHandler.bind(this)} 
                states={mainDialog}
                title={
                    
                    <Grid container spacing={1} >

                        <Grid item xs={7} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                            <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                                <span className='text-dark font-weight-bold' style={{ fontSize: '15px'}} >{`${supplier.name}`}</span>
                                <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>{format(new Date(order.createdAt) , "eeee, MMMM do, yyyy")} | {format(new Date(order.createdAt) , "h:mm a")}</div> 
                            </div>
                        </Grid>
        
                        <Grid item xs={5} style={{height: '60px', margin: '15px 0px'}}>  
                            <div style={{textAlign: 'right', display: 'table-cell', verticalAlign: 'right'}}>
                                <div className="text-dark font-weight-bold" style={{ fontSize: '13px', color: 'red'}}>GHC {total}</div>
                                {/* {owedAmount > 0
                                    ?
                                    <div>
                                        <Button
                                            variant="outlined"
                                            style={{
                                                border: '1px solid #DAAB59',
                                                color: '#DAAB59',
                                                padding: '5px 5px',
                                                textTransform: 'none',
                                                fontSize: '10px'
                                            }}
                                            // onClick={openPayment.bind(this)}
                                        >
                                            Enter payment
                                        </Button>
                                    </div>
                                    :
                                    ''
                                } */}
                                
                            </div>  
                        </Grid>
                    </Grid>
                }
                action={ 

                    <Grid container spacing={1} className={`shadow1 mb-3`}>

                        <Grid item xs={12} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                            <div style={{textAlign: 'center', display: 'table-cell', verticalAlign: 'middle'}}>
                                <div className="text-dark font-weight-bold" style={{ fontSize: '15px'}}>Total cost </div> 
                                <div className="font-weight-light mt-1" style={{ fontSize: '20px'}}>GHC {order.worth}</div> 
                            </div>
                        </Grid>

                        <Grid>
                            <Typography >
                                <Link href="#" onClick={preventDefault}  style={{ color: '#DAAB59', marginRight: '30px'}}>
                                    Order again
                                </Link>

                                <Link href="#" onClick={preventDefault}  style={{ color: '#DAAB59', marginRight: '30px'}}>
                                    Change date
                                </Link>
                            
                                <Link href="#/order-history" onClick={closeDialogHandler.bind(this)}  style={{textAlign: 'right', color: '#DAAB59'}} >
                                    Close
                                </Link>
                            </Typography>
                        </Grid>

                    </Grid>
                    

                }
            >
                <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                    {/* {props.indProducts.map((item) => <DaySupplier  key={item.pro_id} prod={item}  />)} */}
                    {order.map((item) => <DaySupplier  key={item.id} purchase={item} deleteStoreProduct={deleteProductHandler.bind(this)} updateSaleEntry={props.updateSaleEntry} updatePriceEntry={props.updateSaleEntry} updateDateEntry={props.updateSaleEntry} />)}
                </Box>

            </MainDialog>


        </div>

    );
};

export default SingleDayView;