import React, {useEffect , useState} from 'react';
import Card from "@material-ui/core/Card/Card";
import Grid from "@material-ui/core/Grid/Grid";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SaleService from "../../../../../services/SaleService";
import format from "date-fns/format";

const SingleDayView = props => {

    const invoice = props.invoice;
    const prodName = props.prodName;
    const [customer , setCustomer] = useState(false);
    const [total , setTotal] = useState(false);
    const [saleEntries , setSaleEntries] = useState([]);
    const [formFields , setFormFields] = useState({
        name: '',
        date: '',
        time: '',
        totalPrice: ''
    });

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!customer  || !total) {
            getCustomer();
        }
    });

    const getCustomer = async () => {
        const response = await invoice.customer.fetch();
        /*
        * @todo get entries via query on model
        * */
        const saleTotal = await SaleService.getSaleEntryAmountById(invoice.id);
        const entries = await invoice.salesEntries();
        setCustomer(response);
        setSaleEntries(entries);
        setTotal(saleTotal);
    };
    
    const openReturnsHandler = (saleEntries) => {
        console.log(saleEntries);
        props.returnProducts(5, saleEntries);

        const {...oldFormFields} = formFields;
        //oldFormFields['totalPrice'] =;
        oldFormFields['name'] = `${customer.firstName} ${customer.otherNames}`;
        oldFormFields['date'] = format(new Date(invoice.createdAt) , "do MMMM, yyyy");
        oldFormFields['time'] = format(new Date(invoice.createdAt) , "h:mm a");
        oldFormFields['totalPrice'] = total;
        setFormFields(oldFormFields);

        localStorage.setItem('customerDetails', JSON.stringify(oldFormFields));
    };

    return(
        <div>
            {prodName === `${customer.firstName} ${customer.otherNames}`
                ?
            <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
                <Grid item xs={3}  onClick={openReturnsHandler.bind(this)}>
                    <Card
                        className="shadow1"
                        style={{
                            margin: '10px auto',  
                            backgroundPosition: 'center', 
                            backgroundSize: 'cover', 
                            width: '50px', 
                            borderRadius: '50%', 
                            height: '50px', 
                            padding: '0px'
                        }}
                    >
                        <AccountCircleIcon style={{position: 'center', marginTop: '8px', fontSize: '2rem'}} />
                    </Card>
                </Grid>
                <Grid item xs={6} style={{display: 'table', height: '60px', margin: '8px 0px'}}  onClick={openReturnsHandler.bind(this, saleEntries)}>
                    <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                        <span className='text-dark font-weight-bold' >{customer ? `${customer.firstName} ${customer.otherNames}` : 'Cash Customer'}</span>
                        <div className="font-weight-light mt-1" style={{ fontSize: '14px'}}>INV. {invoice.receiptNumber.slice(0,8)}</div>
                        <div className="font-weight-light mt-1" style={{ fontSize: '14px'}}>Sales: GHC {total}</div>
                    </div>
                </Grid>

                <Grid item xs={3} style={{height: '60px', margin: '20px 0px 0px 0px'}}  onClick={openReturnsHandler.bind(this, saleEntries)}>
                    <div className="font-weight-light mt-1" style={{ fontSize: '14px'}}>{format(new Date(invoice.createdAt) , "h:mm a")}</div>
                </Grid>
            </Grid>
              :
              ''
          }

        </div>

    );
};

export default SingleDayView;
