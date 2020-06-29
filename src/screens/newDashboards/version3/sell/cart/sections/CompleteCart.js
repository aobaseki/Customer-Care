import React, {useEffect , useState, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Box from "@material-ui/core/Box/Box";
import SuccessImage from '../../../../../../assets/img/success.png';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button/Button";
import LocalPrintshopIcon from '@material-ui/icons/LocalPrintshop';
import { withRouter } from "react-router-dom";
import SaleService from "../../../../../../services/SaleService";
import database from "../../../../../../models/database";
import paths from "../../../../../../utilities/paths";
import ReactToPrint from "react-to-print";
import LocalInfo from '../../../../../../services/LocalInfo';
import CartService from "../../../../../../services/CartService";
import PrintRec from './PrintRec';
import fromUnixTime from 'date-fns/fromUnixTime';
import format from "date-fns/format";

const useStyles = makeStyles(theme => ({
    root: {
    flexGrow: 1,

    },
    title: {
            fontSize: 11,
        },
    paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    width: '80%',
    marginLeft: '25px',
    },
    button: {
        border: '1px solid #DAAB59',
        color: '#DAAB59',
        padding: '7px 40px',

        marginTop: '5px',
        marginBottom: '20px',
        textTransform: 'none',
    },
    table:{
        borderCollapse: 'collapse',
        width: '80%',
    },
    td: {
        border: 'none',
        textAlign: 'right',
        padding: '8px',
    }
}));

const CheckoutView = props => {
    const componentRef = useRef();
    const { history } = props;
    const [salesId , setSalesId] = useState(0);
    const [salesTotal , setSalesTotal] = useState(0);
    const [amountPaid , setAmountPaid] = useState(0);
    const [paymentType , setPaymentType] = useState(0);
    const [quantity , setQuantity] = useState(0);
    const [receipt , setReceipt] = useState(0);
    const [date , setDate] = useState(0);
    const [seller , setSeller] = useState('');
    const [customerName, setCustomerName] = React.useState('');
    const [products , setProducts] = useState([]);

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (salesId === 0) {
            getSalesId();
        }
    });

    const getSalesId = async () => {
        const sale = await database.adapter.getLocal("saleId");
        const total = await SaleService.getSaleEntryAmountById(sale);
        const qty = await SaleService.getSaleProductQuantity(sale);
        const lastsale = await SaleService.getLastSale();
        const need = await new SaleService().getSaleProductsById(sale);
        console.log(need);

        const recDate = format(fromUnixTime(lastsale.salesDate) , "eeee, MMMM do, yyyy");
        const rec = lastsale.receiptNumber;
        setCustomerName(await new CartService().getCartCustomer(props.currentCustomer));
        setSeller(LocalInfo.username);
        setReceipt(rec.slice(0,8));
        setQuantity(qty);
        setDate(recDate);
        setPaymentType(lastsale.paymentType)
        setSalesId(sale);
        setAmountPaid((parseFloat(localStorage.getItem('amountPaid'))).toFixed(2));
        setSalesTotal((parseFloat(total)).toFixed(2));

        setProducts(need);
    };

    const classes = useStyles();

    return(
        <div className={classes.root} >

            <div
                style={{
                    position: 'relative',
                    float: 'left',
                    fontSize: '1.2rem',
                    marginLeft: '10px'
                }}
                onClick={() => history.push(paths.newSell)}
            >
                <ArrowBackIcon style={{float: 'left', fontSize: '1.5rem', marginRight: '5px'}} />
                <Typography className='text-dark font-weight-light' style={{ float: 'left', textDecoration: 'underline', textDecorationColor: '#333333' }} >
                    Continue Selling
                </Typography>
            </div>

            <Box component="div" m={2} style={{margin: '16px 0px 0px 0px'}}>
                <img className="img100" src={SuccessImage} alt={'test'}/>
            </Box>

            <Typography className='text-dark font-weight-bold' style={{ fontSize: '22px', marginBottom: '10px' }} >
                Sale recorded successfully
            </Typography>

            <Paper variant="outlined" className={classes.paper}>

                <Typography className='text-dark font-weight-bold' style={{ fontSize: '20px', marginTop: '10px' }} >
                    Summary
                </Typography>

                <table className={classes.table} align='center'>
                    <tr>
                        <td className={classes.td}>Total :</td>
                        <td className={classes.td}>{`GHC ${salesTotal}`}</td>
                    </tr>
                    <tr>
                        <td className={classes.td}>Paid :</td>
                        <td className={classes.td}>{`GHC ${amountPaid}`}</td>
                    </tr>
                    {
                        paymentType === 'credit' ? (
                                <tr>
                                    <td className={classes.td}>Outstanding :</td>
                                    <td className={classes.td}>GHC {(parseFloat(salesTotal) - parseFloat(amountPaid)).toFixed(2)}</td>
                                </tr>
                            ):
                            <tr>
                                <td className={classes.td}> Change :</td>
                                <td className={classes.td}>{`GHC ${amountPaid - salesTotal}`}</td>
                            </tr>
                    }

                </table>

                {/* <Button
                    variant="outlined"
                    style={{fontSize: '16px', }}
                    className={classes.button}
                    onclick={print}
                >
                    <LocalPrintshopIcon />
                    &nbsp; Print reciept
                </Button> */}
                <ReactToPrint
                    trigger={() =>
                        <Button
                            variant="outlined"
                            style={{fontSize: '16px', }}
                            className={classes.button}
                            // onClick={print}
                        >
                            <LocalPrintshopIcon />
                            &nbsp; Print receipt
                        </Button>
                    }
                    onAfterPrint={() => history.push(paths.sell)}
                    content={() => componentRef.current}
                />
                <div style={{ display: "none" }}>
                    <PrintRec
                        ref={componentRef}
                        products={products}
                        date= {date}
                        receiptNumber={receipt}
                        seller= {seller}
                        customer= {customerName}
                        totalQty= {quantity}
                        paymentType={paymentType}
                        totalAmt= {salesTotal}
                        amtPaid= {amountPaid}
                        changeRem= {`GHC ${amountPaid - salesTotal}`}
                     />
                </div>

            </Paper>

            {/*<div
                onClick={() => history.push(paths.sell)}
            >
                <Button
                    variant="contained"
                    className='text-dark font-weight-bold'
                    style={{
                        backgroundColor: '#DAAB59',
                        color: '#333333',
                        padding: '5px 40px',
                        textTransform: 'none',
                        fontSize: '20px',
                        marginTop: '10px'
                    }}
                >
                    Continue selling
                </Button>
            </div>*/}


        </div>
    )

}

export default withRouter(CheckoutView);
