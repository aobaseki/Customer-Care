import React , { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button/Button";
import BoxDefault from '../../../../../components/Box/BoxDefault';
import Card from "@material-ui/core/Card/Card";
import CreditCustomerModal from "../../../../../components/Modal/Customer/CreditCustomerModal";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InvoiceService from "../../../../../services/InvoiceService";


const SingleViewCustomer = props => {

    const [customer , setCustomer] = useState('');
    const [name , setName] = useState('');
    const [number , setNumber] = useState('');
    const [mainDialog, setMainDialog] = React.useState(false);
    const [invoiceDetails , setInvoiceDetails] = useState(false);

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!customer) {
            getCustomer();
        }
    });

    const getCustomer = async () => {
        const newCustomer = await props.customer;
        setCustomer(newCustomer);
        setName(newCustomer.firstName + ' ' + newCustomer.otherNames);
        setNumber(newCustomer.phone);
        const response = await new InvoiceService().getDetailsbyCustomer(newCustomer.id);
        setInvoiceDetails(response);
    };

    const openDialogHandler = (event) => {
        setMainDialog(true);
    };

    return(

        <div>

            <BoxDefault
            bgcolor="background.paper"
            p={1}
            className={'boxDefault'}
            >
                
                <Grid container spacing={1} >

                    <Grid item xs={3}>
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

                    <Grid item xs={5} style={{display: 'table', height: '60px', margin: '8px 0px'}} >
                        <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                            <span className='text-dark font-weight-bold' >{name}</span>
                            <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}> {number}</div>
                        </div>
                    </Grid>

                    {invoiceDetails.credit > 0
                        ?
                        <Grid item xs={4} style={{ margin: '15px 0px 0px 0px'}} >   
                            <Button
                                variant="contained"
                                style={{
                                    width: '80%',
                                    'backgroundColor': '#ffff',
                                    borderRadius: '5px',
                                    color: '#ff5722',
                                    border: 'none',
                                    padding: '5px 5px',
                                    fontSize: '11px',
                                    fontWeight: '500',
                                }}
                                onClick={openDialogHandler.bind(this)}
                            >
                                Owes <br />
                                GHC {invoiceDetails.credit}
                            </Button>
                        </Grid>
                        :
                        ''
                    }
                </Grid>
            </BoxDefault>

            <CreditCustomerModal
                openCustomerAddState={mainDialog}
                handleClose={() => setMainDialog(false)}
                debt={invoiceDetails.credit}
            />

            
        </div>
        
    )

}
export default withRouter(SingleViewCustomer);